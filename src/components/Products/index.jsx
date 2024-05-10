import { Component } from "react";
import { GET_PRODUCTS_BY_CATEGORY } from "../../apollo/queries";
import { Query } from "@apollo/client/react/components";
import PropTypes from "prop-types";
import "./style.css";
import Loader from "../Loader";
import ProductList from "./ProductList";

class Products extends Component {
  render() {
    const { selectedCategory, basket, clickedBasket, addToCart } = this.props;
    return (
      <Query
        query={GET_PRODUCTS_BY_CATEGORY}
        variables={{ category: selectedCategory }}
      >
        {({
          loading: productsLoading,
          error: productsError,
          data: productsData,
        }) => {
          if (productsLoading) return <Loader />;
          if (productsError)
            return <p>Error fetching products: {productsError.message}</p>;
          return (
            <ProductList
              basket={basket}
              clickedBasket={clickedBasket}
              addToCart={addToCart}
              selectedCategory={selectedCategory}
              productsData={productsData.products}
            />
          );
        }}
      </Query>
    );
  }
}

Products.propTypes = {
  basket: PropTypes.array,
  clickedBasket: PropTypes.array,
  addToCart: PropTypes.func,
  selectedCategory: PropTypes.string,
};
export default Products;
