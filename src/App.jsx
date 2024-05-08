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
    //check if products exist
    const productIndex = this.state.basket.findIndex(
      (item) => item.id === product.id
    );
    if (productIndex !== -1) {
      this.removeFromCart(productIndex);
    } else {
      this.setState((prevState) => ({
        basket: [...prevState.basket, product],
      }));
    }
    localStorage.setItem("basket", JSON.stringify(this.state.basket));
  };

  // Function to remove a product from the cart
  removeFromCart = (id) => {
    this.setState((prevState) => ({
      basket: prevState.basket.filter((item) => item.id !== id),
    }));
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
              removeFromCart={this.removeFromCart}
              handleCategoryClick={this.handleCategoryClick}
            />
            <Products
              basket={basket}
              removeFromCart={this.removeFromCart}
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
