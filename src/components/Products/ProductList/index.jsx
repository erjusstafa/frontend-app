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
    const { selectedCategory, clickedBasket, productsData, addToCart } =
      this.props;

    const addRemoveToCart = (product) => {
      addToCart(product, hoveredProduct); //add an item
    };

    return (
      <div className="container-products">
        <h2 className="selected-category">{selectedCategory.toUpperCase()}</h2>
        <div className="wrapper-product">
          {productsData.map((product) => {
            const productIsAdded = clickedBasket.includes(product.id);

            return (
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
                  {product.inStock &&
                    (hoveredProduct === product.id || productIsAdded) && (
                      <Basket
                        addRemoveToCart={() => addRemoveToCart(product)}
                      />
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
            );
          })}
        </div>
      </div>
    );
  }
}
ProductList.propTypes = {
  basket: PropTypes.array,
  clickedBasket: PropTypes.array,
  addToCart: PropTypes.func,
  removeFromCart: PropTypes.func,
  selectedCategory: PropTypes.string,
  productsData: PropTypes.array,
};

export default ProductList;
