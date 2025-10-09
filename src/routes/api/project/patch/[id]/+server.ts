import { client } from '$lib/server/graphql-client.server';
import { gql } from 'graphql-request';
import type { RequestHandler } from '@sveltejs/kit';
import type { Project, ProjectResponse } from '$interfaces/project.interface';

export const PATCH: RequestHandler = async ({ request }) => {
  try {
    const projectData: Project = await request.json();
    const projectId = projectData.id;

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
    if (projectData.name !== undefined) {
      updateFields.push('name: $name');
      variables.name = projectData.name;
    }
    if (projectData.description !== undefined) {
      updateFields.push('description: $description');
      variables.description = projectData.description;
    }
    if (projectData.projectType !== undefined) {
      updateFields.push('projectType: $projectType');
      variables.projectType = projectData.projectType;
    }
    if (projectData.subType !== undefined) {
      updateFields.push('subType: $subType');
      variables.subType = projectData.subType;
    }
    if (projectData.projectDetails !== undefined) {
      updateFields.push('projectDetails: $projectDetails');
      variables.projectDetails = projectData.projectDetails;
    }
    if (projectData.desiredDomain !== undefined) {
      updateFields.push('desiredDomain: $desiredDomain');
      variables.desiredDomain = projectData.desiredDomain;
    }
    if (projectData.domainStatus !== undefined) {
      updateFields.push('domainStatus: $domainStatus');
      variables.domainStatus = projectData.domainStatus;
    }
    if (projectData.goals !== undefined) {
      updateFields.push('goals: $goals');
      variables.goals = projectData.goals;
    }
    if (projectData.inspiration !== undefined) {
      updateFields.push('inspiration: $inspiration');
      variables.inspiration = projectData.inspiration;
    }
    if (projectData.targetAudience !== undefined) {
      updateFields.push('targetAudience: $targetAudience');
      variables.targetAudience = projectData.targetAudience;
    }
    if (projectData.budget !== undefined) {
      updateFields.push('budget: $budget');
      variables.budget = projectData.budget;
    }
    if (projectData.timeline !== undefined) {
      updateFields.push('timeline: $timeline');
      variables.timeline = projectData.timeline;
    }
    if (projectData.features !== undefined) {
      updateFields.push('features: $features');
      variables.features = projectData.features?.length ? projectData.features : null;
    }
    if (projectData.customFeature !== undefined) {
      updateFields.push('customFeature: $customFeature');
      variables.customFeature = projectData.customFeature;
    }
    if (projectData.primaryColour !== undefined) {
      updateFields.push('primaryColour: $primaryColour');
      variables.primaryColour = projectData.primaryColour;
    }
    if (projectData.secondaryColour !== undefined) {
      updateFields.push('secondaryColour: $secondaryColour');
      variables.secondaryColour = projectData.secondaryColour;
    }
    if (projectData.accentColour !== undefined) {
      updateFields.push('accentColour: $accentColour');
      variables.accentColour = projectData.accentColour;
    }
    if (projectData.desiredFont !== undefined) {
      updateFields.push('desiredFont: $desiredFont');
      variables.desiredFont = projectData.desiredFont;
    }
    if (projectData.estimatedPrice !== undefined) {
      updateFields.push('estimatedPrice: $estimatedPrice');
      variables.estimatedPrice = projectData.estimatedPrice;
    }
    if (projectData.formFields !== undefined) {
      updateFields.push('formFields: $formFields');
      variables.formFields = projectData.formFields ? JSON.stringify(projectData.formFields) : null;
    }
    if (projectData.pages !== undefined) {
      updateFields.push('pages: $pages');
      variables.pages = projectData.pages ? JSON.stringify(projectData.pages) : null;
    }
    if (projectData.relatedFiles !== undefined) {
      updateFields.push('relatedFiles: { set: $fileIDs }');
      variables.fileIDs = projectData.relatedFiles?.length ? projectData.relatedFiles : [];
    }
    if (projectData.setup !== undefined) {
      updateFields.push('setup: $setup');
      variables.setup = projectData.setup ? JSON.stringify(projectData.setup) : null;
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
          case 'setup':
            return '$setup: Json';
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
          inspiration
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
          setup
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
