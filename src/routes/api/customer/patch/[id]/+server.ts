import { client } from '$lib/server/graphql-client.server';
import { gql } from 'graphql-request';
import type { RequestHandler } from '@sveltejs/kit';
import type { Customer } from '$interfaces/customer.interface';

export const PATCH: RequestHandler = async ({ request, url }) => {
  try {
    const customerData: Customer = await request.json();

    if (!customerData.id) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Customer ID is required'
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
    const variables: Record<string, any> = { id: customerData.id };

    if (customerData.address !== undefined) variables.address = customerData.address;
    if (customerData.auth0Id !== undefined) variables.auth0Id = customerData.auth0Id;
    if (customerData.city !== undefined) variables.city = customerData.city;
    if (customerData.company !== undefined) variables.company = customerData.company;
    if (customerData.country !== undefined) variables.country = customerData.country;
    if (customerData.email !== undefined) variables.email = customerData.email;
    if (customerData.familyName !== undefined) variables.familyName = customerData.familyName;
    if (customerData.givenName !== undefined) variables.givenName = customerData.givenName;
    if (customerData.phone !== undefined) variables.phone = customerData.phone;
    if (customerData.postCode !== undefined)  variables.postCode = customerData.postCode;
    if (customerData.postCode !== undefined) variables.postCode = customerData.postCode;

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
      .map((key) => `$${key}: String`)
      .join('\n        ');

    const mutation = gql`
      mutation UpdateCustomer(
        $id: ID!
        ${variableDefinitions}
      ) {
        updateCustomer(
          where: { id: $id }
          data: {
            ${updateFields.join('\n            ')}
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
