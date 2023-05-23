import { createSchema } from "graphql-yoga";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      logHeader: Boolean
    }
  `,
  resolvers: {
    Query: {
      logHeader(_, _args, context) {
        console.log(context.request.headers.get("x-foo"));
      },
    },
  },
});
