import React from "react";
import PropTypes from "prop-types";
import "./search.css";
import icons from "../../assets/icons.svg";

function useInputValue(defaultValue = "") {
  const [value, setValue] = React.useState(defaultValue);

  return {
    clear: () => setValue(""),
    value: () => value,
    set: (value) => setValue(value),
  };
}

const Search = ({ onSearch, location }) => {
  const searchField = useInputValue(location);

  const searchHandler = (event) => {
    event.preventDefault();

    if (searchField.value().trim()) {
      onSearch(searchField.value());
      searchField.clear();
    }
  };

  return (
    <form className="search" onSubmit={searchHandler}>
      <div className="search-field">
        <svg className="search-icon" width="18" height="18">
          <use xlinkHref={`${icons}#search`}></use>
        </svg>
        <input
          value={searchField.value()}
          type="search"
          className="search-input"
          onChange={(event) => searchField.set(event.target.value)}
          placeholder="Search city..."
        />
      </div>
      <button className="search-button" type="submit">
        <svg width="15" height="10">
          <use xlinkHref={`${icons}#arrow`}></use>
        </svg>
      </button>
    </form>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  location: PropTypes.string,
};

useInputValue.propTypes = {
  defaultValue: PropTypes.string,
};

export default Search;
