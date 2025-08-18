import { client } from '$lib/helper/graphql-client';
import { gql } from 'graphql-request';
import type { RequestHandler } from './$types';

interface UpdateCustomerData {
  id?: string;
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

export const PATCH: RequestHandler = async ({ request, params }) => {
  try {
    const customerData: UpdateCustomerData = await request.json();
    const customerId = params.id;

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
    if (customerData.familyName !== undefined) {
      updateFields.push('familyName: $familyName');
      variables.familyName = customerData.familyName;
    }
    if (customerData.givenName !== undefined) {
      updateFields.push('givenName: $givenName');
      variables.givenName = customerData.givenName;
    }
    if (customerData.salutation !== undefined) {
      updateFields.push('salutation: $salutation');
      variables.salutation = customerData.salutation;
    }
    if (customerData.email !== undefined) {
      updateFields.push('email: $email');
      variables.email = customerData.email;
    }
    if (customerData.phone !== undefined) {
      updateFields.push('phone: $phone');
      variables.phone = customerData.phone;
    }
    if (customerData.company !== undefined) {
      updateFields.push('company: $company');
      variables.company = customerData.company;
    }
    if (customerData.address !== undefined) {
      updateFields.push('address: $address');
      variables.address = customerData.address;
    }
    if (customerData.postCode !== undefined) {
      updateFields.push('postCode: $postCode');
      variables.postCode = customerData.postCode;
    }
    if (customerData.city !== undefined) {
      updateFields.push('city: $city');
      variables.city = customerData.city;
    }
    if (customerData.country !== undefined) {
      updateFields.push('country: $country');
      variables.country = customerData.country;
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
