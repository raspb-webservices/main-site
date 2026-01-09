import { GraphQLClient } from 'graphql-request';
import { PUBLIC_GRAPHQL_ENDPOINT } from '$env/static/public';
import { env } from '$env/dynamic/private';

export const client = new GraphQLClient(PUBLIC_GRAPHQL_ENDPOINT, {
  headers: {
    authorization: 'Bearer ' + env.GRAPHQL_TOKEN
  }
});
