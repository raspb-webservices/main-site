import { client } from '$lib/helper/graphql-client';
import { gql } from 'graphql-request';
import type { RequestHandler } from './$types';
import type { User } from '../../../../interfaces/user.interface';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const user: User = await request.json();
    const mutation = gql`
      mutation CreateUser($id: ID!) {
        createUser(data: { id: $id }) {
          id
        }
      }
    `;
    const variables = {
      id: user.id
    };
    const response = (await client.request(mutation, variables)) as { createUser: User };
    return new Response(
      JSON.stringify({
        success: true,
        data: response.createUser
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error creating user:', error);

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
