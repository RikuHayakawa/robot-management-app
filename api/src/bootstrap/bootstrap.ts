import { loadConfig } from "./config";
import { createAdapters } from "./adapters";
import { initIoc } from "./ioc";
import { createApp } from "../app";
import { createGraphQLContext } from "../presentation/graphql";

export function bootstrap() {
  const config = loadConfig();
  const adapters = createAdapters(config);
  initIoc(adapters);
  const app = createApp({
    config,
    getGraphQLContext: () => createGraphQLContext(adapters),
  });
  return { app, config };
}
