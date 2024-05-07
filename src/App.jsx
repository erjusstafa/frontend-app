import { Component } from "react";
import Products from "./components/Products";
import client from "./apollo";
import { ApolloProvider } from "@apollo/client";
import Categories from "./components/Categories";
import { AppProvider } from "./context";
import "./App.css";

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
        <AppProvider>
         <div className="wrapper"> 
         <Categories handleCategoryClick={this.handleCategoryClick} />
          <Products selectedCategory={selectedCategory} />
         </div>
        </AppProvider>
      </ApolloProvider>
    );
  }
}

export default App;
