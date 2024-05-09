import { createContext, Component } from "react";
import PropTypes from "prop-types";

const AppContext = createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedProduct: [],
    };
  }


  render() {
    const { addedProduct } = this.state;

    return (
      <AppContext.Provider
        value={{
          addedProduct: addedProduct,
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
