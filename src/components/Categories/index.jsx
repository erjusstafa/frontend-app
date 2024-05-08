import { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { GET_CATEGORIES } from "../../apollo/queries";
import PropTypes from "prop-types"; // Import PropTypes
import "./style.css";
import logo from "../../assets/logo.png";
import Img from "../../UI/Img";
import { SlBasket } from "react-icons/sl";
import Loader from "../Loader";
import QuickShop from "../QuickShop";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: "all", // Initially set active link to 'all'
      toggle: false,
      openQuickShop: false,
    };
  }

  handleToggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  handleActiveLinkClick = (link) => {
    this.setState({ activeLink: link });
  };

  handleOpenQuickShop = () => {
    this.setState({ openQuickShop: !this.state.openQuickShop });
  };

  handleCloseQuickShop = () => {
    this.setState({ openQuickShop: false });
  };
  render() {
    const { basket, handleCategoryClick } = this.props;
    const { activeLink, toggle, openQuickShop } = this.state;
    return (
      <Query query={GET_CATEGORIES}>
        {({
          loading: categoriesLoading,
          error: categoriesError,
          data: categoriesData,
        }) => {
          if (categoriesLoading) return <Loader />;
          if (categoriesError)
            return <p>Error fetching categories: {categoriesError.message}</p>;

          return (
            <header className={`Navbar ${toggle && "open"}`}>
              {" "}
              <div
                className={`nav-toggle ${toggle && "open"}`}
                onClick={this.handleToggle}
              >
                <div className="bar"></div>
              </div>
              <ul className={`nav-items ${toggle && "open"}`}>
                {/* Render category names */}
                {Array.isArray(categoriesData.categories) &&
                  categoriesData.categories.map((category) => {
                    return (
                      <li
                        className={activeLink === category.name ? "active" : ""}
                        key={category.name}
                        onClick={() => {
                          handleCategoryClick(category.name);
                          this.handleActiveLinkClick(category.name);
                          this.setState({ toggle: false });
                        }}
                      >
                        {category.name.toUpperCase()}
                      </li>
                    );
                  })}
              </ul>
              <div className="nav-logo">
                <Img
                  className={"logo"}
                  src={logo}
                  height={"41px"}
                  width={"41px"}
                  alt={"logo"}
                />
              </div>
              <div
                className={` ${toggle ? "nav-basket  open" : "nav-basket"}`}
                onClick={this.handleOpenQuickShop}
              >
                <SlBasket className="basket-icon" />
              {basket.length > 0  && <span>{basket && basket.length}</span>}
              </div>
              {
                /* basket.length>0  &&  */ openQuickShop && (
                  <QuickShop openQuickShop={openQuickShop} basket={basket} />
                )
              }
            </header>
          );
        }}
      </Query>
    );
  }
}

Categories.propTypes = {
  openQuickShop: PropTypes.bool,
  basket: PropTypes.array.isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
};
export default Categories;
