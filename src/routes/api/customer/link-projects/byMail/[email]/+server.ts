import { client } from '$lib/server/graphql-client.server';
import { gql } from 'graphql-request';
import type { Customer } from '$interfaces/customer.interface';
import type { RequestHandler } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ request, url }) => {
  try {
    const customerData: Customer = await request.json();

    if (!customerData.email) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Customer Email is required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    const variables = {
      email: customerData.email,
      projectsIds: customerData.projectIds?.length ? customerData.projectIds : null
    };

    const mutation = gql`
      mutation UpdateCustomer(
        $email: String!
        $projectIds: [AssetWhereUniqueInput!]
      ) {
        updateCustomer(
          where: { email: $email }
          data: {
            projects: { connect: $projectIds }
          }
        ) {
          address
          auth0Id
          city
          company
          country
          createdAt
          email
          familyName
          givenName
          id
          phone
          postCode
          projects {
            id
            name
          }
          salutation
      }
    `;

    // GraphQL Request an Hygraph senden
    const response = (await client.request(mutation, variables)) as { updateCustomer: Customer };

    return new Response(
      JSON.stringify({
        success: true,
        data: response.updateCustomer
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error updating customer:', error);

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
        errorMessage = 'Customer not found';
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
