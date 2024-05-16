import { Component } from "react";
import "./style.css";
import PropTypes from "prop-types"; // Import PropTypes
import Img from "../../UI/Img";
import Button from "../../UI/Button";
import Price from "./Prices";
import Attribute from "./Attribute";
import { AppContext } from "../../context";

class QuickShop extends Component {
  render() {
    const { openQuickShop } = this.props;

    return (
      <AppContext.Consumer>
        {(context) => {
          const { basket, handleClickButton, updateBasketState } = context;
          //get Total in $
          const getTotal = 10;
          /* basket?.reduce((accumulator, currentValue) => {
       const productTotal = currentValue?.prices.reduce(
         (acc, curr) => acc + curr.amount,
         0
       );
       return accumulator + productTotal;
     }, 0); */

          let productQuantities = {};
          basket.forEach((product) => {
            const key = JSON.stringify({
              id: product.id,
              attributes: product.attributes,
            });

            if (Object.prototype.hasOwnProperty.call(productQuantities, key)) {
              const existingProduct = { ...productQuantities[key] };
              existingProduct.quantity += 1;
              productQuantities[key] = existingProduct;
            } else {
              productQuantities[key] = {
                product: product,
                quantity: 1,
              };
            }
          });

          const removeEachItem = (product) => {
            const existingProductIndex = basket.findIndex(
              (item) => item.id === product.id
            );
            if (existingProductIndex !== -1) {
              const updatedBasket = [...basket];
              if (updatedBasket[existingProductIndex].quantity > 1) {
                updatedBasket[existingProductIndex].quantity -= 1;
              } else {
                updatedBasket.splice(existingProductIndex, 1);
              }
              updateBasketState(updatedBasket);
            }
          };

          return (
            <div
              className={
                openQuickShop ? "modal-container open" : "modal-container"
              }
            >
              <div className="wraper-quickshop">
                <span className="wraper-title">
                  My Bag, &nbsp; <p>{basket.length} items</p>
                </span>
                {Object.entries(productQuantities)
                  .reverse()
                  .map(([key, { product, quantity }]) => (
                    <div key={product.id} className="item-added">
                      <div className="wrapper-item">
                        <div className="item-name-add">
                          <p>{product.name ?? ""}</p>
                        </div>
                        {product?.price ? (
                          <span key={key} className="item-price">
                            <p>{product?.currency}</p>
                            <p>{product?.price.toFixed(2)}</p>
                          </span>
                        ) : (
                          Array.isArray(product.prices) &&
                          product.prices.map((price) => (
                            <Price
                              key={price.id}
                              price={price}
                              singleProductDetails={product}
                            />
                          ))
                        )}
                        {Array.isArray(product?.attributes) &&
                          product.attributes.map((attribute) => (
                            <Attribute
                              singleProductDetails={product}
                              key={attribute?.id}
                              attribute={attribute}
                              stock={product?.inStock}
                            />
                          ))}
                      </div>
                      <div className="quickshop-button">
                        <Button
                          className="add-button"
                          icon={"+"}
                          height="20px"
                          width="20px"
                          OnClick={() => handleClickButton("ADD", product)}
                        />
                        <span>{quantity}</span>
                        <Button
                          className="add-button"
                          icon={"-"}
                          height="20px"
                          width="20px"
                          OnClick={() => removeEachItem(product)}
                        />
                      </div>
                      <div className="item-image">
                        <Img
                          className=""
                          src={product.gallery.join(",") ?? ""}
                          height="100%"
                          width="100%"
                          alt={product.name ?? ""}
                        />{" "}
                      </div>
                    </div>
                  ))}

                <div className="total">
                  <span>Total</span>
                  <span>$ {getTotal.toFixed(2)} </span>
                </div>

                <Button
                  className={`${
                    basket.length > 0 ? "place-order" : "place-order-disabled"
                  }`}
                  icon={"place order".toUpperCase()}
                  height="43px"
                  width="auto"
                  OnClick={() => alert("place-order")}
                />
              </div>
            </div>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
QuickShop.propTypes = {
  openQuickShop: PropTypes.bool,
  basket: PropTypes.any,
};
export default QuickShop;
