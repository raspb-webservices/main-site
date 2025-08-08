<script lang="ts">
  import type { WizardConfig } from '$interfaces/project.interface';
  import type { Customer } from '$interfaces/customer.interface';

  interface Props {
    config: WizardConfig;
    customerData: Partial<Customer>;
    uploadedFiles?: File[];
    customFeatures?: string;
  }

  let { config, customerData, uploadedFiles = [], customFeatures = '' }: Props = $props();

  export async function generatePDF() {
    try {
      // Prepare uploaded files data for API
      const filesData = uploadedFiles.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));

      // Send data to the optimized API endpoint
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          config,
          customerData,
          uploadedFiles: filesData,
          customFeatures,
          filename: `${config.name || 'Projekt'}_Konfiguration_${new Date().toISOString().split('T')[0]}.pdf`
        })
      });

      if (!response.ok) {
        throw new Error('PDF generation failed');
      }

      // Download the PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${config.name || 'Projekt'}_Konfiguration_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Fehler beim Erstellen des PDFs. Bitte versuchen Sie es erneut.');
    }
  }
</script>

<!-- This component has no template - it's purely functional -->
