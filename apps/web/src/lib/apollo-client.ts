import { ApolloClient, HttpLink, InMemoryCache, from } from "react-query";
import { onError } from "react-query/link/error";

import type { NormalizedCacheObject } from "@apollo/client";

let client: ApolloClient<NormalizedCacheObject> | undefined;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:4000/graphql",
  credentials: "same-origin",
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
      query: {
        fetchPolicy: "network-only",
      },
    },
    connectToDevTools: process.env.NODE_ENV === "development",
  });
}

export function getClient() {
  // Create a new client if there's none or we're on the server
  if (typeof window === "undefined" || !client) {
    client = createApolloClient();
  }

  return client;
}

export const apolloClient = getClient();
