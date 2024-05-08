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
    basket: [],
  };

  handleCategoryClick = (category) => {
    this.setState({ selectedCategory: category });
  };

  // Function to add a product to the cart
  addToCart = (product) => {
    this.setState((prevState) => ({
      basket: [...prevState.basket, product],
    }));
    localStorage.setItem("basket", JSON.stringify(this.state.basket));  
   };

  

    componentDidMount() {
    const savedBasket = localStorage.getItem("basket");
    if (savedBasket) {
      this.setState({ basket: JSON.parse(savedBasket) });
    }
  }  

  render() {
    const { selectedCategory, basket } = this.state;
    return (
      <ApolloProvider client={client}>
        <AppProvider>
          <div className="wrapper">
            <Categories
              basket={basket}
              handleCategoryClick={this.handleCategoryClick}
            />
            <Products
              basket={basket}
              addToCart={this.addToCart}
              selectedCategory={selectedCategory}
            />
          </div>
        </AppProvider>
      </ApolloProvider>
    );
  }
}

export default App;
