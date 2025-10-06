import { client } from '$lib/server/graphql-client';
import type { RequestHandler } from '@sveltejs/kit';
import { gql } from 'graphql-request';

export const GET: RequestHandler = async (req) => {
  const id = req.params.id;
  try {
    const query = gql`
      query getCustomerById($id: ID!) {
        customer(where: { id: $id }, stage: PUBLISHED) {
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

    const variables = { id };
    const response = await client.request(query, variables);
    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};
