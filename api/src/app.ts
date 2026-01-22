import express, { Express, Router } from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./generated/routes";
import { schema } from "./presentation/graphql";
import type { AppConfig } from "./bootstrap/config";
import type { GraphQLContext } from "./presentation/graphql/context";

export type CreateAppDeps = {
  config: AppConfig;
  getGraphQLContext: () => GraphQLContext;
};

export function createApp(deps: CreateAppDeps): Express {
  const app: Express = express();

  const allowedOrigins = deps.config.corsOrigin;

  app.use(
    cors({
      origin: allowedOrigins.length === 1 ? allowedOrigins[0] : allowedOrigins,
      credentials: true,
    })
  );

  app.use(express.json());

  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  });

  try {
    const swaggerDocument = require(`./generated/swagger.json`);
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } catch (error) {
    console.warn("API 仕様書が見つかりません。'npm run tsoa:spec' を実行してください。");
  }
  app.use(
    "/graphql",
    graphqlHTTP((_req, _res, _params) => ({
      schema,
      context: deps.getGraphQLContext(),
      graphiql: true,
    }))
  );

  const router = Router();
  RegisterRoutes(router);
  app.use(router);

  return app;
}
