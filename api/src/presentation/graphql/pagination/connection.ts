export function buildConnection<DTO, Node>(params: {
  items: DTO[];
  hasNextPage: boolean;
  encodeCursor: (dto: DTO) => string;
  toNode: (dto: DTO) => Node;
}): {
  edges: { node: Node; cursor: string }[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
} {
  const edges = params.items.map((dto) => ({
    node: params.toNode(dto),
    cursor: params.encodeCursor(dto),
  }));
  return {
    edges,
    pageInfo: {
      hasNextPage: params.hasNextPage,
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
    },
  };
}
