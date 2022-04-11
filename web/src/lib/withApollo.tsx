import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { NextPage } from "next";

export const withApollo = (Component: NextPage) => {
  return function Provider(props: any) {
    <ApolloProvider client={getApolloClient()}>
      <Component {...props} />
    </ApolloProvider>;
  };
};

function getApolloClient() {
  const httpLink = createHttpLink({
    uri: "http://localhost:3332/graphql",
    fetch,
  });

  const cache = new InMemoryCache();

  return new ApolloClient({
    link: from([httpLink]),
    cache: cache,
  });
}
