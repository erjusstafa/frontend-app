import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
query GetProducts($category: String!) {
  productsByCategory(category: $category) {
    id
    name
    inStock
    category
    attributes {
      id
    }
    prices {
      amount
    }
    brand
  }
}
`;
