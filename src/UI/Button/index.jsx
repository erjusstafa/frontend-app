import { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";

class Button extends Component {
  render() {
    const { className, icon, height, width, OnClick } = this.props;
    return (
      <div className={className} style={{ height: height, width: width }} onClick={OnClick}>
        {icon}
      </div>
    );
  }
}
Button.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  OnClick:PropTypes.func
};
export default Button;
