import React from "react";
import Login from "../Login";
import SearchBar from "../SearchBar";
import SearchList from "../SearchList";
import AlbumListItem from "../AlbumListItem";
import ArtistLiteItem from "../ArtistListItem";
import PlaylistListItem from "../PlaylistListItem";
import TrackListItem from "../TrackListItem";
import * as jukeboxApi from "../api";
import style from "./App.module.css";

class App extends React.Component {
  _EMPTY_SEARCH_LIST_DATA = {
    albums: null,
    artists: null,
    playlists: null,
    tracks: null
  };

  constructor(props) {
    super(props);

    this._getCurrentSearchListData = this._getCurrentSearchListData.bind(this);
    this._onLoginCallback = this._onLoginCallback.bind(this);
    this._onQueueTrackButtonClick = this._onQueueTrackButtonClick.bind(this);
    this._onViewAlbumButtonClick = this._onViewAlbumButtonClick.bind(this);
    this._onViewArtistButtonClick = this._onViewArtistButtonClick.bind(this);
    this._onViewPlaylistButtonClick = this._onViewPlaylistButtonClick.bind(
      this
    );
    this._onSearchButtonClick = this._onSearchButtonClick.bind(this);

    this.state = {
      login: {
        isLogin: false,
        token: null
      },
      inQueueTracks: [],
      history: []
    };
  }

  _getCurrentSearchListData() {
    const { history } = this.state;

    if (history.length === 0) {
      return this._EMPTY_SEARCH_LIST_DATA;
    }

    return history[history.length - 1];
  }

  _onLoginCallback(token) {
    this.setState(
      {
        login: {
          isLogin: true,
          token
        }
      },
      () => jukeboxApi.setAuthorizationToken(token)
    );
  }

  async _onQueueTrackButtonClick(track) {
    await jukeboxApi.enqueue(track);
    this.setState(state => ({
      inQueueTracks: [...state.inQueueTracks, track]
    }));
  }

  async _onViewAlbumButtonClick(album) {
    const { tracks } = await jukeboxApi.getAlbumTracks(album);
    this.setState(state => ({
      history: [
        ...state.history,
        {
          ...this._EMPTY_SEARCH_LIST_DATA,
          tracks
        }
      ]
    }));
  }

  async _onViewArtistButtonClick(artist) {
    const { tracks, albums } = await jukeboxApi.getArtistDetails(artist);
    this.setState(state => ({
      history: [
        ...state.history,
        {
          ...this._EMPTY_SEARCH_LIST_DATA,
          tracks,
          albums
        }
      ]
    }));
  }

  async _onViewPlaylistButtonClick(playlist) {
    const { tracks } = await jukeboxApi.getPlaylistTracks(playlist);
    this.setState(state => ({
      history: [
        ...state.history,
        {
          ...this._EMPTY_SEARCH_LIST_DATA,
          tracks
        }
      ]
    }));
  }

  async _onSearchButtonClick(q) {
    const { albums, artists, tracks, playlists } = await jukeboxApi.search(q);
    this.setState(state => ({
      history: [
        ...state.history,
        {
          ...this._EMPTY_SEARCH_LIST_DATA,
          albums,
          artists,
          playlists,
          tracks
        }
      ]
    }));
  }

  render() {
    const { login } = this.state;

    if (!login.isLogin) {
      return <Login onLoginCallback={this._onLoginCallback} />;
    }

    const { inQueueTracks } = this.state;
    const searchListData = this._getCurrentSearchListData();

    return (
      <div className={style.container}>
        <SearchBar onSearchButtonClick={this._onSearchButtonClick} />
        <SearchList
          {...searchListData}
          inQueueTracks={inQueueTracks}
          albumComponent={AlbumListItem}
          artistComponent={ArtistLiteItem}
          playlistComponent={PlaylistListItem}
          trackComponent={TrackListItem}
          onQueueTrackButtonClick={this._onQueueTrackButtonClick}
          onViewAlbumButtonClick={this._onViewAlbumButtonClick}
          onViewArtistButtonClick={this._onViewArtistButtonClick}
          onViewPlaylistButtonClick={this._onViewPlaylistButtonClick}
        />
      </div>
    );
  }
}

export default App;
