import React from "react";
import PropTypes from "prop-types";
import style from "./PlaylistColumnItem.module.css";

const PlaylistColumnItem = props => {
  const { playlist } = props;

  const _onViewPlaylistButtonClick = () => {
    const { onViewPlaylistButtonClick } = props;

    onViewPlaylistButtonClick && onViewPlaylistButtonClick(playlist);
  };

  return (
    <span className={style.item} onClick={_onViewPlaylistButtonClick}>
      {playlist.name}
    </span>
  );
};

PlaylistColumnItem.propTypes = {
  playlist: PropTypes.object.isRequired,
  onViewPlaylistButtonClick: PropTypes.func
};

export default PlaylistColumnItem;
