import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./styles/tailwind.css";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
