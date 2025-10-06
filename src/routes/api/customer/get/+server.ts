import { client } from '$lib/server/graphql-client';
import type { RequestHandler } from '@sveltejs/kit';
import { gql } from 'graphql-request';

export const GET: RequestHandler = async () => {
  try {
    const query = gql`
      query getCustomers {
        customers(stage: PUBLISHED) {
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
    const response = await client.request(query);
    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};
