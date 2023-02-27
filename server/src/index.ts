import express from "express";
import { createServer } from "http";
import { PrismaClient } from "@prisma/client";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import { GraphQLError } from "graphql";
import { getSession } from "next-auth/react";
import { PubSub } from "graphql-subscriptions";
import cors from "cors";
import { json } from "body-parser";
import { makeExecutableSchema } from "@graphql-tools/schema";
import * as dotenv from "dotenv";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { GraphQLContext } from "./util/types";

// Apollo Server
// GraphQL type definitions
// Resolvers

// dataset

(async function main() {
  dotenv.config();

  //Crerate schema for ApolloServer and WebSockt server
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  //Create Express app and Http Server
  const app = express();
  const httpServer = createServer(app);

  // //Create WebSocket Server
  // const wsServer = new WebSocketServer({
  //   server: httpServer,
  //   path: "/graphql/subscriptions",
  // });

  // Context parameters
  const pubsub = new PubSub();
  const prisma = new PrismaClient();

  // // Save the returned server's info so we can shutdown this server later
  // const serverCleanup = useServer(
  //   {
  //     schema,
  //     /*context: (ctx: SubscriptionContext) => {
  //       // This will be run every time the client sends a subscription request
  //       // Returning an object will add that information to our
  //       // GraphQL context, which all of our resolvers have access to.
  //       return getSubscriptionContext(ctx);
  //     },*/
  //   },
  //   wsServer
  // );

  // Set up ApolloServer.
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      // {
      //   async serverWillStart() {
      //     return {
      //       async drainServer() {
      //         await serverCleanup.dispose();
      //       },
      //     };
      //   },
      // },
    ],
  });
  await server.start();

  const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  };

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(corsOptions),
    json(),
    (req, res, next) => {
      console.log(req.body);
      next();
    },
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<GraphQLContext> => {
        const session = await getSession({ req });
        console.log("this is the session here:", session);

        return { session, prisma };
      },
      // context: async ({ req }): Promise<GraphQLContext> => {
      //   const session = await getSession({ req });
      //   return { session: session as Session, prisma, pubsub };
      // },
    })
  );

  // server.applyMiddleware({ app, path: "/graphql", cors: corsOptions });

  const PORT = 4000;

  // Now that our HTTP server is fully set up, we can listen to it.
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
})().catch((err) => console.log(err));
