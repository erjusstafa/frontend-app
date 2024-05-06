import { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { GET_CATEGORIES } from "../../apollo/queries";
import PropTypes from "prop-types"; // Import PropTypes

class Categories extends Component {
  render() {
    const { handleCategoryClick } = this.props;
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
            <ul>
              {/* Render category names */}
              {categoriesData.categories.map((category) => (
                <li
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

Categories.propTypes = {
  handleCategoryClick: PropTypes.func.isRequired, // Ensure handleCategoryClick is a function
};
export default Categories;
