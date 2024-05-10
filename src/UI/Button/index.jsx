import { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";

class Button extends Component {
  render() {
    const { className, icon, height, width, backgroundColor, OnClick } =
      this.props;
    return (
      <div
        className={className}
        style={{
          height: height,
          width: width,
          backgroundColor: backgroundColor,
        }}
        onClick={OnClick}
      >
        {icon}
      </div>
    );
  }
}
Button.propTypes = {
  icon: PropTypes.any,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  backgroundColor: PropTypes.any,
  OnClick: PropTypes.func,
};
export default Button;
