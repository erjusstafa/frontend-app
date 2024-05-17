import { Component } from "react";
import PropTypes from "prop-types";

class Price extends Component {
  render() {
    const { key, price } = this.props;
     return (
      <span key={key} className="item-price">
        <p>{price?.currency?.symbol}</p>
        <p>{price.amount.toFixed(2)}</p>
      </span>
    );
  }
}

Price.propTypes = {
  key: PropTypes.string,
  price: PropTypes.object,
};
export default Price;
