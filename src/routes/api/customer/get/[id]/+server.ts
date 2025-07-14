import { client } from '$lib/helper/graphql-client';
import { gql } from 'graphql-request';

export const GET = async (req) => {
  const id = req.params.id;
  try {
    const query = gql`
      query getCustomerById($id: ID!) {
        customer(where: { id: $id }, stage: PUBLISHED) {
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

    const variables = { id };
    const response = await client.request(query, variables);
    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};
