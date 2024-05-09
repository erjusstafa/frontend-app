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
        <div className="wraper">
          <span className="wraper-title">
            My Bag, &nbsp; <p>{basket.length} items</p>
          </span>
          <div>
            {Array.isArray(basket) &&
              basket.reverse().map((item) => (
                <div key={item.id} className="item-added">
                  {/**desc */}
                  <div className="wrapper-item">
                    {/**desc */}
                    <div className="item-name-add">
                      <p>{item.name}</p>
                    </div>
                    {Array.isArray(item.prices) &&
                      item.prices.map((item) => (
                        <Price key={item.id} item={item} />
                      ))}
                    {Array.isArray(item.attributes) &&
                      item.attributes.map((attribute) => (
                        <Attribute key={attribute.id} attribute={attribute} />
                      ))}
                  </div>
                  {/**button */}
                  <div className="quickshop-button">
                    <Button
                      className="add-button"
                      icon={"+"}
                      height="20px"
                      width="20px"
                      OnClick={() => addToCart(item)}
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

                  {/**img */}
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
          </div>
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
