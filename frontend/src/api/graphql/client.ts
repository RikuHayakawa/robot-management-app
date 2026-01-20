import { GraphQLClient } from 'graphql-request';

let instance: GraphQLClient | null = null;

export function getInstance(): GraphQLClient {
  if (!instance) {
    const base = process.env.NEXT_PUBLIC_API_URL;
    instance = new GraphQLClient(`${base}/graphql`);
  }
  return instance;
}
