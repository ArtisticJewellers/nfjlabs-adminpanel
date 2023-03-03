import { StrictMode } from "react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
const cache = new InMemoryCache({});
const client = new ApolloClient({
  // uri: "http://54.211.23.70:5000/graphql",
  uri: "http://localhost:5000/graphql",
  cache,
});

ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
  document.getElementById("root")
);
