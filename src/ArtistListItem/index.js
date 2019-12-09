import React from "react";
import PropTypes from "prop-types";
import ArtistColumnItem from "../ArtistColumnItem";
import style from "./ArtistListItem.module.css";

const ArtistListItem = props => {
  const { artist, onViewArtistButtonClick } = props;

  return (
    <div className={style.container}>
      <div>
        <ArtistColumnItem
          artist={artist}
          onViewArtistButtonClick={onViewArtistButtonClick}
        />
      </div>
    </div>
  );
};

ArtistListItem.propTypes = {
  artist: PropTypes.object.isRequired,
  onViewArtistButtonClick: PropTypes.func
};

export default ArtistListItem;
