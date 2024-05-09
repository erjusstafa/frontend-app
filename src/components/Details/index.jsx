import { useParams } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import { GET_PRODUCTS_BY_ID } from "../../apollo/queries";
import ProductDetails from "./ProductDetails";

const Details = () => {
  const { id } = useParams();

  return (
    <Query query={GET_PRODUCTS_BY_ID} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <p style={{ fontSize: "100px" }}>Loading...</p>;
        if (error) return <p style={{ fontSize: "100px" }}>Error... </p>;
        return <ProductDetails data={data.products} />;
      }}
    </Query>
  );
};

export default Details;
