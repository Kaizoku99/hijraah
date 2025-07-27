// GraphQL resolvers for Hijraah API
// TODO: Update imports when generated types are available

type ResolverContext = {
  user?: any;
  supabase?: any;
};

export const resolvers = {
  Query: {
    hello: () => "Hello from GraphQL API!",
  },
  Mutation: {
    echo: (_: any, { text }: { text: string }) => text,
  },
};
