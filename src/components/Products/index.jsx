import { Component } from "react";
import { GET_PRODUCTS } from "../../apollo/queries";
import { Query } from "@apollo/client/react/components";
import PropTypes from "prop-types";
import "./style.css";
import Loader from "../Loader";
import ProductList from "./ProductList";

class Products extends Component {
  render() {
    const { selectedCategory, basket, addToCart,removeFromCart} =
      this.props;
    return (
      <Query query={GET_PRODUCTS} variables={{ category: selectedCategory }}>
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
               addToCart={addToCart}
               removeFromCart={removeFromCart}
               selectedCategory={selectedCategory}
              productsData={productsData.productsByCategory}
            />
          );
        }}
      </Query>
    );
  }
}

Products.propTypes = {
  basket: PropTypes.array,
   addToCart: PropTypes.func,
   removeFromCart: PropTypes.func,
   selectedCategory: PropTypes.string,
};
export default Products;
