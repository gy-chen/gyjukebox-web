import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as DotIcon } from "bootstrap-icons/icons/dot.svg";
import { ReactComponent as PlayIcon } from "bootstrap-icons/icons/play-fill.svg";
import style from "./CurrentTrack.module.css";

const CurrentTrack = props => {
  const { track, user } = props;

  if (!track) {
    return null;
  }

  return (
    <div className={style.container}>
      <div className={style.titleContainer}>
        <span className={style.trackName}>{track.name}</span>
        <DotIcon />
        <span>{track.artists.map(artist => artist.name).join(", ")}</span>
      </div>
      <div className={style.userContainer}>
        <PlayIcon />
        <span>{user.name}</span>
      </div>
    </div>
  );
};

CurrentTrack.propTypes = {
  track: PropTypes.object,
  user: PropTypes.object
};

export default CurrentTrack;
