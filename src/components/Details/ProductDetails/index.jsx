import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";
import Carousel from "./Carousel";
import Attribute from "../../QuickShop/Attribute";
import Price from "../../QuickShop/Prices";
import Button from "../../../UI/Button";
import { AppContext } from "../../../context";
import Description from "./Description";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
      toggleButton: false,
    };
  }

  toggleShow = () => {
    this.setState((prevState) => ({
      showAll: !prevState.showAll,
    }));
  };

  // Function to parse HTML string into an array of DOM nodes
  parseHTML = (html) => {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, "text/html");
    return Array.from(doc.body.childNodes);
  };

  // Function to convert a DOM node to a React element
  convertNodeToReact(node, index) {
    if (node.nodeType === Node.TEXT_NODE) {
      return <span key={index}>{node.textContent}</span>;
    } else {
      const tagName = node.tagName.toLowerCase();
      if (["ul", "li"].includes(tagName)) {
        return this.convertNodesToReact(Array.from(node.childNodes));
      }
      const props = {};
      for (let i = 0; i < node.attributes.length; i++) {
        const { name, value } = node.attributes[i];
        props[name] = value;
      }
      return React.createElement(
        tagName,
        { key: index, ...props },
        this.convertNodesToReact(Array.from(node.childNodes))
      );
    }
  }

  // Create a React element with the tag name, props, and child nodes converted to React elements
  convertNodesToReact = (nodes) => {
    return nodes.map((node, index) => this.convertNodeToReact(node, index));
  };

  render() {
    const { showAll, toggleButton } = this.state;
    const { data } = this.props;

    return (
      <AppContext.Consumer>
        {(context) => {
          const {
            basket,
            clicked,
            selectedAttributes,
            addSingleAttribute,
            updateBasketState,
            isClickedAtribute,
            handleClickButton,
          } = context;

          //get clicked data
          const handleClickOption = (attributes, productItem, id, test) => {
            addSingleAttribute(attributes, productItem, id, test); //call functio from context-API
            isClickedAtribute(attributes);
          };

          const handleAddSelectedAttrToCart = () => {
            updateBasketState([...basket, selectedAttributes]);
          };

          const addProductToCart = (item) => {
            //we check if an item has no attribute, we add it directly to the cart
            if (item.attributes.length === 0) {
              handleClickButton("TOGGLE", item);
              this.setState({ toggleButton: !toggleButton });
            } else {
              if (clicked.length > 0) {
                handleAddSelectedAttrToCart();
              } else {
                alert("Please, click on an option!");
              }
            }
          };

          return (
            <div className="details-container">
              {Array.isArray(data) &&
                data.map((item) => {
                  return (
                    <div key={item.id} className="details-wrapper">
                      <div className="details-wrapper-img">
                        <div className="details-wrapper-list-img">
                          <Carousel
                            stock={item.inStock}
                            images={data[0].gallery}
                          />
                        </div>
                      </div>
                      <div className="details-wrapper-description">
                        <h2>{item.name}</h2>
                        {Array.isArray(item.attributes) &&
                          item.attributes.map((attribute) => (
                            <Attribute
                              item={item}
                              clicked={clicked}
                              key={attribute.id}
                              attribute={attribute}
                              OnClick={handleClickOption}
                            />
                          ))}
                        <h2 className="details-wrapper-price">Price:</h2>
                        {Array.isArray(item.prices) &&
                          item.prices.map((price) => (
                            <Price
                              item={item}
                              key={price.id}
                              price={price}
                              atribute={item.attributes}
                            />
                          ))}
                        <Button
                          className={
                            item.inStock ? "add-to-cart in" : "add-to-cart out"
                          }
                          icon={
                            item.inStock
                              ? !toggleButton
                                ? "add to cart".toUpperCase()
                                : "remove to cart".toUpperCase()
                              : "out of stock".toUpperCase()
                          }
                          height="auto"
                          width="100%"
                          OnClick={() => addProductToCart(item)}
                        />

                        <Description
                          showAll={showAll}
                          parsedDescription={this.parseHTML(item.description)}
                          toggleShow={this.toggleShow}
                          convertNodesToReact={this.convertNodesToReact}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

ProductDetails.propTypes = {
  showAll: PropTypes.bool,
  data: PropTypes.array,
};
export default ProductDetails;
