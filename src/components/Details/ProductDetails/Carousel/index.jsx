import { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from "../../../../UI/Button";

 class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }

  nextImage = () => {
    const { currentIndex } = this.state;
    const { images } = this.props;
    this.setState({
      currentIndex: currentIndex === images.length - 1 ? 0 : currentIndex + 1,
    });
  };

  prevImage = () => {
    const { currentIndex } = this.state;
    const { images } = this.props;
    this.setState({
      currentIndex: currentIndex === 0 ? images.length - 1 : currentIndex - 1,
    });
  };

  selectImage = (index) => {
    this.setState({ currentIndex: index });
  };

  render() {
    const { images } = this.props;
    const { currentIndex } = this.state;

    return (
      <div className="carousel-container">
        <div className="vertical-images">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className={
                index === currentIndex
                  ? "vertical-image active"
                  : "vertical-image"
              }
              onClick={() => this.selectImage(index)}
            />
          ))}
        </div>
        <div className="carousel">
          <div className="carousel-controls">
            <Button
              className="carousel-button "
              icon={"<"}
              height="31.7px"
              width="31.7px"
              OnClick={this.prevImage}
            />
            <Button
              className="carousel-button"
              icon={">"}
              height="31.7px"
              width="31.7px"
              OnClick={this.nextImage}
            />
          </div>
          <div className="carousel-images">
            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className="main-image"
            />
          </div>
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.array,
};

export default Carousel;
