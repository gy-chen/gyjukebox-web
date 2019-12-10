import React from "react";
import PropTypes from "prop-types";
import CurrentTrack from "../CurrentTrack";
import style from "./FooterBar.module.css";

const FooterBar = props => {
  let { currentTrack } = props;

  currentTrack = currentTrack || {};

  return (
    <div className={style.container}>
      <CurrentTrack user={currentTrack.user} track={currentTrack.track} />
    </div>
  );
};

FooterBar.propTypes = {
  currentTrack: PropTypes.object
};

export default FooterBar;
