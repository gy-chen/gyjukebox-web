import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as GearIcon } from "bootstrap-icons/icons/gear-fill.svg";
import style from "./SearchList.module.css";

class SearchList extends React.Component {
  constructor(props) {
    super(props);

    this._renderAlbums = this._renderAlbums.bind(this);
    this._renderArtists = this._renderArtists.bind(this);
    this._renderPlaylists = this._renderPlaylists.bind(this);
    this._renderTracks = this._renderTracks.bind(this);
  }

  _renderAlbums() {
    const {
      albums,
      albumComponent: AlbumComponent,
      onViewAlbumButtonClick
    } = this.props;
    if (!AlbumComponent || !albums || albums.length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <li
          className={`${style.albumRowContainer} ${style.headerRowContainer}`}
        >
          <div className={style.rowHeader}>Album</div>
          <div className={style.rowHeader}>Artist</div>
        </li>
        {albums.map(album => (
          <li
            className={`${style.removeDefaultListItemStyle} ${style.rowContainer}`}
          >
            <AlbumComponent
              album={album}
              onViewAlbumButtonClick={onViewAlbumButtonClick}
            />
          </li>
        ))}
      </React.Fragment>
    );
  }

  _renderArtists() {
    const { artists, artistComponent: ArtistComponent } = this.props;
    if (!ArtistComponent || !artists || artists.length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <li>Artists</li>
        {artists.map(artist => (
          <li>
            <ArtistComponent artist={artist} />
          </li>
        ))}
      </React.Fragment>
    );
  }

  _renderPlaylists() {
    const { playlists, playlistComponent: PlaylistComponent } = this.props;
    if (!PlaylistComponent || !playlists || playlists.length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <li>Playlist</li>
        {playlists.map(playlist => (
          <li>
            <PlaylistComponent playlist={playlist} />
          </li>
        ))}
      </React.Fragment>
    );
  }

  _renderTracks() {
    const {
      tracks,
      trackComponent: TrackComponent,
      inQueueTracks,
      onQueueTrackButtonClick,
      onViewAlbumButtonClick
    } = this.props;
    if (!TrackComponent || !tracks || tracks.length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <li
          className={`${style.trackRowContainer} ${style.headerRowContainer}`}
        >
          <div className={style.rowHeader}>Title</div>
          <div className={style.rowHeader}>Artist</div>
          <div className={style.rowHeader}>Album</div>
          <div className={style.rowHeader}>
            <GearIcon />
          </div>
        </li>
        {tracks.map(track => (
          <li
            className={`${style.removeDefaultListItemStyle} ${style.rowContainer}`}
          >
            <TrackComponent
              track={track}
              inQueue={inQueueTracks.includes(track.uri)}
              onQueueTrackButtonClick={onQueueTrackButtonClick}
              onViewAlbumButtonClick={onViewAlbumButtonClick}
            />
          </li>
        ))}
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <ul>{this._renderAlbums()}</ul>
        <ul>{this._renderArtists()}</ul>
        <ul>{this._renderPlaylists()}</ul>
        <ul>{this._renderTracks()}</ul>
      </React.Fragment>
    );
  }
}

SearchList.propTypes = {
  albums: PropTypes.array,
  artists: PropTypes.array,
  playlists: PropTypes.array,
  tracks: PropTypes.array,
  albumComponent: PropTypes.elementType,
  artistComponent: PropTypes.elementType,
  playlistComponent: PropTypes.elementType,
  trackComponent: PropTypes.elementType,
  inQueueTracks: PropTypes.array,
  onQueueTrackButtonClick: PropTypes.func,
  onViewAlbumButtonClick: PropTypes.func
};

SearchList.defaultProps = {
  inQueueTracks: []
};

export default SearchList;
