import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";
import Carousel from "./Carousel";
import Attribute from "../../QuickShop/Attribute";
import Price from "../../QuickShop/Prices";
import Button from "../../../UI/Button";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
      selectedAttributes: [],
      clicked: [],
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
    const { showAll, selectedAttributes, clicked } = this.state;
    const { data, updateBasketState } = this.props;

    //get clicked data
    const handleSelect = (attributes, productItem, testId) => {
      const index = productItem.attributes.findIndex(
        (item) => item.id === testId
      );

      this.setState({
        selectedAttributes: {
          ...selectedAttributes,
          attributes: Object.values([attributes]),
          attributeName: productItem.attributes[index].id,
          name: productItem.name,
          gallery: productItem.gallery,
          price: productItem.prices[0].amount,
        },
      });
      this.setState((prevState) => {
        const isActiveAtribute = clicked.includes(attributes?.id);
        return {
          clicked: isActiveAtribute
            ? prevState.clicked.filter((itemId) => {itemId !== attributes.id})
            : [...prevState.clicked, attributes.id],
        };
      });
    };

    const handleAdd = () => {
      updateBasketState([selectedAttributes]);
    };

/*     console.log("🥳", clicked);
 */
    return (
      <div className="details-container">
        {Array.isArray(data) &&
          data.map((item) => {
            const parsedDescription = this.parseHTML(item.description);
            return (
              <div key={item.id} className="details-wrapper">
                <div className="details-wrapper-img">
                  <div className="details-wrapper-list-img">
                    <Carousel stock={item.inStock} images={data[0].gallery} />
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
                        stock={item.inStock}
                        OnClick={handleSelect}
                      />
                    ))}
                  <h2 className="details-wrapper-price">Price:</h2>
                  {Array.isArray(item.prices) &&
                    item.prices.map((price) => (
                      <Price item={item} key={price.id} price={price} />
                    ))}
                  <Button
                    className={
                      item.inStock ? "add-to-cart in" : "add-to-cart out"
                    }
                    icon={
                      item.inStock
                        ? "add to cart".toUpperCase()
                        : "out of stock".toUpperCase()
                    }
                    height="auto"
                    width="100%"
                    OnClick={handleAdd}
                  />
                  <div id="description">
                    {showAll
                      ? this.convertNodesToReact(parsedDescription)
                      : this.convertNodesToReact(parsedDescription.slice(0, 1))}
                    {parsedDescription.length > 3 && (
                      <span
                        className="show-les-button"
                        onClick={this.toggleShow}
                      >
                        {showAll ? "Show less" : "Show more"}
                      </span>
                    )}{" "}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  showAll: PropTypes.bool,
  basket: PropTypes.any,
  updateBasketState: PropTypes.func,
  data: PropTypes.array,
  handleClickButton: PropTypes.func,
};
export default ProductDetails;
