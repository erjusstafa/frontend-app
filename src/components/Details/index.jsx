import { useParams } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import { GET_PRODUCTS_BY_ID } from "../../apollo/queries";
import ProductDetails from "./ProductDetails";
import PropTypes from "prop-types"; // Import PropTypes

const Details = (props) => {
  const { id } = useParams();
  const { handleClickButton } = props;

  return (
    <Query query={GET_PRODUCTS_BY_ID} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error... </p>;
        return <ProductDetails data={data.products} handleClickButton={handleClickButton} />;
      }}
    </Query>
  );
};
Details.propTypes = {
  handleClickButton: PropTypes.func,
};
export default Details;
