import { Component } from "react";
import { SlBasket } from "react-icons/sl";
import "./style.css";
import PropTypes from "prop-types";

class Basket extends Component {
  render() {
    const { addToCart } = this.props;
    return (
      <div className="quickshop-wrapper" onClick={() => addToCart()}>
        <SlBasket className="quickshop-basket" />
      </div>
    );
  }
}
Basket.propTypes = {
  addToCart: PropTypes.func,
};
export default Basket;
