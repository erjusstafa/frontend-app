import { createContext, Component } from "react";
import PropTypes from "prop-types";

const AppContext = createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: [],
    };
  }


  render() {
    const { selectedAttributes } = this.state;

    return (
      <AppContext.Provider
        value={{
          selectedAttributes: selectedAttributes,
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
