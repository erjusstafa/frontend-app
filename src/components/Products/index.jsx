import { Component } from "react";
import { GET_PRODUCTS } from "../../apollo/queries";
import { Query } from "@apollo/client/react/components";
import PropTypes from "prop-types";
import "./style.css";
import Loader from "../Loader";
import ProductList from "./ProductList";

class Products extends Component {
  render() {
    const { basket, selectedCategory } = this.props;
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
              addToCart= {this.props.addToCart}
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
  basket: PropTypes.array.isRequired,
  addToCart : PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};
export default Products;
