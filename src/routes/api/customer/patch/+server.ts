import { client } from '$lib/helper/graphql-client';
import { gql } from 'graphql-request';
import type { RequestHandler } from './$types';

interface UpdateCustomerData {
  id: string;
  familyName?: string;
  givenName?: string;
  salutation?: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: string;
  postCode?: string;
  city?: string;
  country?: string;
}

export const PATCH: RequestHandler = async ({ request, url }) => {
  try {
    const requestData: UpdateCustomerData = await request.json();

    // Kunden-ID aus dem Request-Body oder URL-Parameter extrahieren
    const customerId = requestData.id || url.searchParams.get('id');

    if (!customerId) {
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
    const variables: Record<string, any> = { id: customerId };

    // Alle möglichen Felder prüfen und nur die vorhandenen hinzufügen
    if (requestData.familyName !== undefined) {
      updateFields.push('familyName: $familyName');
      variables.familyName = requestData.familyName;
    }
    if (requestData.givenName !== undefined) {
      updateFields.push('givenName: $givenName');
      variables.givenName = requestData.givenName;
    }
    if (requestData.salutation !== undefined) {
      updateFields.push('salutation: $salutation');
      variables.salutation = requestData.salutation;
    }
    if (requestData.email !== undefined) {
      updateFields.push('email: $email');
      variables.email = requestData.email;
    }
    if (requestData.phone !== undefined) {
      updateFields.push('phone: $phone');
      variables.phone = requestData.phone;
    }
    if (requestData.company !== undefined) {
      updateFields.push('company: $company');
      variables.company = requestData.company;
    }
    if (requestData.address !== undefined) {
      updateFields.push('address: $address');
      variables.address = requestData.address;
    }
    if (requestData.postCode !== undefined) {
      updateFields.push('postCode: $postCode');
      variables.postCode = requestData.postCode;
    }
    if (requestData.city !== undefined) {
      updateFields.push('city: $city');
      variables.city = requestData.city;
    }
    if (requestData.country !== undefined) {
      updateFields.push('country: $country');
      variables.country = requestData.country;
    }

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
          id
          familyName
          givenName
          salutation
          email
          phone
          company
          address
          postCode
          city
          country
          createdAt
          updatedAt
        }
      }
    `;

    console.log('UPDATE CUSTOMER VARIABLES:', variables);
    console.log('UPDATE FIELDS:', updateFields);

    // GraphQL Request an Hygraph senden
    const response = (await client.request(mutation, variables)) as { updateCustomer: any };

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
