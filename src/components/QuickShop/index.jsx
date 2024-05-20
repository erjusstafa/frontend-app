import React, { Component } from "react";
import "./style.css";
import PropTypes from "prop-types";
import Img from "../../UI/Img";
import Button from "../../UI/Button";
import Price from "./Prices";
import Attribute from "./Attribute";
import { AppContext } from "../../context";
import { INSERT_NEW_PRODUCT } from "../../apollo/queries";
import { Mutation } from "@apollo/client/react/components";
import { ApolloError } from "@apollo/client";
import SingleAttribute from "./SingleAttribute";

class QuickShop extends Component {
  handleInsertProduct = (insertNewProduct) => {
    const product = {
      id: "Erjus",
      name: "test",
      inStock: true,
      gallery: ["test.jpg"],
      description: "Lorem ipsum...",
      category: "clothes",
      attributes: [
        {
          id: "test",
          items: [
            {
              displayValue: "43",
              value: "43",
              id: "43",
            },
          ],
          name: "test",
          type: "text",
        },
      ],
      prices: [
        {
          amount: 99.99,
          currency: {
            label: "EUR",
            symbol: "€",
          },
        },
      ],
      brand: "dior",
    };

    insertNewProduct({ variables: { productInput: product } })
      .then((response) => {
        console.log("Product inserted:", response.data);
      })
      .catch((error) => {
        if (error instanceof ApolloError) {
          console.error("ApolloError inserting product:", error.message);
        } else {
          console.error("Error inserting product:", error);
        }
      });
  };

  render() {
    const { openQuickShop } = this.props;

    return (
      <AppContext.Consumer>
        {(context) => {
          const { basket, handleClickButton, updateBasketState } = context;

          let productQuantities = {};
          [...basket].reverse().forEach((product) => {
            const key = JSON.stringify({
              id: product.id,
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
            handleClickButton("DELETE", product);
          };

          const getTotalPrice = () => {
            return basket.reduce((accumulator, currentValue) => {
              const productTotal =
                Array.isArray(currentValue?.prices) &&
                currentValue?.prices.reduce(
                  (acc, curr) => acc + curr.amount,
                  0
                );
              return accumulator + productTotal;
            }, 0);
          };
          const totalPrice = getTotalPrice();

          return (
            <Mutation mutation={INSERT_NEW_PRODUCT}>
              {(insertNewProduct, { data, loading, error }) => (
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
                       .map(([key, { product, quantity }]) => {
                        return (
                          <div key={product.id} className="item-added">
                            <div className="wrapper-item">
                              <div className="item-name-add">
                                <p>{product.name ?? ""}</p>
                              </div>
                              {Array.isArray(product.prices) &&
                                product.prices.map((price, index) => (
                                  <React.Fragment key={index}>
                                    <Price
                                      price={price}
                                      singleProductDetails={product}
                                    />
                                  </React.Fragment>
                                ))}

                              {product.optionClicked
                                ? product.attributes.map((opt, index) => {
                                    return (
                                      <React.Fragment key={index}>
                                        <SingleAttribute opt={opt} />
                                      </React.Fragment>
                                    );
                                  })
                                : Array.isArray(product?.attributes) &&
                                  product.attributes.map((attribute) => (
                                    <React.Fragment key={attribute?.id}>
                                      <Attribute
                                        singleProductDetails={product}
                                        attribute={attribute}
                                        stock={product?.inStock}
                                        OnClick={() => console.log()}
                                      />
                                    </React.Fragment>
                                  ))}
                            </div>
                            <div className="quickshop-button">
                              <Button
                              data-testid='cart-item-amount-decrease'
                                className="add-button"
                                icon={"+"}
                                height="20px"
                                width="20px"
                                OnClick={() =>
                                  handleClickButton("ADD", product)
                                }
                              />
                              <span data-testid='cart-item-amount'>{quantity}</span>
                              <Button
                               data_testid='cart-item-amount-increase' 
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
                        );
                      })                       
                    }

                    <div className="total" data-testid='cart-total'>
                      <span>Total</span>
                      <span>$ {totalPrice.toFixed(2)} </span>
                    </div>

                    <Button
                      className={`${
                        basket.length > 0
                          ? "place-order"
                          : "place-order-disabled"
                      }`}
                      icon={"place order".toUpperCase()}
                      height="43px"
                      width="auto"
                      OnClick={() => this.handleInsertProduct(insertNewProduct)}
                    />
                    {loading && <p>Placing order...</p>}
                    {error && (
                      <p style={{ color: "red" }}>
                        Error placing order: {error.message}
                      </p>
                    )}
                    {data && (
                      <p style={{ color: "green" }}>
                        Order placed successfully!
                      </p>
                    )}
                  </div>
                </div>
              )}
            </Mutation>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
QuickShop.propTypes = {
  openQuickShop: PropTypes.bool,
};
export default QuickShop;
