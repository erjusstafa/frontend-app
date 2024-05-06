import { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { GET_CATEGORIES } from "../../apollo/queries";
import PropTypes from "prop-types"; // Import PropTypes
import "./index.css";
import logo from "../../assets/logo.png";
import basket from "../../assets/basket.png";
import Img from "../../UI/Img";
import { FaBarsStaggered } from "react-icons/fa6";


class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: "all", // Initially set active link to 'all'
      toggle: false,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", () => {
      const header = document.querySelector(".header__contaier");
      if (window.scrollY >= 768) header.classList.add("scroll-header");
      else header.classList.remove("scroll-header");
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", () => {});
  }
  handleToggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  handleActiveLinkClick = (link) => {
    this.setState({ activeLink: link });
  };
  render() {
    const { handleCategoryClick } = this.props;
    const { activeLink, toggle } = this.state;

    return (
      <Query query={GET_CATEGORIES}>
        {({
          loading: categoriesLoading,
          error: categoriesError,
          data: categoriesData,
        }) => {
          if (categoriesLoading) return <p>Loading categories...</p>;
          if (categoriesError)
            return <p>Error fetching categories: {categoriesError.message}</p>;

          return (
            <header className="header__contaier">
              <ul className={toggle ? "nav__menu    show-menu" : "nav__menu  "}>
                {/* Render category names */}
                {Array.isArray(categoriesData.categories) &&
                  categoriesData.categories.map((category) => (
                    <li
                      className={activeLink === category.name ? "active" : ""}
                      key={category.name}
                      onClick={() => {
                        handleCategoryClick(category.name);
                        this.handleActiveLinkClick(category.name);
                      }}
                    >
                      {category.name.toUpperCase()}
                    </li>
                  ))}
              </ul>
              <div className="logo">
                <Img src={logo} height={"41px"} width={"41px"} alt={"logo"} />
              </div>
              <div className={toggle ? "basket  show-menu" : "basket"}>
                <Img
                  src={basket}
                  height={"18px"}
                  width={"20px"}
                  alt={"basket"}
                />
              </div>
              <span onClick={this.handleToggle} className="nav__close"></span>
              <div className="nav__toggle" onClick={this.handleToggle}>
              <FaBarsStaggered />
              </div>
            </header>
          );
        }}
      </Query>
    );
  }
}

Categories.propTypes = {
  handleCategoryClick: PropTypes.func.isRequired,
};
export default Categories;
