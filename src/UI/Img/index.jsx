import { Component } from "react";
import PropTypes from "prop-types";

class Img extends Component {
  render() {
    const { src, alt, height, width } = this.props;
    
    return <img src={src} alt={alt} height={height} width={width} />;
  }
}
Img.propTypes = {
  src: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
export default Img;
