import React from "react";
import PropTypes from "prop-types";
import style from "./PlayButton.module.css";

const PlayButton = props => {
  const { onPlayButtonClick } = props;

  return (
    <div className={style.container} onClick={onPlayButtonClick}>
      Play
    </div>
  );
};

PlayButton.propTypes = {
  onPlayButtonClick: PropTypes.func
};

export default PlayButton;
