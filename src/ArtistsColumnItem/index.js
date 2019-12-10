import React from "react";
import PropTypes from "prop-types";
import ArtistColumnItem from "../ArtistColumnItem";
import style from "./ArtistsColumnItem.module.css";

const ArtistsColumnItem = props => {
  const { artists } = props;

  const _renderArtists = () => {
    const { onViewArtistButtonClick } = props;

    const result = artists.reduce((arr, artist, index) => {
      arr.push(
        <ArtistColumnItem
          artist={artist}
          onViewArtistButtonClick={onViewArtistButtonClick}
        />
      );
      if (index !== artists.length - 1) {
        arr.push(<span className={style.seperator}>, </span>);
      }
      return arr;
    }, []);
    return result;
  };

  return _renderArtists();
};

ArtistsColumnItem.propTypes = {
  artists: PropTypes.array.isRequired,
  onViewArtistButtonClick: PropTypes.func
};

export default ArtistsColumnItem;
