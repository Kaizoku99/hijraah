import { Query, Mutation, MutationEchoArgs } from "./generated/graphql";

type ResolverContext = {
  user?: any;
  supabase?: any;
};

export const resolvers = {
  Query: {
    hello: (): Query["hello"] => "Hello from GraphQL API!",
  },
  Mutation: {
    echo: (_: any, { text }: MutationEchoArgs): Mutation["echo"] => text,
  },
};
