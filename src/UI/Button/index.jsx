import { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";

class Button extends Component {
  render() {
    const { className, icon, height, width } = this.props;
    return (
      <div className={className} style={{ height: height, width: width }}>
        {icon}
      </div>
    );
  }
}
Button.propTypes = {
  icon: PropTypes.string.isRequired,

  className: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};
export default Button;
