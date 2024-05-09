import { Component } from "react";
import PropTypes from "prop-types";

class Price extends Component {
  render() {
    const { key, item } = this.props;
    return (
      <span key={key} className="item-price">
        <p>{item.currency.symbol}</p>
        <p>{item.amount.toFixed(2)}</p>
      </span>
    );
  }
}

Price.propTypes = {
  key: PropTypes.string,
  item: PropTypes.object,
};
export default Price;
