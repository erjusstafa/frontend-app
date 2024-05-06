import { Component } from "react";
 import ProductsList from "./components/ProductsList";
import client from "./apollo";
import { ApolloProvider } from "@apollo/client";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <ProductsList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
