import { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../../UI/Button";
class Attribute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item, attribute, isClicked, OnClick, singleProductDetails } =
      this.props;

    let checkIfIsArray = !Array.isArray(attribute.items);

    return (
      <div className="atr-size">
        <div className={attribute.name}>
          <span className="atr-name">
            {checkIfIsArray
              ? singleProductDetails?.attributeName
              : attribute?.name}
          </span>

          <div className={`attributes-nested`}>
            {checkIfIsArray ? (
              <Button
                key={attribute.id}
                className={`${
                  attribute.name === "Color"
                    ? "attributes-items color-box"
                    : " attributes-items out "
                }`}
                id={`${"attributes in"}`}
                backgroundColor={attribute.value}
                icon={
                  singleProductDetails?.attributeName !== "Color" &&
                  attribute.value
                }
              ></Button>
            ) : (
              attribute.items.map((atr) => {
                return (
                  <Button
                    key={atr.id}
                    className={`${
                      attribute.name === "Color"
                        ? "attributes-items color-box"
                        : " attributes-items out "
                    }`}
                    id={`${
                      isClicked &&
                      isClicked[attribute?.id] === atr?.id &&
                      item?.inStock
                        ? "active "
                        : "  "
                    }  ${item?.inStock ? "attributes in" : " attributes out"}`}
                    backgroundColor={atr.value}
                    icon={attribute.name !== "Color" && atr.value}
                    OnClick={() => OnClick(atr, item, attribute.id)}
                  ></Button>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }
}

Attribute.propTypes = {
  singleProductDetails: PropTypes.any,
  key: PropTypes.string,
  isClicked: PropTypes.any,
  attribute: PropTypes.object,
  item: PropTypes.object,
  OnClick: PropTypes.func,
};
export default Attribute;
