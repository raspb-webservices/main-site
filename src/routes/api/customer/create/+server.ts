import { client } from '$services/server/graphql-client';
import { gql } from 'graphql-request';
import type { RequestHandler } from '@sveltejs/kit';
import type { Customer } from '$interfaces/customer.interface';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const customerData: Customer = await request.json();

    const mutation = gql`
      mutation CreateCustomer(
        $address: String
        $auth0Id: String
        $city: String
        $company: String
        $country: String
        $email: String!
        $familyName: String
        $givenName: String
        $phone: String
        $postCode: String
        $projectIds: [AssetWhereUniqueInput!]
        $salutation: String
      ) {
        createProject(
          data: {
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
            projects: { connect: $projectIds }
            salutation: $salutation
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

    const variables = {
      address: customerData.address || null,
      auth0Id: customerData.auth0Id || null,
      city: customerData.city || null,
      company: customerData.company || null,
      country: customerData.country || null,
      email: customerData.email || 'n/a',
      familyName: customerData.familyName || null,
      givenName: customerData.givenName || null,
      phone: customerData.phone || null,
      postCode: customerData.postCode || null,
      projectsIds: customerData.projectIds?.length ? customerData.projectIds : null,
      salutation: customerData.salutation || null
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
    console.error('Error creating customer:', error);

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
