import { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../../UI/Button";
class Attribute extends Component {
  render() {
    const { attribute, stock, OnClick } = this.props;

    return (
      <div className="atr-size">
        <div>
          <span className="atr-name">
            {attribute.name}
            {":"}
          </span>
          <div className="attributes-nested">
            {Array.isArray(attribute.items) &&
              attribute.items.map((it) => (
                <Button
                  key={it.id}
                  className={`${
                    attribute.name === "Color"
                      ? "attributes-items color-box"
                      : " attributes-items out"
                  }`}
                  id={`${stock ? "attributes in" : " attributes out"}`}
                  backgroundColor={it.value}
                  icon={attribute.name !== "Color" && it.value}
                  OnClick={OnClick}
                ></Button>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

Attribute.propTypes = {
  stock: PropTypes.bool,
  attribute: PropTypes.object,
  OnClick :PropTypes.func
};
export default Attribute;
