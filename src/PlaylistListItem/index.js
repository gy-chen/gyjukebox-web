import React from "react";
import PropTypes from "prop-types";
import PlaylistColumnItem from "../PlaylistColumnItem";
import style from "./PlaylistListItem.module.css";

const PlaylistListItem = props => {
  const { playlist, onViewPlaylistButtonClick } = props;

  return (
    <div className={style.container}>
      <div>
        <PlaylistColumnItem
          playlist={playlist}
          onViewPlaylistButtonClick={onViewPlaylistButtonClick}
        />
      </div>
      <div>{playlist.owner.display_name}</div>
    </div>
  );
};

PlaylistListItem.propTypes = {
  playlist: PropTypes.object.isRequired,
  onViewPlaylistButtonClick: PropTypes.func
};

export default PlaylistListItem;
