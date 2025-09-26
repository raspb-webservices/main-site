import { client } from '$lib/services/graphql-client';
import { gql } from 'graphql-request';

export const GET = async (req) => {
  const email = req.params.email;
  try {
    const query = gql`
      query getCustomerById($email: String!) {
        customer(where: { email: $email }) {
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

    const variables = { email };
    const response = await client.request(query, variables);
    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};
