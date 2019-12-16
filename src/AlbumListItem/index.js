import React from "react";
import PropTypes from "prop-types";
import AlbumColumnItem from "../AlbumColumItem";
import ArtistsColumnItem from "../ArtistsColumnItem";
import { ReactComponent as PlusIcon } from "bootstrap-icons/icons/plus.svg";
import { ReactComponent as CheckIcon } from "bootstrap-icons/icons/check.svg";
import style from "./AlbumListItem.module.css";

const AlbumListItem = props => {
  const { album, onViewAlbumButtonClick, onViewArtistButtonClick } = props;

  const _onQueueAlbumButtonClick = () => {
    const { onQueueAlbumButtonClick } = props;

    onQueueAlbumButtonClick && onQueueAlbumButtonClick(album);
  };

  const _renderQueueButton = () => {
    const { inQueue } = props;
    if (inQueue) {
      return <CheckIcon className={style.queuedButton} />;
    }
    return (
      <PlusIcon
        onClick={_onQueueAlbumButtonClick}
        className={style.queueButton}
      />
    );
  };

  return (
    <div className={style.container}>
      <div>
        <AlbumColumnItem
          album={album}
          onViewAlbumButtonClick={onViewAlbumButtonClick}
        />
      </div>
      <div>
        <ArtistsColumnItem
          artists={album.artists}
          onViewArtistButtonClick={onViewArtistButtonClick}
        />
      </div>
      <div>{_renderQueueButton()}</div>
    </div>
  );
};

AlbumListItem.propTypes = {
  album: PropTypes.object.isRequired,
  onViewAlbumButtonClick: PropTypes.func,
  onViewArtistButtonClick: PropTypes.func,
  onQueueAlbumButtonClick: PropTypes.func,
  inQueue: PropTypes.bool
};

export default AlbumListItem;
