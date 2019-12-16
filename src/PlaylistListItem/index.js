import React from "react";
import PropTypes from "prop-types";
import PlaylistColumnItem from "../PlaylistColumnItem";
import { ReactComponent as PlusIcon } from "bootstrap-icons/icons/plus.svg";
import { ReactComponent as CheckIcon } from "bootstrap-icons/icons/check.svg";
import style from "./PlaylistListItem.module.css";

const PlaylistListItem = props => {
  const { playlist, onViewPlaylistButtonClick } = props;

  const _onQueuePlaylistButtonClick = () => {
    const { onQueuePlaylistButtonClick } = props;

    onQueuePlaylistButtonClick && onQueuePlaylistButtonClick(playlist);
  };

  const _renderQueueButton = () => {
    const { inQueue } = props;
    if (inQueue) {
      return <CheckIcon className={style.queuedButton} />;
    }
    return (
      <PlusIcon
        onClick={_onQueuePlaylistButtonClick}
        className={style.queueButton}
      />
    );
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
      <div>{_renderQueueButton()}</div>
    </div>
  );
};

PlaylistListItem.propTypes = {
  playlist: PropTypes.object.isRequired,
  onViewPlaylistButtonClick: PropTypes.func,
  onQueuePlaylistButtonClick: PropTypes.func,
  inQueue: PropTypes.bool
};

export default PlaylistListItem;
