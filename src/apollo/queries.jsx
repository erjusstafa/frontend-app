import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProducts($category: String!) {
    products(id: "", category: $category) {
      id
      name
      gallery
      inStock
      description
      category
      attributes {
        id
        items {
          displayValue
          value
          id
        }
        name
        type
      }
      prices {
        amount
        currency {
          symbol
        }
      }
      brand
      quantity
    }
  }
`;

export const GET_PRODUCTS_BY_ID = gql`
  query GetDetails($id: String!) {
    products(id: $id, category: "") {
      id
      name
      gallery
      inStock
      description
      category
      attributes {
        id
        items {
          displayValue
          value
          id
        }
        name
        type
      }
      prices {
        amount
        currency {
          symbol
        }
      }
      brand
      quantity
    }
  }
`;
export const INSERT_NEW_PRODUCT = gql`
  mutation InsertNewProduct($productInput: ProductInput!) {
    insertNewProduct(productInput: $productInput) {
      id
      name
      gallery
      inStock
      description
      category
      attributes {
        id
        items {
          displayValue
          value
          id
        }
        name
        type
      }
      prices {
        amount
        currency {
          symbol
        }
      }
      brand
      quantity
    }
  }
`;
