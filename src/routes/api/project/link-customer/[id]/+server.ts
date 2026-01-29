import { json } from '@sveltejs/kit';
import { client } from '$lib/server/graphql-client.server';
import { gql } from 'graphql-request';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ params, request }) => {
  try {
    const projectId = params.id;
    const { customerId } = await request.json();

    if (!projectId) {
      return json(
        {
          success: false,
          error: 'Projekt ID ist erforderlich',
          details: ['Keine Projekt ID in der URL gefunden.']
        },
        { status: 400 }
      );
    }

    if (!customerId) {
      return json(
        {
          success: false,
          error: 'Customer ID ist erforderlich',
          details: ['Keine Customer ID im Request Body gefunden.']
        },
        { status: 400 }
      );
    }

    console.log('Linking customer to project:', { projectId, customerId });

    // Projekt mit Customer verknüpfen
    const linkCustomerMutation = gql`
      mutation LinkCustomerToProject($projectId: ID!, $customerId: ID!) {
        updateProject(where: { id: $projectId }, data: { owner: { connect: { id: $customerId } } }) {
          id
          name
          owner {
            id
            email
            givenName
            familyName
          }
        }
      }
    `;

    const variables = { projectId: projectId, customerId: customerId };
    const result = (await client.request(linkCustomerMutation, variables)) as any;

    if (result.updateProject) {
      console.log('Customer erfolgreich mit Projekt verknüpft:', result.updateProject.id);

      return json({
        success: true,
        data: result.updateProject,
        message: 'Customer erfolgreich mit Projekt verknüpft'
      });
    } else {
      throw new Error('Customer konnte nicht mit Projekt verknüpft werden');
    }
  } catch (error) {
    console.error('Fehler beim Verknüpfen von Customer und Projekt:', error);

    let errorMessage = 'Unbekannter Fehler beim Verknüpfen von Customer und Projekt';
    const errorDetails: string[] = [];

    if (error instanceof Error) {
      errorMessage = error.message;

      // Spezifische Hygraph-Fehler behandeln
      if (error.message.includes('not found')) {
        errorMessage = 'Projekt oder Customer nicht gefunden';
        errorDetails.push('Das angegebene Projekt oder der Customer existiert nicht.');
      } else if (error.message.includes('validation')) {
        errorMessage = 'Validierungsfehler beim Verknüpfen';
        errorDetails.push('Die Verknüpfung konnte aufgrund von Validierungsfehlern nicht erstellt werden.');
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Netzwerkfehler beim Verknüpfen';
        errorDetails.push('Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.');
      }
    }

    return json(
      {
        success: false,
        error: errorMessage,
        details: errorDetails.length > 0 ? errorDetails : ['Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.']
      },
      { status: 500 }
    );
  }
};
