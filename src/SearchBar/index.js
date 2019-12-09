import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as SearchIcon } from "bootstrap-icons/icons/search.svg";
import style from "./SearchBar.module.css";

const SearchBar = props => {
  const { onSearchButtonClick } = props;

  const [q, setQ] = React.useState("");

  const _onSearchButtonClick = e => {
    e.preventDefault();

    onSearchButtonClick && onSearchButtonClick(q);
  };

  return (
    <form className={style.container} onSubmit={_onSearchButtonClick}>
      <input
        type="text"
        className={style.searchInput}
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <button className={style.searchButton} onClick={_onSearchButtonClick}>
        <SearchIcon />
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  onSearchButtonClick: PropTypes.func
};

export default SearchBar;
