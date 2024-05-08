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
    clickedBasket: [],
  };

  handleCategoryClick = (category) => {
    this.setState({ selectedCategory: category });
  };

  addToCart = (product, hoveredProduct) => {
    //check if products exist
    const productIndex = this.state.basket.findIndex(
      (item) => item.id === product.id
    );
    const clickedBasketIndex = this.state.clickedBasket.includes(product.id);
    if (productIndex !== -1 && clickedBasketIndex) {
      this.removeFromCart(product.id);
    } else {
      this.setState((prevState) => ({
        basket: [...prevState.basket, product],
      }));

      this.setState((prevState) => ({
        clickedBasket: [...prevState.clickedBasket, hoveredProduct],
      }));
    }
  };

  removeFromCart = (productId) => {
    this.setState((prevState) => ({
      basket: prevState.basket.filter((item) => item.id !== productId),
      clickedBasket: prevState.clickedBasket.filter((id) => id !== productId),
    }));
  };

  render() {
    const { selectedCategory, basket, clickedBasket } = this.state;

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
              clickedBasket={clickedBasket}
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
