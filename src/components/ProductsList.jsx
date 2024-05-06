import { Component } from "react";
import { GET_PRODUCTS } from "../apollo/queries";
import { Query } from "@apollo/client/react/components"; // Import Query component

class ProductsList extends Component {
  render() {
    return (
      <Query query={GET_PRODUCTS}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          return (
            <ul>
              {Array.isArray(data.categories) &&
                data.categories.map((product) => (
                  <li key={product.id}>{product.name}</li>
                ))}
              grgrr
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default ProductsList;
