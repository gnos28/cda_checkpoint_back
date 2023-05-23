import Fastify from "fastify";
import { yoga } from "./yoga/yoga";
import * as dotenv from "dotenv";
import mysql from "@fastify/mysql";

dotenv.config();

// export type AppOptions = {
//   // Place your custom options for app below here.
// } & Partial<AutoloadPluginOptions>;

// // Pass --options via CLI arguments in command to enable these options.
// const options: AppOptions = {};

// const app: FastifyPluginAsync<AppOptions> = async (
//   fastify,
//   opts
// ): Promise<void> => {
//   // Place here your custom code!

//   // Do not touch the following lines

//   // This loads all plugins defined in plugins
//   // those should be support plugins that are reused
//   // through your application
//   void fastify.register(AutoLoad, {
//     dir: join(__dirname, "plugins"),
//     options: opts,
//   });

//   // This loads all plugins defined in routes
//   // define your routes in one of these
//   void fastify.register(AutoLoad, {
//     dir: join(__dirname, "routes"),
//     options: opts,
//   });
// };

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};

const fastify = Fastify({
  logger: envToLogger["development"] ?? true, // defaults to true if no entry matches in the map
});

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

const { DB_USER, DB_PORT, DB_HOST, DB_PASSWORD, DB_NAME } = process.env;

fastify.register(mysql, {
  promise: true,
  host: DB_HOST,
  port: parseInt(DB_PORT || "3306"),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// fastify.register(dbConnector);
// fastify.register(yoga);

fastify.route({
  // Bind to the Yoga's endpoint to avoid rendering on any path
  url: yoga.graphqlEndpoint,
  method: ["GET", "POST", "OPTIONS"],
  handler: async (req, reply) => {
    // Second parameter adds Fastify's `req` and `reply` to the GraphQL Context
    const response = await yoga.handleNodeRequest(req, {
      req,
      reply,
    });
    response.headers.forEach((value, key) => {
      reply.header(key, value);
    });

    reply.status(response.status);

    reply.send(response.body);

    return reply;
  },
});

// This will allow Fastify to forward multipart requests to GraphQL Yoga
fastify.addContentTypeParser("multipart/form-data", {}, (req, payload, done) =>
  done(null)
);

// fastify.listen({ port: 4000 });

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 4000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

export { fastify };

// export default app;
// export { app, options };
