import { Component } from "react";
import { SlBasket } from "react-icons/sl";
import "./style.css";

class QuickShop extends Component {
  render() {
    return (
      <div className="quickshop-wrapper" onClick={() => alert("jfhgfgfgf")}>
        <SlBasket className="quickshop-basket" />
      </div>
    );
  }
}

export default QuickShop;
