import { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../../UI/Button";
class Attribute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      key,
      item,
      attribute,
      stock,
      clicked,
      OnClick,
      singleProductDetails,
    } = this.props;

    console.log("product", singleProductDetails);
    return (
      <div className="atr-size" key={key}>
        <div className={attribute.name}>
          <span className="atr-name">
            {!Array.isArray(attribute.items)
              ? singleProductDetails?.attributeName
              : attribute?.name}
          </span>

          <div className="attributes-nested">
            {!Array.isArray(attribute.items) ? (
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
                      Array.isArray(clicked) && clicked.includes(atr.id)
                        ? "active "
                        : "  "
                    }  ${stock ? "attributes in" : " attributes out"}`}
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
  stock: PropTypes.bool,
  clicked: PropTypes.any,
  attribute: PropTypes.object,
  item: PropTypes.object,
  OnClick: PropTypes.func,
};
export default Attribute;
