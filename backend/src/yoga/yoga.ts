import { createSchema, createYoga } from "graphql-yoga";
import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { getLanguagesUseCase } from "../domain/usecases/getLanguages/getLanguages.core";
import { getLanguagesUseCaseAdapter } from "../domain/usecases/getLanguages/getLanguages.spi";
import { getCountriesUseCaseAdapter } from "../domain/usecases/getCountries/getCountries.spi";
import { getCountriesUseCase } from "../domain/usecases/getCountries/getCountries.core";
import { getContinentUseCaseAdapter } from "../domain/usecases/getContinent/getContinent.spi";
import { getContinentUseCase } from "../domain/usecases/getContinent/getContinent.core";
import { getStatesUseCaseAdapter } from "../domain/usecases/getStates/getStates.spi";
import { getStatesUseCase } from "../domain/usecases/getStates/getStates.core";

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
        Continent: () => getContinentUseCase(getContinentUseCaseAdapter)(),
        Countries: () => getCountriesUseCase(getCountriesUseCaseAdapter)(),
        Languages: () => getLanguagesUseCase(getLanguagesUseCaseAdapter)(),
        States: () => getStatesUseCase(getStatesUseCaseAdapter)(),
      },
    },
  }),
});

/**
 * We pass the incoming HTTP request to GraphQL Yoga
 * and handle the response using Fastify's `reply` API
 * Learn more about `reply` https://www.fastify.io/docs/latest/Reply/
 **/
