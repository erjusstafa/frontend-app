import { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../../UI/Button";
class Attribute extends Component {
  render() {
    const { attribute } = this.props;

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
                      : " attributes-items"
                  }`}
                  backgroundColor={it.value}
                  icon={attribute.name !== "Color" && it.value}
                  OnClick={() => alert(it.value)}
                ></Button>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

Attribute.propTypes = {
  attribute: PropTypes.object,
};
export default Attribute;