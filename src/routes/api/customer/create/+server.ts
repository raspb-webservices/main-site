import { client } from '$lib/server/graphql-client.server';
import { gql } from 'graphql-request';
import type { RequestHandler } from '@sveltejs/kit';
import { validateBody, validationErrorResponse, ValidationError } from '$lib/server/validate.server';
import { customerCreateSchema } from '$lib/server/schemas/customer.schema';
import { randomUUID } from 'crypto';

interface Customer {
  address?: string;
  auth0Id?: string;
  city?: string;
  company?: string;
  country?: string;
  createdAt: string;
  email: string;
  familyName?: string;
  givenName?: string;
  id: string;
  phone?: string;
  postCode?: string;
  projects?: Array<{ id: string; name: string }>;
  salutation?: string;
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const customerData = validateBody(customerCreateSchema, await request.json());
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
        $projectIds: [ProjectWhereUniqueInput!]
        $salutation: String
        $uuid: String!
      ) {
        createCustomer(
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
            uuid: $uuid
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
      projectIds: customerData.projectIds?.length ? customerData.projectIds : null,
      salutation: customerData.salutation || null,
      uuid: randomUUID()
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
    if (error instanceof ValidationError) {
      return validationErrorResponse(error);
    }

    console.error('Error creating customer:', error);

    let errorMessage = 'Unknown error occurred';
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.message.includes('authorization') || error.message.includes('Unauthorized')) {
        statusCode = 401;
        errorMessage = 'Authorization failed';
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
