import type { components, operations, paths } from './schema';

export type ApiSchemaPaths = paths;
export type ApiSchemaComponents = components;
export type ApiSchemaOperations = operations;

export type ApiResponse<T extends keyof operations> = operations[T] extends {
  responses: infer R;
}
  ? R extends Record<200, { content: { 'application/json': infer Content } }>
    ? Content
    : never
  : never;
