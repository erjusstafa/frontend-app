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
    gallery
    inStock
    description
    category
    attributes{
      id
      items{
        displayValue
        value
        id
      }
      name
      type
    }
    prices{
      amount
      currency{
        symbol
      }
    }
  }
}
`;
