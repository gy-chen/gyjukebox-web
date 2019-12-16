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
    this._isTrackInQueue = this._isTrackInQueue.bind(this);
  }

  _renderAlbums() {
    const {
      albums,
      albumComponent: AlbumComponent,
      onViewAlbumButtonClick,
      onViewArtistButtonClick,
      onQueueAlbumButtonClick
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
          <div className={style.rowHeader}>
            <GearIcon />
          </div>
        </li>
        {albums.map(album => (
          <li
            className={`${style.removeDefaultListItemStyle} ${style.rowContainer}`}
          >
            <AlbumComponent
              album={album}
              onViewAlbumButtonClick={onViewAlbumButtonClick}
              onViewArtistButtonClick={onViewArtistButtonClick}
              onQueueAlbumButtonClick={onQueueAlbumButtonClick}
            />
          </li>
        ))}
      </React.Fragment>
    );
  }

  _renderArtists() {
    const {
      artists,
      artistComponent: ArtistComponent,
      onViewArtistButtonClick
    } = this.props;
    if (!ArtistComponent || !artists || artists.length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <li
          key="artistsHeaderRow"
          className={`${style.headerRowContainer} ${style.artistRowContainer}`}
        >
          <div className={style.rowHeader}>Artist</div>
        </li>
        {artists.map(artist => (
          <li
            key={artist.uri}
            className={`${style.removeDefaultListItemStyle} ${style.rowContainer}`}
          >
            <ArtistComponent
              artist={artist}
              onViewArtistButtonClick={onViewArtistButtonClick}
            />
          </li>
        ))}
      </React.Fragment>
    );
  }

  _renderPlaylists() {
    const {
      playlists,
      playlistComponent: PlaylistComponent,
      onViewPlaylistButtonClick
    } = this.props;
    if (!PlaylistComponent || !playlists || playlists.length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <li
          key="playlistsHeaderRow"
          className={`${style.headerRowContainer} ${style.playlistRowContainer}`}
        >
          <div className={style.rowHeader}>Playlist</div>
          <div className={style.rowHeader}>Owner</div>
        </li>
        {playlists.map(playlist => (
          <li
            key={playlist.uri}
            className={`${style.removeDefaultListItemStyle} ${style.rowContainer}`}
          >
            <PlaylistComponent
              playlist={playlist}
              onViewPlaylistButtonClick={onViewPlaylistButtonClick}
            />
          </li>
        ))}
      </React.Fragment>
    );
  }

  _isTrackInQueue(track) {
    const { inQueueTracks } = this.props;
    return inQueueTracks.map(track => track.uri).includes(track.uri);
  }

  _renderTracks() {
    const {
      tracks,
      trackComponent: TrackComponent,
      onQueueTrackButtonClick,
      onViewAlbumButtonClick,
      onViewArtistButtonClick
    } = this.props;
    if (!TrackComponent || !tracks || tracks.length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <li
          key="tracksHeaderRow"
          className={`${style.trackRowContainer} ${style.headerRowContainer}`}
        >
          <div className={style.rowHeader}>Track</div>
          <div className={style.rowHeader}>Artist</div>
          <div className={style.rowHeader}>Album</div>
          <div className={style.rowHeader}>
            <GearIcon />
          </div>
        </li>
        {tracks.map(track => (
          <li
            key={track.uri}
            className={`${style.removeDefaultListItemStyle} ${style.rowContainer}`}
          >
            <TrackComponent
              track={track}
              inQueue={this._isTrackInQueue(track)}
              onQueueTrackButtonClick={onQueueTrackButtonClick}
              onViewAlbumButtonClick={onViewAlbumButtonClick}
              onViewArtistButtonClick={onViewArtistButtonClick}
            />
          </li>
        ))}
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <ul className={style.removeDefaultListStyle}>{this._renderAlbums()}</ul>
        <ul className={style.removeDefaultListStyle}>
          {this._renderArtists()}
        </ul>
        <ul className={style.removeDefaultListStyle}>
          {this._renderPlaylists()}
        </ul>
        <ul className={style.removeDefaultListStyle}>{this._renderTracks()}</ul>
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
  onViewAlbumButtonClick: PropTypes.func,
  onViewArtistButtonClick: PropTypes.func,
  onViewPlaylistButtonClick: PropTypes.func,
  onQueueAlbumButtonClick: PropTypes.func
};

SearchList.defaultProps = {
  inQueueTracks: []
};

export default SearchList;
