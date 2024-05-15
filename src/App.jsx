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
    total: 0,
  };

  handleCategoryClick = (category) => {
    this.setState({ selectedCategory: category });
  };

  handleClickButton = (action, product, hoveredProduct) => {
    const productIndex = this.state.basket.findIndex(
      (item) => item.id === product.id
    );
    const clickedBasketIndex = this.state.clickedBasket.includes(product?.id);
    switch (action) {
      case "TOGGLE":
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
        break;
      case "ADD":
        this.setState({
          basket: [...this.state.basket, product],
        });
        break;
      case "DELETE":
        this.setState((prevState) => ({
          basket: prevState.basket.filter((item) => item.id !== product.id),
        }));
        break;

      case "TEST":
        break;
      default:
        break;
    }
  };
  removeFromCart = (productId) => {
    this.setState((prevState) => ({
      basket: prevState.basket.filter((item) => item.id !== productId),
      clickedBasket: prevState.clickedBasket.filter((id) => id !== productId),
    }));
  };

  updateBasketState = (updBasket) => {
    this.setState({ basket: updBasket });
    if (this.state.basket.length === 1) {
      this.setState({ clickedBasket: updBasket });
    }
  };

  render() {
    const { selectedCategory, basket, total, clickedBasket } = this.state;

    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="wrapper">
            <Header
              link={"/"}
              basket={basket}
              total={total}
              removeFromCart={this.removeFromCart}
              handleCategoryClick={this.handleCategoryClick}
              handleClickButton={this.handleClickButton}
              updateBasketState={this.updateBasketState}
            />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Products
                    clickedBasket={clickedBasket}
                    handleClickButton={this.handleClickButton}
                    selectedCategory={selectedCategory}
                  />
                }
              />
              <Route
                path="/details/:id"
                element={
                  <Details
                    basket={basket}
                    updateBasketState={this.updateBasketState}
                    handleClickButton={this.handleClickButton}
                  />
                }
              />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
