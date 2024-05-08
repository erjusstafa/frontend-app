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
  src: PropTypes.string.isRequired ,
  className: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
export default Img;