import React from "react";
import PropTypes from "prop-types";
import PlaylistColumnItem from "../PlaylistColumnItem";
import { ReactComponent as PlusIcon } from "bootstrap-icons/icons/plus.svg";
import style from "./PlaylistListItem.module.css";

const PlaylistListItem = props => {
  const { playlist, onViewPlaylistButtonClick } = props;

  const _onQueuePlaylistButtonClick = () => {
    const { onQueuePlaylistButtonClick } = props;

    onQueuePlaylistButtonClick && onQueuePlaylistButtonClick(playlist);
  };

  return (
    <div className={style.container}>
      <div>
        <PlaylistColumnItem
          playlist={playlist}
          onViewPlaylistButtonClick={onViewPlaylistButtonClick}
        />
      </div>
      <div>{playlist.owner.display_name}</div>
      <div>
        <PlusIcon
          className={style.plusIcon}
          onClick={_onQueuePlaylistButtonClick}
        />
      </div>
    </div>
  );
};

PlaylistListItem.propTypes = {
  playlist: PropTypes.object.isRequired,
  onViewPlaylistButtonClick: PropTypes.func,
  onQueuePlaylistButtonClick: PropTypes.func
};

export default PlaylistListItem;
