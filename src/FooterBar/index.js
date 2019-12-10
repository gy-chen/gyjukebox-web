import React from "react";
import PropTypes from "prop-types";
import CurrentTrack from "../CurrentTrack";
import PlayButton from "../PlayButton";
import style from "./FooterBar.module.css";

const FooterBar = props => {
  const { displayPlayButton } = props;
  let { currentTrack } = props;

  currentTrack = currentTrack || {};

  const _onPlayButtonClick = () => {
    const { onPlayButtonClick } = props;

    onPlayButtonClick && onPlayButtonClick();
  };

  const _renderPlayButton = () => {
    if (!displayPlayButton || !currentTrack.track) {
      return null;
    }
    return <PlayButton onPlayButtonClick={_onPlayButtonClick} />;
  };

  return (
    <div className={style.container}>
      <CurrentTrack user={currentTrack.user} track={currentTrack.track} />
      {_renderPlayButton()}
    </div>
  );
};

FooterBar.propTypes = {
  currentTrack: PropTypes.object,
  displayPlayButton: PropTypes.bool,
  onPlayButtonClick: PropTypes.func
};

export default FooterBar;
