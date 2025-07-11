import { client } from '$lib/helper/graphql-client';
import { gql } from 'graphql-request';
import type { RequestHandler } from './$types';
import type { WizardConfig, ProjectResponse } from '../../../../interfaces/project.interface';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const wizardData: WizardConfig = await request.json();
    
    // GraphQL Mutation für das Erstellen eines neuen Projekts in Hygraph
    const mutation = gql`
      mutation CreateProject(
        $uuid: Int!
        $projectType: ProjectTypes!
        $subType: String
        $description: String
        $customFeatures: String
        $pages: Json
        $formFields: Json
        $targetAudience: String
        $goals: String
        $timeline: String
        $budget: String
        $colors: Json
        $font: String
        $customFont: String
        $uploadedFiles: Json
        $estimatedPrice: Float
        $timestamp: DateTime
      ) {
        createProject(
          data: {
            uuid: $uuid
            projectType: $projectType
            subType: $subType
            description: $description
            customFeatures: $customFeatures
            pages: $pages
            formFields: $formFields
            targetAudience: $targetAudience
            goals: $goals
            timeline: $timeline
            budget: $budget
            colors: $colors
            font: $font
            customFont: $customFont
            uploadedFiles: $uploadedFiles
            estimatedPrice: $estimatedPrice
            timestamp: $timestamp
          }
        ) {
          id
          projectType
          subType
          description
          customFeatures
          pages
          formFields
          targetAudience
          goals
          timeline
          budget
          colors
          font
          customFont
          uploadedFiles
          estimatedPrice
          timestamp
          createdAt
        }
      }
    `;

    // Variablen für die Mutation vorbereiten
    const variables = {
      uuid:  Math.floor(Math.random() * (10000000000 - 1 + 1)) + 1,
      projectType: wizardData.projectType,
      subType: wizardData.subType || null,
      description: wizardData.description || null,
      customFeatures: wizardData.customFeatures || null,
      pages: wizardData.pages.length > 0 ? JSON.stringify(wizardData.pages) : null,
      formFields: wizardData.formFields.length > 0 ? JSON.stringify(wizardData.formFields) : null,
      targetAudience: wizardData.targetAudience || null,
      goals: wizardData.goals || null,
      timeline: wizardData.timeline || null,
      budget: wizardData.budget || null,
      colors: JSON.stringify(wizardData.colors),
      font: wizardData.font || null,
      customFont: wizardData.customFont || null,
      uploadedFiles: wizardData.uploadedFiles.length > 0 ? JSON.stringify(wizardData.uploadedFiles) : null,
      estimatedPrice: wizardData.estimatedPrice || null,
      timestamp: wizardData.timestamp
    };
    console.log("variables", variables)

    // GraphQL Request an Hygraph senden
    const response = await client.request(mutation, variables) as { createProject: ProjectResponse };
    
    return new Response(JSON.stringify({
      success: true,
      data: response.createProject
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error creating project:', error);
    
    // Spezifische Fehlerbehandlung für GraphQL-Fehler
    let errorMessage = 'Unknown error occurred';
    let statusCode = 500;
    
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Prüfe auf spezifische GraphQL-Fehler
      if (error.message.includes('authorization') || error.message.includes('Unauthorized')) {
        statusCode = 401;
        errorMessage = 'Authorization failed';
      } else if (error.message.includes('validation') || error.message.includes('required')) {
        statusCode = 400;
        errorMessage = 'Validation error: ' + error.message;
      }
    }
    
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};