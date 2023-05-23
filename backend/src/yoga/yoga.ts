import { createSchema, createYoga } from "graphql-yoga";
import fastify, { FastifyRequest, FastifyReply } from "fastify";

const app = fastify({ logger: true });

export const yoga = createYoga<{
  req: FastifyRequest;
  reply: FastifyReply;
}>({
  // Integrate Fastify logger
  logging: {
    debug: (...args) => args.forEach((arg) => app.log.debug(arg)),
    info: (...args) => args.forEach((arg) => app.log.info(arg)),
    warn: (...args) => args.forEach((arg) => app.log.warn(arg)),
    error: (...args) => args.forEach((arg) => app.log.error(arg)),
  },
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Continent {
        id: ID
        code: String
        name: String
        countries: [Countries]
      }

      type Countries {
        id: ID
        code: String
        name: String
        native: String
        phone: String
        capital: String
        currency: String
        emoji: String
        emojiU: String
        states: [String]
        languages: [Languages]
      }

      type Languages {
        id: ID
        code: String
        name: String
      }

      type States {
        id: ID
        value: String
      }

      type Query {
        Continent: [Continent]
        Countries: [Countries]
        Languages: [Languages]
        States: [States]
      }
    `,
    resolvers: {
      Query: {
        Continent: () => {},
        Countries: () => {},
        Languages: () => {},
        States: () => {},
      },
    },
  }),
});

/**
 * We pass the incoming HTTP request to GraphQL Yoga
 * and handle the response using Fastify's `reply` API
 * Learn more about `reply` https://www.fastify.io/docs/latest/Reply/
 **/
