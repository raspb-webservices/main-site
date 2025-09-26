import { GraphQLClient } from 'graphql-request';
const GRAPHQL_ENDPOINT = import.meta.env.GRAPHQL_ENDPOINT;
const GRAPHQL_TOKEN = 'Bearer ' +  import.meta.env.GRAPHQL_TOKEN;

export const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
    authorization: GRAPHQL_TOKEN
  }
});
