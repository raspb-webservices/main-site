import { client } from '$lib/helper/graphql-client';
import { gql } from 'graphql-request';

export const GET = async () => {
  try {
    const query = gql`
      query getCustomers {
        customers(stage: PUBLISHED) {
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
          projects {
            id
            name
          }
        }
      }
    `;
    const response = await client.request(query);
    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};
