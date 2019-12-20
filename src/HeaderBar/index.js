import React from "react";
import PropTypes from "prop-types";
import SearchBar from "../SearchBar";
import Tabs from "../Tabs";
import LogoutButton from "../LogoutButton";
import style from "./HeaderBar.module.css";

const HeaderBar = props => {
  const {
    activeTab,
    onSearchButtonClick,
    onTabChangeButtonClick,
    onLogoutButtonClick
  } = props;

  return (
    <div className={style.container}>
      <SearchBar onSearchButtonClick={onSearchButtonClick} />
      <Tabs
        activeTab={activeTab}
        onTabChangeButtonClick={onTabChangeButtonClick}
      />
      <LogoutButton onLogoutButtonClick={onLogoutButtonClick} />
    </div>
  );
};

HeaderBar.propTypes = {
  activeTab: PropTypes.number,
  onSearchButtonClick: PropTypes.func,
  onTabChangeButtonClick: PropTypes.func,
  onLogoutButtonClick: PropTypes.func
};

export default HeaderBar;
