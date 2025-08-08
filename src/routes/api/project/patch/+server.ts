import { client } from '$lib/helper/graphql-client';
import { gql } from 'graphql-request';
import type { RequestHandler } from './$types';
import type { Project, ProjectResponse } from '$interfaces/project.interface';

interface UpdateProjectData extends Partial<Project> {
  id: string;
}

export const PATCH: RequestHandler = async ({ request, url }) => {
  try {
    const requestData: UpdateProjectData = await request.json();

    // Projekt-ID aus dem Request-Body oder URL-Parameter extrahieren
    const projectId = requestData.id || url.searchParams.get('id');

    if (!projectId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Project ID is required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Dynamisch nur die vorhandenen Felder für die Mutation vorbereiten
    const updateFields: string[] = [];
    const variables: Record<string, any> = { id: projectId };

    // Alle möglichen Felder prüfen und nur die vorhandenen hinzufügen
    if (requestData.name !== undefined) {
      updateFields.push('name: $name');
      variables.name = requestData.name;
    }
    if (requestData.description !== undefined) {
      updateFields.push('description: $description');
      variables.description = requestData.description;
    }
    if (requestData.projectType !== undefined) {
      updateFields.push('projectType: $projectType');
      variables.projectType = requestData.projectType;
    }
    if (requestData.subType !== undefined) {
      updateFields.push('subType: $subType');
      variables.subType = requestData.subType;
    }
    if (requestData.projectDetails !== undefined) {
      updateFields.push('projectDetails: $projectDetails');
      variables.projectDetails = requestData.projectDetails;
    }
    if (requestData.desiredDomain !== undefined) {
      updateFields.push('desiredDomain: $desiredDomain');
      variables.desiredDomain = requestData.desiredDomain;
    }
    if (requestData.domainStatus !== undefined) {
      updateFields.push('domainStatus: $domainStatus');
      variables.domainStatus = requestData.domainStatus;
    }
    if (requestData.goals !== undefined) {
      updateFields.push('goals: $goals');
      variables.goals = requestData.goals;
    }
    if (requestData.targetAudience !== undefined) {
      updateFields.push('targetAudience: $targetAudience');
      variables.targetAudience = requestData.targetAudience;
    }
    if (requestData.budget !== undefined) {
      updateFields.push('budget: $budget');
      variables.budget = requestData.budget;
    }
    if (requestData.timeline !== undefined) {
      updateFields.push('timeline: $timeline');
      variables.timeline = requestData.timeline;
    }
    if (requestData.features !== undefined) {
      updateFields.push('features: $features');
      variables.features = requestData.features?.length ? requestData.features : null;
    }
    if (requestData.customFeature !== undefined) {
      updateFields.push('customFeature: $customFeature');
      variables.customFeature = requestData.customFeature;
    }
    if (requestData.primaryColour !== undefined) {
      updateFields.push('primaryColour: $primaryColour');
      variables.primaryColour = requestData.primaryColour;
    }
    if (requestData.secondaryColour !== undefined) {
      updateFields.push('secondaryColour: $secondaryColour');
      variables.secondaryColour = requestData.secondaryColour;
    }
    if (requestData.accentColour !== undefined) {
      updateFields.push('accentColour: $accentColour');
      variables.accentColour = requestData.accentColour;
    }
    if (requestData.desiredFont !== undefined) {
      updateFields.push('desiredFont: $desiredFont');
      variables.desiredFont = requestData.desiredFont;
    }
    if (requestData.estimatedPrice !== undefined) {
      updateFields.push('estimatedPrice: $estimatedPrice');
      variables.estimatedPrice = requestData.estimatedPrice;
    }
    if (requestData.formFields !== undefined) {
      updateFields.push('formFields: $formFields');
      variables.formFields = requestData.formFields ? JSON.stringify(requestData.formFields) : null;
    }
    if (requestData.pages !== undefined) {
      updateFields.push('pages: $pages');
      variables.pages = requestData.pages ? JSON.stringify(requestData.pages) : null;
    }
    if (requestData.relatedFiles !== undefined) {
      updateFields.push('relatedFiles: { set: $fileIDs }');
      variables.fileIDs = requestData.relatedFiles?.length ? requestData.relatedFiles : [];
    }

    // Prüfen, ob mindestens ein Feld zum Update vorhanden ist
    if (updateFields.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'No fields to update provided'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Dynamische GraphQL-Mutation basierend auf den vorhandenen Feldern erstellen
    const variableDefinitions = Object.keys(variables)
      .filter((key) => key !== 'id')
      .map((key) => {
        switch (key) {
          case 'projectType':
            return '$projectType: ProjectType';
          case 'subType':
            return '$subType: SubType';
          case 'features':
            return '$features: [Features!]';
          case 'estimatedPrice':
            return '$estimatedPrice: Float';
          case 'formFields':
            return '$formFields: Json';
          case 'pages':
            return '$pages: Json';
          case 'fileIDs':
            return '$fileIDs: [AssetWhereUniqueInput!]';
          default:
            return `$${key}: String`;
        }
      })
      .join('\n        ');

    const mutation = gql`
      mutation UpdateProject(
        $id: ID!
        ${variableDefinitions}
      ) {
        updateProject(
          where: { id: $id }
          data: {
            ${updateFields.join('\n            ')}
          }
        ) {
          id
          name
          description
          projectType
          subType
          projectDetails
          desiredDomain
          domainStatus
          goals
          targetAudience
          budget
          timeline
          features
          customFeature
          primaryColour
          secondaryColour
          accentColour
          desiredFont
          estimatedPrice
          formFields
          pages
          relatedFiles {
            fileName
          }
          owner {
            familyName
            givenName
          }
          createdAt
          updatedAt
        }
      }
    `;

    console.log('UPDATE PROJECT VARIABLES:', variables);
    console.log('UPDATE FIELDS:', updateFields);

    // GraphQL Request an Hygraph senden
    const response = (await client.request(mutation, variables)) as { updateProject: ProjectResponse };

    return new Response(
      JSON.stringify({
        success: true,
        data: response.updateProject
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error updating project:', error);

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
      } else if (error.message.includes('not found') || error.message.includes('does not exist')) {
        statusCode = 404;
        errorMessage = 'Project not found';
      }
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage
      }),
      {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
