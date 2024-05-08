import { Component } from "react";
import "./style.css";
import PropTypes from "prop-types"; // Import PropTypes
import Img from "../../UI/Img";
import Button from "../../UI/Button";

class QuickShop extends Component {
  render() {
    const { openQuickShop, basket } = this.props;

    console.log(" 😊", basket);
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
              basket.map((item) => (
                <div key={item.id} className="item-added">
                  {/**desc */}
                  <div className="wrapper-item">
                    {/**desc */}
                    <div className="item-name-add">
                      <p>{item.name}</p>
                    </div>
                    {item.prices.map((item, id) => (
                      <span key={id} className="item-price">
                        <p>{item.currency.symbol}</p>
                        <p>{item.amount.toFixed(2)}</p>
                      </span>
                    ))}
                    {Array.isArray(item.attributes) &&
                      item.attributes.map((atr) => (
                        <div key={atr.id} className="atr-size">
                          <div>
                            <span>{atr.name}</span>
                            <div className="attributes-nested">
                              {Array.isArray(atr.items) &&
                                atr.items.map((it) => (
                                  <div
                                    key={it.id}
                                    className={`${
                                      atr.name === "Color"
                                        ? "attributes-items color-box"
                                        : " attributes-items"
                                    }`}
                                    style={{ backgroundColor: `${it.value}` }}
                                  >
                                    <span onClick={() => alert(it.value)}>
                                      {atr.name !== "Color" && it.value}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          </div>
                          {/* <div>
                            <span>{atr.name}</span>
                            <span>1</span>
                          </div> */}
                        </div>
                      ))}
                  </div>
                  {/**button */}
                  <div className="quickshop-button">
                    <Button
                      className="add-button"
                      icon={"+"}
                      height="20px"
                      width="20px"
                    />
                    <span>1</span>
                    <Button
                      className="add-button"
                      icon={"-"}
                      height="20px"
                      width="20px"
                    />
                  </div>

                  {/**img */}
                  <div className="item-image">
                    <Img
                      className=""
                      src={item.gallery.join(",")}
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
};
export default QuickShop;
