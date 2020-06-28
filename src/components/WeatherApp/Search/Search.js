import React from "react";
import PropTypes from "prop-types";
import "./search.css";
import icons from "../../../assets/icons.svg";

function useInputValue(defaultValue = "") {
  const [value, setValue] = React.useState(defaultValue);

  return {
    bind: {
      value,
      type: "search",
      className: "search-input",
      onChange: (event) => setValue(event.target.value),
      placeholder: "Search city...",
      autoComplete: "on",
    },
    clear: () => setValue(""),
    value: () => value,
  };
}

function Search({ onSearch, location }) {
  const searchField = useInputValue(location);

  function searchHandler(event) {
    event.preventDefault();

    if (searchField.value().trim()) {
      onSearch(searchField.value());
      searchField.clear();
    }
  }

  return (
    <form className="search" onSubmit={searchHandler}>
      <div className="search-field">
        <svg className="search-icon" width="18" height="18">
          <use xlinkHref={`${icons}#search`}></use>
        </svg>
        <input {...searchField.bind} />
      </div>
      <button className="search-button" type="submit">
        <svg width="15" height="10">
          <use xlinkHref={`${icons}#arrow`}></use>
        </svg>
      </button>
    </form>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  location: PropTypes.string
};

useInputValue.propTypes = {
  defaultValue: PropTypes.string,
};

export default Search;
