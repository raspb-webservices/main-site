import { client } from '$lib/server/graphql-client';
import { gql } from 'graphql-request';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  try {
    const query = gql`
      mutation createAsset {
        createAsset(data: {}) {
          id
          url
          upload {
            status
            expiresAt
            error {
              code
              message
            }
            requestPostData {
              url
              date
              key
              signature
              algorithm
              policy
              credential
              securityToken
            }
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
