import { client } from '$lib/helper/graphql-client';
import { gql } from 'graphql-request';
import type { Customer } from '$interfaces/customer.interface';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const customer: Customer = await request.json();
    const mutation = gql`
      mutation CreateCustomer(
        $address: String
        $auth0Id: String
        $city: String
        $company: String
        $country: String
        $email: String
        $familyName: String
        $givenName: String
        $phone: String
        $postCode: String
        $salutation: String
      ) {
        createCustomer(data: {
          address: $address
          auth0Id: $auth0Id
          city: $city
          company: $company
          country: $country
          email: $email
          familyName: $familyName
          givenName: $givenName
          phone: $phone
          postCode: $postCode
          salutation: $salutation
        }) {
          id
          address
          auth0Id
          city
          company
          country
          createdAt
          email
          familyName
          givenName
          phone
          postCode
          salutation
        }
      }
    `;

    const variables = {
      address: customer.address,
      auth0Id: customer.auth0Id,
      city: customer.city,
      company: customer.company,
      country: customer.country,
      email: customer.email,
      familyName: customer.familyName,
      givenName: customer.givenName,
      phone: customer.phone,
      postCode: customer.postCode,
      salutation: customer.salutation
    };
    
    const response = (await client.request(mutation, variables)) as { createCustomer: Customer };
    return new Response(
      JSON.stringify({
        success: true,
        data: response.createCustomer
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
