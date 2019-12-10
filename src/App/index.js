import React from "react";
import Login from "../Login";
import SearchBar from "../SearchBar";
import SearchList from "../SearchList";
import FooterBar from "../FooterBar";
import AlbumListItem from "../AlbumListItem";
import ArtistLiteItem from "../ArtistListItem";
import PlaylistListItem from "../PlaylistListItem";
import TrackListItem from "../TrackListItem";
import PollingCurrentTrack from "../PollingCurrentTrack";
import Player from "../Player";
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

    this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
    this._onPlayerReady = this._onPlayerReady.bind(this);
    this._onPopState = this._onPopState.bind(this);
    this._pushState = this._pushState.bind(this);
    this._onCurrentTrackChange = this._onCurrentTrackChange.bind(this);
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
      currentTrack: null,
      currentSearchListData: this._EMPTY_SEARCH_LIST_DATA,
      displayPlayButton: false,
      play: false
    };

    window.onpopstate = this._onPopState;
  }

  _onPlayButtonClick() {
    this.setState({
      play: true,
      displayPlayButton: false
    });
  }

  _onPlayerReady() {
    this.setState({
      displayPlayButton: true
    });
  }

  _onPopState(event) {
    this.setState({
      currentSearchListData: event.state
    });
  }

  _pushState() {
    const { currentSearchListData } = this.state;
    window.history.pushState(currentSearchListData, null, "/");
  }

  _onCurrentTrackChange(currentTrack) {
    this.setState({
      currentTrack
    });
  }

  _onLoginCallback(token) {
    this.setState(
      {
        login: {
          isLogin: true,
          token
        }
      },
      () => {
        jukeboxApi.setAuthorizationToken(token);
        window.history.replaceState(this._EMPTY_SEARCH_LIST_DATA, null, "/");
      }
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
    this.setState(
      {
        currentSearchListData: {
          ...this._EMPTY_SEARCH_LIST_DATA,
          tracks
        }
      },
      this._pushState
    );
  }

  async _onViewArtistButtonClick(artist) {
    const { tracks, albums } = await jukeboxApi.getArtistDetails(artist);
    this.setState(
      {
        currentSearchListData: {
          ...this._EMPTY_SEARCH_LIST_DATA,
          tracks,
          albums
        }
      },
      this._pushState
    );
  }

  async _onViewPlaylistButtonClick(playlist) {
    const { tracks } = await jukeboxApi.getPlaylistTracks(playlist);
    this.setState(
      {
        currentSearchListData: {
          ...this._EMPTY_SEARCH_LIST_DATA,
          tracks
        }
      },
      this._pushState
    );
  }

  async _onSearchButtonClick(q) {
    const { albums, artists, tracks, playlists } = await jukeboxApi.search(q);
    this.setState(
      {
        currentSearchListData: {
          ...this._EMPTY_SEARCH_LIST_DATA,
          albums,
          artists,
          playlists,
          tracks
        }
      },
      this._pushState
    );
  }

  render() {
    const { login } = this.state;

    if (!login.isLogin) {
      return <Login onLoginCallback={this._onLoginCallback} />;
    }

    const {
      inQueueTracks,
      currentTrack,
      currentSearchListData,
      displayPlayButton,
      play
    } = this.state;

    return (
      <div className={style.container}>
        <div className={style.searchBarContainer}>
          <SearchBar onSearchButtonClick={this._onSearchButtonClick} />
        </div>
        <div className={style.searchListContainer}>
          <SearchList
            {...currentSearchListData}
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
        <div className={style.footerBarContainer}>
          <FooterBar
            currentTrack={currentTrack}
            displayPlayButton={displayPlayButton}
            onPlayButtonClick={this._onPlayButtonClick}
          />
        </div>
        <PollingCurrentTrack
          onCurrentTrackChange={this._onCurrentTrackChange}
        />
        <Player onPlayerReady={this._onPlayerReady} play={play} />
      </div>
    );
  }
}

export default App;
