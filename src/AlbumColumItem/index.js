import React from "react";
import PropTypes from "prop-types";
import style from "./AlbumColumnItem.module.css";

const AlbumColumnItem = props => {
  const { album } = props;

  const _onViewAlbumButtonClick = () => {
    const { onViewAlbumButtonClick } = props;

    onViewAlbumButtonClick && onViewAlbumButtonClick(album);
  };

  return (
    <div>
      <span className={style.item} onClick={_onViewAlbumButtonClick}>
        {album.name}
      </span>
    </div>
  );
};

AlbumColumnItem.propTypes = {
  album: PropTypes.object.isRequired,
  onViewAlbumButtonClick: PropTypes.func
};

export default AlbumColumnItem;
