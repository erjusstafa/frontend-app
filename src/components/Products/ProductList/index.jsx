import { Component } from "react";
import "./style.css";
import PropTypes from "prop-types";
import Img from "../../../UI/Img";
 import Basket from "./Basket";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredProduct: "",
    };
  }

  handleMouseOver = (productId) => {
    this.setState({
      hoveredProduct: productId,
    });
  };

  handleMouseOut = () => {
    this.setState({
      hoveredProduct: null,
    });
  };

  render() {
    const { hoveredProduct } = this.state;
    const { selectedCategory, productsData } = this.props;

    return (
      <div className="container-products">
        <h2 className="selected-category">{selectedCategory.toUpperCase()}</h2>
        <div className="wrapper-product">
          {productsData.map((product) => (
            <li
              key={product.id}
              className="card-item"
              onMouseOver={() => this.handleMouseOver(product.id)}
              onMouseOut={this.handleMouseOut}
            >
              <div
                className={`wrapper-img-card ${
                  !product.inStock && " disable-item"
                } `}
              >
                <Img
                  className={`card-img ${
                    product.inStock ? " in-stock" : " out-stock"
                  } `}
                  src={product.gallery[0]}
                  alt={product.id}
                  height={"250"}
                  width={"200px"}
                />

                {!product.inStock && <p>Out of stock</p>}
                {product.inStock && hoveredProduct === product.id && (
                  <Basket addToCart={() => this.props.addToCart(product)} />
                )}
              </div>
              <div className="description-item">
                <p className="product-name">{product.name}</p>
                {product.prices.map((item, id) => (
                  <span key={id} className="price-item">
                    <p>{item.currency.symbol}</p>
                    <p>{item.amount.toFixed(2)}</p>
                  </span>
                ))}
              </div>
            </li>
          ))}
        </div>
      </div>
    );
  }
}
ProductList.propTypes = {
  addToCart: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  productsData: PropTypes.array.isRequired,
};

export default ProductList;
