import React from "react";
import PropTypes from "prop-types";
import AlbumColumnItem from "../AlbumColumItem";
import ArtistsColumnItem from "../ArtistsColumnItem";
import { ReactComponent as PlusIcon } from "bootstrap-icons/icons/plus.svg";
import style from "./AlbumListItem.module.css";

const AlbumListItem = props => {
  const { album, onViewAlbumButtonClick, onViewArtistButtonClick } = props;

  const _onQueueAlbumButtonClick = () => {
    const { onQueueAlbumButtonClick } = props;

    onQueueAlbumButtonClick && onQueueAlbumButtonClick(album);
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
      <div>
        <PlusIcon
          className={style.plusIcon}
          onClick={_onQueueAlbumButtonClick}
        />
      </div>
    </div>
  );
};

AlbumListItem.propTypes = {
  album: PropTypes.object.isRequired,
  onViewAlbumButtonClick: PropTypes.func,
  onViewArtistButtonClick: PropTypes.func,
  onQueueAlbumButtonClick: PropTypes.func
};

export default AlbumListItem;
