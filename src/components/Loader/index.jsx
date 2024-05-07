import { Component } from "react";
import "./style.css";
class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: true,
    };
  }

  componentDidMount() {
    this.hideLoaderTimer = setTimeout(() => {
      this.setState({ showLoader: false });
    }, 4000);
  }

  componentWillUnmount() {
    clearTimeout(this.hideLoaderTimer);
  }
  render() {
     return this.state.showLoader && <div className="loader"></div>;
  }
}

export default Loader;
