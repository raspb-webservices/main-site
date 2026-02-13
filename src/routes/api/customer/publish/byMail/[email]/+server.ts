import { client } from '$lib/server/graphql-client.server';
import { gql } from 'graphql-request';
import type { RequestHandler } from '@sveltejs/kit';
import type { User } from '$interfaces/user.interface';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const customerData: User = await request.json();
    const customerEmail = customerData.email;
    const mutation = gql`
      mutation PublishCustomer($email: String!) {
        publishCustomer(where: { email: $email }) {
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
      }
    `;

    const variables = { email: customerEmail };
    const response = (await client.request(mutation, variables)) as { publishCustomer: User };

    return new Response(
      JSON.stringify({
        success: true,
        data: response.publishCustomer
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error creating customer:', error);

    let errorMessage = 'Unknown error occurred';
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.message.includes('authorization') || error.message.includes('Unauthorized')) {
        statusCode = 401;
        errorMessage = 'Authorization failed';
      } else if (error.message.includes('validation') || error.message.includes('required')) {
        statusCode = 400;
        errorMessage = 'Validation error';
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
