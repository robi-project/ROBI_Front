import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql", // Mets ici l’URL de ton backend GraphQL
  cache: new InMemoryCache(),
});

export default client;