import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri = import.meta.env.VITE_GRAPHQL_API_URL;

const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache(),
});

export default client;
