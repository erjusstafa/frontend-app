import { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";
class Img extends Component {
  render() {
    const { className, src, alt, height, width } = this.props;

     return (
      <img
        className={className}
        src={src}
        alt={alt}
        height={height}
        width={width}
      />
    );
  }
}
Img.propTypes = {
  src: PropTypes.any,
  className: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  alt: PropTypes.string,
};
export default Img;
