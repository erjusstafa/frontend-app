import { Component } from "react";
import { GET_PRODUCTS } from "../../apollo/queries";
import { Query } from "@apollo/client/react/components";
import PropTypes from "prop-types"; // Import PropTypes

class ProductsList extends Component {
  render() {
    const { selectedCategory } = this.props;
    return (
      <div>
        <Query query={GET_PRODUCTS} variables={{ category: selectedCategory }}>
          {({
            loading: productsLoading,
            error: productsError,
            data: productsData,
          }) => {
            if (productsLoading) return <p>Loading products...</p>;
            if (productsError)
              return <p>Error fetching products: {productsError.message}</p>;

            return (
              <ul>
                {/* Render products */}
                {productsData.productsByCategory.map((product, id) => (
                  <li key={id}>{product.name}</li>
                ))}
              </ul>
            );
          }}
        </Query>
      </div>
    );
  }
}

// Define prop types for ProductsList component
ProductsList.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};
export default ProductsList;
