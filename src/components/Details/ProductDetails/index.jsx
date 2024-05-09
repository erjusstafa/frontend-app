import { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";
class ProductDetails extends Component {
  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <div className="details-container">
        {Array.isArray(data) &&
          data.map((item) => <div key={item.id}>{item.id}</div>)}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  data: PropTypes.array,
};
export default ProductDetails;
