import { Component } from "react";
import "./style.css";
import PropTypes from "prop-types"; // Import PropTypes
import Img from "../../UI/Img";
import Button from "../../UI/Button";
import Price from "./Prices";
import Attribute from "./Attribute";

class QuickShop extends Component {
  render() {
    const { openQuickShop, basket, removeFromCart, addToCart } = this.props;
    return (
      <div
        className={openQuickShop ? "modal-container open" : "modal-container"}
      >
        <div className="wraper-quickshop">
          <span className="wraper-title">
            My Bag, &nbsp; <p>{basket.length} items</p>
          </span>
          {Array.isArray(basket) &&
            basket.reverse().map((item) => (
              <div key={item.id} className="item-added">
                <div className="wrapper-item">
                  <div className="item-name-add">
                    <p>{item.name}</p>
                  </div>
                  {Array.isArray(item.prices) &&
                    item.prices.map((item) => (
                      <Price key={item.id} item={item} />
                    ))}
                  {Array.isArray(item.attributes) &&
                    item.attributes.map((attribute) => (
                      <Attribute
                        key={attribute.id}
                        attribute={attribute}
                        stock={item.inStock}
                      />
                    ))}
                </div>
                <div className="quickshop-button">
                  <Button
                    className="add-button"
                    icon={"+"}
                    height="20px"
                    width="20px"
                    OnClick={() => addToCart(item, item.id)}
                  />
                  <span>1</span>
                  <Button
                    className="add-button"
                    icon={"-"}
                    height="20px"
                    width="20px"
                    OnClick={() => removeFromCart(item.id)}
                  />
                </div>
                <div className="item-image">
                  <Img
                    className=""
                    src={item.gallery.join(",") ?? ""}
                    height="100%"
                    width="100%"
                    alt={item.name}
                  />{" "}
                </div>
              </div>
            ))}
          {basket.length > 0 && (
            <div className="total">
              <span>Total</span>
              <span>$0</span>
            </div>
          )}

          <Button
            className={`${
              basket.length > 0 ? "place-order" : "place-order-disabled"
            }`}
            icon={"place order".toUpperCase()}
            height="43px"
            width="auto"
            OnClick={() => alert("rrjrng")}
          />
        </div>
      </div>
    );
  }
}
QuickShop.propTypes = {
  openQuickShop: PropTypes.bool,
  basket: PropTypes.array,
  removeFromCart: PropTypes.func,
  addToCart: PropTypes.func,
};
export default QuickShop;
