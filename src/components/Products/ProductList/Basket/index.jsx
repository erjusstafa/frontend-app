import { Component } from "react";
import { SlBasket } from "react-icons/sl";
import "./style.css";
import PropTypes from "prop-types";

class Basket extends Component {
    render() {
        return (
          <div className="quickshop-wrapper" onClick={this.props.addToCart}>
            <SlBasket className="quickshop-basket" />
          </div>
        );
      }
}
Basket.propTypes = {
    addToCart: PropTypes.func.isRequired,
    
  };
export default Basket;
