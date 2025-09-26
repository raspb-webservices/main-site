import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

const GRAPHQL_ENDPOINT = 'https://api-eu-west-2.hygraph.com/v2/cm20c164y00dh07ut82c04dgs/master';
const GRAPHQL_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3NTQ2NjI4NTcsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY20yMGMxNjR5MDBkaDA3dXQ4MmMwNGRncy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiOTMzNGUyYmYtMzYxOS00NTZjLThjNjQtOTU1Y2NjMTcxOGExIiwianRpIjoiY21lMnd5bTZoMGVyZzA2bGY4MG00YTFzbiJ9.AuC6AbSJgqiXDla2zhoOop87hxc-qZfEkXQAhQ6yhy1JQBKDNr1nqCpowic3scew8EgUKo9K1VsmPgteW6S2ZLNsIC1C-YCHFyv1FvnKvtWHzn4nN8urtg7-ptegnE97pSkg-DEYt1Dck-5i7yBRXWWHPvzslCRxWQjbbJ2Dfv-gYFPqCl13WNpwR1NAmYH7-_UuVW1CFiXpHwS-7mXT1u6ByQXGf7N1eHWg6D2aa3DLrT4YFQgvstFi305pvFd6PiFtZjKKpFayWwOOJa3DSpMb2Q_IoRUnNtfTt28U9FIegMV-W52Ic4KxA-il-AZYvjmGZRRYPRJynVmYzTm387eWiagdLeBEqjpHCEU63ELEjHKuLy94l2dAs8Rio09_LuimhORGxxGZwCVlDIcC-Wv-d1WYkNZB2oNeNjO93mnE48is7UQipCJiHNJ7MYLKkLvlbTTdP_qDklZ9tAho7op7_x68Pq4cGCz4qlqMmMrMt2sDrFHfj0dsrSrIKbH7_uN6vUPzZsGHvuFbJL5xCMI_R2yHnRW79mfXu92iHgJQNsg9iMpO1jHD9F710GNMjHBmA7vTA21al2njE_hwTRH8Je4Zca-_8NMeUhEeI7YcGqyu0HrJwi1OCdcsRl2ybj3qbat7Domu9MVUVbieE_SMUITUk7RdqXfbM0c6tBM';

async function graphqlRequest(query: string, variables: any = {}) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GRAPHQL_TOKEN}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(`GraphQL error: ${result.errors.map((e: any) => e.message).join(', ')}`);
  }

  return result.data;
}

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
    const linkCustomerMutation = `
      mutation LinkCustomerToProject($projectId: ID!, $customerId: ID!) {
        updateProject(
          where: { id: $projectId }
          data: { 
            owner: { 
              connect: { id: $customerId } 
            } 
          }
        ) {
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

    const result = await graphqlRequest(linkCustomerMutation, {
      projectId,
      customerId
    });

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
    let errorDetails: string[] = [];

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
