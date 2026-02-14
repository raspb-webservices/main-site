import { client } from '$lib/server/graphql-client.server';
import { gql } from 'graphql-request';
import type { User } from '$interfaces/user.interface';

const CUSTOMER_FIELDS = `
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
`;

function jsonResponse(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

function handleCustomerError(error: unknown): Response {
  console.error('Error updating customer:', error);

  let errorMessage = 'Unknown error occurred';
  let statusCode = 500;

  if (error instanceof Error) {
    errorMessage = error.message;

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

  return jsonResponse({ success: false, error: errorMessage }, statusCode);
}

type WhereClause = { id?: string; email?: string };

export async function updateCustomer(where: WhereClause, customerData: User): Promise<Response> {
  try {
    const updateFields: string[] = [];
    const whereKey = 'id' in where ? 'id' : 'email';
    const whereType = whereKey === 'id' ? 'ID!' : 'String!';
    const variables: Record<string, unknown> = { [whereKey]: where[whereKey] };

    if (customerData.address !== undefined) variables.address = customerData.address;
    if (customerData.auth0Id !== undefined) variables.auth0Id = customerData.auth0Id;
    if (customerData.city !== undefined) variables.city = customerData.city;
    if (customerData.company !== undefined) variables.company = customerData.company;
    if (customerData.country !== undefined) variables.country = customerData.country;
    if (customerData.email !== undefined && whereKey !== 'email') variables.email = customerData.email;
    if (customerData.familyName !== undefined) variables.familyName = customerData.familyName;
    if (customerData.givenName !== undefined) variables.givenName = customerData.givenName;
    if (customerData.phone !== undefined) variables.phone = customerData.phone;
    if (customerData.postCode !== undefined) variables.postCode = customerData.postCode;
    if (customerData.salutation !== undefined) variables.salutation = customerData.salutation;

    if (updateFields.length === 0) {
      return jsonResponse({ success: false, error: 'No fields to update provided' }, 400);
    }

    const variableDefinitions = Object.keys(variables)
      .filter((key) => key !== whereKey)
      .map((key) => `$${key}: String`)
      .join('\n        ');

    const mutation = gql`
      mutation UpdateCustomer(
        $${whereKey}: ${whereType}
        ${variableDefinitions}
      ) {
        updateCustomer(
          where: { ${whereKey}: $${whereKey} }
          data: {
            ${updateFields.join('\n            ')}
          }
        ) {
          ${CUSTOMER_FIELDS}
      }
    `;

    const response = (await client.request(mutation, variables)) as { updateCustomer: User };
    return jsonResponse({ success: true, data: response.updateCustomer });
  } catch (error) {
    return handleCustomerError(error);
  }
}

export async function linkProjectsToCustomer(where: WhereClause, projectIds: string[] | null): Promise<Response> {
  try {
    const whereKey = 'id' in where ? 'id' : 'email';
    const whereType = whereKey === 'id' ? 'ID!' : 'String!';

    const variables = {
      [whereKey]: where[whereKey],
      projectsIds: projectIds?.length ? projectIds : null
    };

    const mutation = gql`
      mutation UpdateCustomer(
        $${whereKey}: ${whereType}
        $projectIds: [AssetWhereUniqueInput!]
      ) {
        updateCustomer(
          where: { ${whereKey}: $${whereKey} }
          data: {
            projects: { connect: $projectIds }
          }
        ) {
          ${CUSTOMER_FIELDS}
      }
    `;

    const response = (await client.request(mutation, variables)) as { updateCustomer: User };
    return jsonResponse({ success: true, data: response.updateCustomer });
  } catch (error) {
    return handleCustomerError(error);
  }
}
