import { Component } from "react";
import ProductsList from "./components/Products";
import client from "./apollo";
import { ApolloProvider } from "@apollo/client";
import Categories from "./components/Categories";

class App extends Component {
  state = {
    selectedCategory: "all", // Default to "all" category
  };

  handleCategoryClick = (category) => {
    this.setState({ selectedCategory: category });
  };

  render() {
    const { selectedCategory } = this.state;
    return (
      <ApolloProvider client={client}>
        <Categories handleCategoryClick={this.handleCategoryClick} />
        <ProductsList selectedCategory={selectedCategory} />
      </ApolloProvider>
    );
  }
}

export default App;
