import { GraphQLClient } from 'graphql-request';
import { PUBLIC_GRAPHQL_ENDPOINT } from '$env/static/public';
import { GRAPHQL_TOKEN } from '$env/static/private';

export const client = new GraphQLClient(PUBLIC_GRAPHQL_ENDPOINT, {
  headers: {
    authorization: 'Bearer ' + GRAPHQL_TOKEN
  }
});
