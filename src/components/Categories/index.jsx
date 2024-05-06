import { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { GET_CATEGORIES } from "../../apollo/queries";
import PropTypes from "prop-types"; // Import PropTypes
import "./index.css";
import logo from "../../assets/logo.png";
import basket from "../../assets/basket.png";
import Img from "../../UI/Img";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: "all", // Initially set active link to 'all'
      toggle: false,
    };
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
            <header className={`Navbar ${toggle && "open"}`}>
              <div
                className={`nav-toggle ${toggle && "open"}`}
                onClick={this.handleToggle}
              >
                <div className="bar"></div>
              </div>
              <ul className={`nav-items ${toggle && "open"}`}>
                {/* Render category names */}
                {Array.isArray(categoriesData.categories) &&
                  categoriesData.categories.map((category) => (
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
                  ))}
              </ul>
              <div className="nav-logo">
                <Img src={logo} height={"41px"} width={"41px"} alt={"logo"} />
              </div>
              <div className={` ${toggle ? "nav-basket  open" : "nav-basket"}`}>
                <Img
                  src={basket}
                  height={"30px"}
                  width={"30px"}
                  alt={"basket"}
                />
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
