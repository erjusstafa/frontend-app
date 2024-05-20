import { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../../UI/Button";

class SingleAttribute extends Component {
  render() {
    const { opt } = this.props;
    return (
      <div className="atr-size">
        <div className={opt.attributes.name}>
          <span className="atr-name">{opt.attrName}</span>

          <div className={`attributes-nested`}>
            <Button
              key={opt.attributes.id}
              className={`${
                opt.attrName === "Color"
                  ? "attributes-items color-box"
                  : " attributes-items out "
              }`}
              id={`${"attributes in"}`}
              backgroundColor={opt.attributes.value}
              icon={opt.attrName !== "Color" && opt.attributes.value}
            ></Button>
          </div>
        </div>
      </div>
    );
  }
}

SingleAttribute.propTypes = {
  opt: PropTypes.object,
};

export default SingleAttribute;