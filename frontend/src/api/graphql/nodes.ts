import type { GraphQLClient } from 'graphql-request';
import {
  NodeDocument,
  NodeQuery,
  NodeQueryVariables,
  NodesDocument,
  NodesQuery,
  NodesQueryVariables,
} from './generated';

export class NodesGraphQLApi {
  constructor(private client: GraphQLClient) {}

  async getNodes(variables?: NodesQueryVariables): Promise<NodesQuery> {
    return this.client.request<NodesQuery, NodesQueryVariables>(NodesDocument, variables ?? {});
  }

  async getNode(id: string | number): Promise<NodeQuery> {
    return this.client.request<NodeQuery, NodeQueryVariables>(NodeDocument, { id: String(id) });
  }
}
