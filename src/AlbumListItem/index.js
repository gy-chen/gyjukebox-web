import React from "react";
import PropTypes from "prop-types";
import AlbumColumnItem from "../AlbumColumItem";
import ArtistsColumnItem from "../ArtistsColumnItem";
import style from "./AlbumListItem.module.css";

const AlbumListItem = props => {
  const { album, onViewAlbumButtonClick, onViewArtistButtonClick } = props;

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
    </div>
  );
};

AlbumListItem.propTypes = {
  album: PropTypes.object.isRequired,
  onViewAlbumButtonClick: PropTypes.func,
  onViewArtistButtonClick: PropTypes.func
};

export default AlbumListItem;
