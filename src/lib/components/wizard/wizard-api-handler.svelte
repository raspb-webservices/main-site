<script lang="ts">
  import type { WizardConfig, Project } from '$interfaces/project.interface';
  import type { User } from '$interfaces/user.interface';
  import { uploadMultipleAssetsWithDelay, publishMultipleAssets } from '$helper/uploadAsset';
  import { m } from '$lib/paraglide/messages';

  interface Props {
    config: WizardConfig;
    customerData: Partial<User>;
    uploadedFiles?: File[];
    customFeatures?: string;
    uploadedAssetIds?: string[];
  }

  let { config, customerData, uploadedFiles = [], customFeatures = '', uploadedAssetIds = [] }: Props = $props();

  // State management
  let isSubmitting = $state(false);
  let errorDetails: string[] = $state([]);
  let createdCustomerId = $state<string>('');

  // Asset preparation
  let isPreparingAssets = $state(false);
  let assetPreparationProgress = $state('');

  // Function to prepare assets when entering final step
  export async function prepareAssetsForFinalStep() {
    if (uploadedFiles.length === 0 || uploadedAssetIds.length > 0) return;

    isPreparingAssets = true;
    assetPreparationProgress = m.wizard_api_preparing_assets();

    try {
      const preparedAssetIds = await uploadMultipleAssetsWithDelay(
        uploadedFiles,
        3000, // 3 second delay between uploads to avoid rate limiting
        (message, current, total, assetId) => {
          assetPreparationProgress = `[${current}/${total}] ${message}`;
        }
      );

      uploadedAssetIds = preparedAssetIds;

      if (preparedAssetIds.length > 0) {
        assetPreparationProgress = m.wizard_api_assets_ready({ count: preparedAssetIds.length.toString(), total: uploadedFiles.length.toString() });
      } else {
        assetPreparationProgress = m.wizard_api_no_assets_prepared();
      }
    } catch (error) {
      console.error('Fehler beim Vorbereiten der Assets:', error);
      assetPreparationProgress = m.wizard_api_assets_preparation_error();
    } finally {
      isPreparingAssets = false;
    }
  }

  // Helper function to publish project with retry mechanism and delay
  async function publishProjectWithRetry(projectId: string, maxRetries: number = 3, delayMs: number = 2000) {
    // Wait before first attempt to ensure project is fully created
    await new Promise((resolve) => setTimeout(resolve, delayMs));

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const publishResponse = await fetch(`/api/project/publish/${projectId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const publishResult = await publishResponse.json();

        if (publishResponse.ok && publishResult.success) {
          return true;
        } else {
          // If this is not the last attempt, wait before retrying
          if (attempt < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, delayMs));
          }
        }
      } catch (publishError) {
        // If this is not the last attempt, wait before retrying
        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }
    }

    console.error(`Failed to publish project ${projectId} after ${maxRetries} attempts`);
    return false;
  }

  // Main API submission function
  export async function submitToAPI(): Promise<{ success: boolean; projectId?: string }> {
    isSubmitting = true;
    errorDetails = [];

    try {
      // Step 1: Create customer first
      const customerResponse = await fetch('/api/customer/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
      });

      const customerResult = await customerResponse.json();

      if (!customerResult.success) {
        errorDetails.push(`${m.wizard_modals_error_customerError()}: ${customerResult.error || m.wizard_modals_error_unknownError()}`);
        if (customerResult.details) {
          errorDetails.push(...customerResult.details);
        }
        throw new Error('Customer creation failed');
      }

      createdCustomerId = customerResult.data.id;

      // Step 2: Publish customer
      try {
        const publishCustomerResponse = await fetch(`/api/customer/publish/${createdCustomerId}`, {
          method: 'POST'
        });
        const publishCustomerResult = await publishCustomerResponse.json();

        if (publishCustomerResponse.ok && publishCustomerResult.success) {
          // Customer published successfully
        } else {
          // Customer publishing failed, but customer was created
          // Don't fail the entire process if customer publishing fails
        }
      } catch (publishCustomerError) {
        // Don't fail the entire process if customer publishing fails
      }

      // Step 3: Prepare asset IDs (use pre-uploaded or fallback to upload now)
      let finalAssetIds: string[] = [];
      if (uploadedAssetIds.length > 0) {
        finalAssetIds = uploadedAssetIds;
      } else if (uploadedFiles.length > 0) {
        // Fallback: If no pre-uploaded assets, upload them now
        finalAssetIds = await uploadAllFiles();

        if (finalAssetIds.length === 0 && uploadedFiles.length > 0) {
          errorDetails.push(m.wizard_modals_error_fileUploadError());
          throw new Error('File upload failed');
        }
      }

      // Step 4: Create project (without owner initially to avoid circular dependency)
      const projectData: Project = {
        name: config.name,
        description: config.description,
        projectType: config.projectType,
        subType: config.subType,
        projectDetails: config.projectDetails,
        desiredDomain: config.desiredDomain,
        domainStatus: config.domainStatus,
        goals: config.goals,
        targetAudience: config.targetAudience,
        budget: config.budget,
        timeline: config.timeline,
        features: config.features,
        customFeature: customFeatures || config.customFeature,
        primaryColour: config.primaryColour,
        secondaryColour: config.secondaryColour,
        accentColour: config.accentColour,
        desiredFont: config.desiredFont,
        estimatedPrice: config.estimatedPrice,
        formFields: config.formFields,
        pages: config.pages,
        relatedFiles: finalAssetIds.map((id) => ({ id }))
        // Note: owner will be linked separately
      };

      const response = await fetch('/api/project/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });

      const result = await response.json();

      if (result.success && result.data?.id) {
        const projectId = result.data.id;

        // Step 5: Link customer to project
        try {
          const linkResponse = await fetch(`/api/project/link-customer/${projectId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customerId: createdCustomerId })
          });
          const linkResult = await linkResponse.json();

          if (linkResponse.ok && linkResult.success) {
            // Customer linked to project successfully
          } else {
            // Customer linking failed, but project was created
            // Don't fail the entire process if linking fails
          }
        } catch (linkError) {
          // Don't fail the entire process if linking fails
        }

        // Step 6: Publish the project with retry mechanism and delay
        await publishProjectWithRetry(projectId);

        // Step 7: Now publish all assets AFTER project is published
        if (finalAssetIds.length > 0) {
          const publishedAssetIds = await publishMultipleAssets(finalAssetIds, (message, current, total) => {
            // Update loading steps to show asset publishing progress
          });

          if (publishedAssetIds.length === 0 && finalAssetIds.length > 0) {
            // Asset publishing failed, but project was created and published
            // Don't fail the entire process if asset publishing fails
          }
        }

        return { success: true, projectId };
      } else {
        // Collect detailed error information
        errorDetails.push(`API Fehler: ${result.error || 'Unbekannter Fehler'}`);
        if (result.details) {
          errorDetails.push(...result.details);
        }
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Submission error:', error);

      // Add network error if no other errors were collected
      if (errorDetails.length === 0) {
        errorDetails.push(m.wizard_modals_error_networkError());
        errorDetails.push(m.wizard_modals_error_checkConnection());
      }

      return { success: false };
    } finally {
      isSubmitting = false;
    }
  }

  // Legacy function for manual upload (kept for compatibility)
  async function uploadAllFiles() {
    if (uploadedFiles.length === 0) return [];

    try {
      const uploadedAssetIds = await uploadMultipleAssetsWithDelay(uploadedFiles, 2000, (message, current, total) => {
        // Progress callback
      });

      return uploadedAssetIds;
    } catch (error) {
      console.error('Fehler beim Hochladen der Dateien:', error);
      return [];
    }
  }
</script>

<!-- This component has no template - it's purely functional -->
