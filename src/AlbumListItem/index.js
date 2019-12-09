import React from "react";
import PropTypes from "prop-types";
import AlbumColumnItem from "../AlbumColumItem";
import style from "./AlbumListItem.module.css";

const AlbumListItem = props => {
  const { album, onViewAlbumButtonClick } = props;

  return (
    <div className={style.container}>
      <div>
        <AlbumColumnItem
          album={album}
          onViewAlbumButtonClick={onViewAlbumButtonClick}
        />
      </div>
      <div>{album.artists.map(artist => artist.name).join(", ")}</div>
    </div>
  );
};

AlbumListItem.propTypes = {
  album: PropTypes.object.isRequired,
  onViewAlbumButtonClick: PropTypes.func
};

export default AlbumListItem;
