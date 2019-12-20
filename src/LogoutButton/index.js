import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as ExitIcon } from "bootstrap-icons/icons/power.svg";
import style from "./LogoutButton.module.css";

const LogoutButton = props => {
  const _onLogoutButtonClick = () => {
    const { onLogoutButtonClick } = props;

    onLogoutButtonClick && onLogoutButtonClick();
  };

  return (
    <div className={style.container} onClick={_onLogoutButtonClick}>
      <ExitIcon className={style.exitIcon} />
    </div>
  );
};

LogoutButton.propTypes = {
  onLogoutButtonClick: PropTypes.func
};

export default LogoutButton;
