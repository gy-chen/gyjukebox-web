import React from "react";
import PropTypes from "prop-types";
import style from "./ArtistColumnItem.module.css";

const ArtistColumnItem = props => {
  const { artist } = props;

  const _onViewArtistButtonClick = () => {
    const { onViewArtistButtonClick } = props;

    onViewArtistButtonClick && onViewArtistButtonClick(artist);
  };

  return (
    <span className={style.item} onClick={_onViewArtistButtonClick}>
      {artist.name}
    </span>
  );
};

ArtistColumnItem.propTypes = {
  artist: PropTypes.object.isRequired,
  onViewArtistButtonClick: PropTypes.func
};

export default ArtistColumnItem;
