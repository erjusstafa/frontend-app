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
      isClicked: {},
    };
  }

  handleClickButton = (action, product, hoveredProduct) => {
    const { basket, clickedBasket } = this.state;
    const productIndex = basket.findIndex((item) => item.id === product.id);
    const isProductInClickedBasket = clickedBasket.includes(product?.id);
    switch (action) {
      case "TOGGLE":
        if (productIndex !== -1 || isProductInClickedBasket) {
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
          clickedBasket: prevState.clickedBasket.filter(
            (id) => id !== product.id
          ),
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

  addSingleAttribute = (attributes, attrName) => {
    this.setState((prevState) => {
      // Check if the attribute already exists
      const existingAttributeIndex = prevState.selectedAttributes.findIndex(
        (attr) => attr.attrName === attrName
      );

      // If the attribute exists, remove it; otherwise, add a new one
      if (existingAttributeIndex !== -1) {
        const updatedAttributes = prevState.selectedAttributes.filter(
          (_, index) => index !== existingAttributeIndex
        );
        return { selectedAttributes: updatedAttributes };
      } else {
        return {
          selectedAttributes: [
            ...prevState.selectedAttributes,
            { attributes, attrName },
          ],
        };
      }
    });
  };

  emptySelectedAttributes = () => {
    this.setState({ selectedAttributes: [] });
  };

  emptyClicked = () => {
    this.setState({ isClicked: {} });
  };

  isClickedAtribute = (id, atributeId) => {
    // Check if the clicked item is already active
    this.setState((prevState) => {
      const isActive = prevState.isClicked[id] === atributeId;
      return {
        isClicked: {
          ...prevState.isClicked,
          [id]: isActive ? null : atributeId,
        },
      };
    });
  };

  render() {
    const { basket, clickedBasket, selectedAttributes, isClicked } = this.state;

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
