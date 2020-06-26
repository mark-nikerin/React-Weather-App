import React, { Component } from "react";
import "../Search/search.css";
import icons from "../../assets/search-icons.svg"

class Search extends Component {
  render() {
    return (
      <div className="search">
        <div className="search-field">
          <svg className='search-icon' width="18" height="18">
            <use xlinkHref={`${icons}#search`}></use>
          </svg>
          <input className="search-input" defaultValue="Samara"></input>
        </div>
        <button className="search-button" type="submit">
          <svg width="15" height="10">
            <use xlinkHref={`${icons}#arrow`}></use>
          </svg>
        </button>
      </div>
    );
  }
}

export default Search;
