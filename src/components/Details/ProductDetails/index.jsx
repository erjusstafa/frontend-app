import { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";
import Carousel from "./Carousel";
/* import Img from "../../../UI/Img";
 */ 
class ProductDetails extends Component {
  render() {
    const { data } = this.props;
     return (
      <div className="details-container">
        {Array.isArray(data) &&
          data.map((item) => (
            <div key={item.id} className="details-wrapper">
              <div className="details-wrapper-img">
                <div className="details-wrapper-list-img">
                <Carousel mainImg={item.gallery}   images={data[0].gallery} />

                </div>
                {/* <div className="details-wrapper-main-img">
                  <Img
                    className={"logo"}
                    src={item.gallery}
                    height={"420px"}
                    width={"500px"}
                    alt={item.name}
                  />
                </div> */}
              </div>
              <div>opt</div>
            </div>
          ))}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  data: PropTypes.array,
};
export default ProductDetails;
