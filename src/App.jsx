import { Component } from "react";
import Products from "./components/Products";
import client from "./apollo";
import { ApolloProvider } from "@apollo/client";
import Header from "./components/Header";
import Details from "./components/Details";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
    const productIndex = this.state.basket.findIndex(
      (item) => item.id === product.id
    );
    const clickedBasketIndex = this.state.clickedBasket.includes(product?.id);
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
        <Router>
          <div className="wrapper">
            <Header
              link={"/"}
              basket={basket}
              removeFromCart={this.removeFromCart}
              handleCategoryClick={this.handleCategoryClick}
              addToCart={this.addToCart}
            />

            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Products
                    basket={basket}
                    clickedBasket={clickedBasket}
                    addToCart={this.addToCart}
                    selectedCategory={selectedCategory}
                  />
                }
              />
              <Route
                path="/details/:id"
                element={<Details addToCart={this.addToCart} />}
              />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
