import { createContext, Component } from "react";
import PropTypes from "prop-types";

const AppContext = createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basket: [],
      clickedBasket: [],
      selectedAttributes: [],
      isClicked: [],
    };
  }

  handleClickButton = (action, product, hoveredProduct) => {
    const { basket, clickedBasket } = this.state;
    const productIndex = basket.findIndex((item) => item.id === product.id);
    const clickedBasketIndex = clickedBasket.includes(product?.id);
    switch (action) {
      case "TOGGLE":
        if (productIndex !== -1 || clickedBasketIndex) {
          this.removeFromCart(product.id);
        } else {
          this.setState((prevState) => ({
            basket: [...prevState.basket, product],
            clickedBasket: [...prevState.clickedBasket, hoveredProduct],
          }));
        }
        break;
      case "ADD":
        this.setState({
          basket: [...basket, product],
        });
        break;
      case "DELETE":
        this.setState((prevState) => ({
          clickedBasket: prevState.clickedBasket.filter((id) => id !== product.id),
        }));
        break;
      default:
        break;
    }
  };

  removeFromCart = (productId) => {
    this.setState((prevState) => ({
      basket: prevState.basket.filter((item) => item.id !== productId),
      clickedBasket: prevState.clickedBasket.filter((id) => id !== productId),
    }));
  };

  updateBasketState = (updBasket) => {
    this.setState({ basket: updBasket });
    if (this.state.basket.length === 1) {
      this.setState({ clickedBasket: updBasket });
    }
  };

  addSingleAttribute = (attributes, productItem, id) => {
    const index = productItem.attributes.findIndex((item) => item.id === id);
    this.setState({
      selectedAttributes: {
        ...this.state.selectedAttributes,
        attributes: Object.values([attributes]),
        attributeName: productItem.attributes[index].id,
        name: productItem.name,
        gallery: productItem.gallery,
        prices: [{ amount: productItem.prices[0].amount }],
        currency: productItem.prices[0].currency.symbol,
      },
    });
  };

  emptySelectedAttributes = () => {
    this.setState({ selectedAttributes: [] });
  };

  emptyClicked = () => {
    this.setState({ isClicked: [] });
  };

  isClickedAtribute = (attributes) => {
    const { isClicked } = this.state;
    this.setState((prevState) => {
      const isActiveAtribute =
        Array.isArray(isClicked) && isClicked.includes(attributes?.id);
      return {
        isClicked: isActiveAtribute
          ? prevState.isClicked.filter((itemId) => {
              itemId !== attributes.id;
            })
          : [...prevState.isClicked, attributes.id],
      };
    });
  };

  render() {
    const { basket, clickedBasket, selectedAttributes, isClicked } = this.state;

    console.log("clickedBasket",clickedBasket);
    return (
      <AppContext.Provider
        value={{
          basket: basket,
          clickedBasket: clickedBasket,
          selectedAttributes: selectedAttributes,
          isClicked: isClicked,
          handleClickButton: this.handleClickButton,
          removeFromCart: this.removeFromCart,
          updateBasketState: this.updateBasketState,
          emptySelectedAttributes: this.emptySelectedAttributes,
          addSingleAttribute: this.addSingleAttribute,
          emptyClicked: this.emptyClicked,
          isClickedAtribute: this.isClickedAtribute,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppProvider, AppContext };
