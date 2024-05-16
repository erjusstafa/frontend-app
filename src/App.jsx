import { Component } from "react";
import Products from "./components/Products";
import client from "./apollo";
import { ApolloProvider } from "@apollo/client";
import Header from "./components/Header";
import Details from "./components/Details";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { AppProvider } from "./context";

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
          <Router>
            <div className="wrapper">
              <Header
                link={"/"}
                handleCategoryClick={this.handleCategoryClick}
              />
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <Products
                      handleClickButton={this.handleClickButton}
                      selectedCategory={selectedCategory}
                    />
                  }
                />
                <Route path="/details/:id" element={<Details />} />
              </Routes>
            </div>
          </Router>
        </AppProvider>
      </ApolloProvider>
    );
  }
}

export default App;
