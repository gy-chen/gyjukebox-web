import React from "react";
import Login from "../Login";
import HeaderBar from "../HeaderBar";
import SearchList from "../SearchList";
import FooterBar from "../FooterBar";
import AlbumListItem from "../AlbumListItem";
import ArtistLiteItem from "../ArtistListItem";
import PlaylistListItem from "../PlaylistListItem";
import TrackListItem from "../TrackListItem";
import PollingCurrentTrack from "../PollingCurrentTrack";
import Player from "../Player";
import * as jukeboxApi from "../api";
import { Tab } from "../Tabs";
import { logout } from "../Login/utils";
import style from "./App.module.css";

const _PlayerState = {
  WAIT: 1,
  READY: 2,
  PLAY: 3
};

class App extends React.Component {
  _EMPTY_SEARCH_LIST_DATA = {
    albums: null,
    artists: null,
    playlists: null,
    tracks: null
  };

  _INITIAL_STATE = {
    login: {
      isLogin: false,
      token: null
    },
    inQueueTracks: [],
    inQueueAlbums: [],
    inQueuePlaylists: [],
    currentTrack: null,
    currentSearchListData: this._EMPTY_SEARCH_LIST_DATA,
    playerState: _PlayerState.WAIT,
    tab: Tab.HOME
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
    this._onQueueAlbumButtonClick = this._onQueueAlbumButtonClick.bind(this);
    this._onQueuePlaylistButtonClick = this._onQueuePlaylistButtonClick.bind(
      this
    );
    this._onViewAlbumButtonClick = this._onViewAlbumButtonClick.bind(this);
    this._onViewArtistButtonClick = this._onViewArtistButtonClick.bind(this);
    this._onViewPlaylistButtonClick = this._onViewPlaylistButtonClick.bind(
      this
    );
    this._onSearchButtonClick = this._onSearchButtonClick.bind(this);
    this._refreshTabContent = this._refreshTabContent.bind(this);
    this._refreshUserTop = this._refreshUserTop.bind(this);
    this._refreshUserPlaylists = this._refreshUserPlaylists.bind(this);
    this._refreshUserAlbums = this._refreshUserAlbums.bind(this);
    this._refreshUserArtists = this._refreshUserArtists.bind(this);
    this._refreshUserTracks = this._refreshUserTracks.bind(this);
    this._onTabChangeButtonClick = this._onTabChangeButtonClick.bind(this);
    this._onLogoutButtonClick = this._onLogoutButtonClick.bind(this);
    this._logout = this._logout.bind(this);
    this._commonApiErrorHandle = this._commonApiErrorHandle.bind(this);

    this.state = this._INITIAL_STATE;

    window.onpopstate = this._onPopState;
  }

  componentDidUpdate(prevProps, prevState) {
    const { tab: prevTab } = prevState;
    const { tab } = this.state;
    if (prevTab !== tab) {
      this._refreshTabContent();
    }
  }

  _onPlayButtonClick() {
    const { playerState } = this.state;
    if (playerState !== _PlayerState.READY) {
      return;
    }
    this.setState({
      playerState: _PlayerState.PLAY
    });
  }

  _onPlayerReady() {
    const { playerState } = this.state;
    if (playerState !== _PlayerState.WAIT) {
      return;
    }
    this.setState({
      playerState: _PlayerState.READY
    });
  }

  _onPopState(event) {
    if (event.state === "logged_out") {
      // don't let user read history if has already logged out
      window.history.pushState("logged_out", null, "/");
    } else {
      this.setState(event.state);
    }
  }

  _pushState() {
    const { currentSearchListData, tab } = this.state;
    window.history.pushState({ currentSearchListData, tab }, null, "/");
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
        this._refreshTabContent();
      }
    );
  }

  async _onQueueTrackButtonClick(track) {
    try {
      await jukeboxApi.enqueueTrack(track);
      this.setState(state => ({
        inQueueTracks: [...state.inQueueTracks, track]
      }));
    } catch (err) {
      this._commonApiErrorHandle(err);
    }
  }

  async _onQueueAlbumButtonClick(album) {
    try {
      await jukeboxApi.enqueueAlbum(album);
      this.setState(state => ({
        inQueueAlbums: [...state.inQueueAlbums, album]
      }));
    } catch (err) {
      this._commonApiErrorHandle(err);
    }
  }

  async _onQueuePlaylistButtonClick(playlist) {
    try {
      await jukeboxApi.enqueuePlaylist(playlist);
      this.setState(state => ({
        inQueuePlaylists: [...state.inQueuePlaylists, playlist]
      }));
    } catch (err) {
      this._commonApiErrorHandle(err);
    }
  }

  async _onViewAlbumButtonClick(album) {
    try {
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
    } catch (err) {
      this._commonApiErrorHandle(err);
    }
  }

  async _onViewArtistButtonClick(artist) {
    try {
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
    } catch (err) {
      this._commonApiErrorHandle(err);
    }
  }

  async _onViewPlaylistButtonClick(playlist) {
    try {
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
    } catch (err) {
      this._commonApiErrorHandle(err);
    }
  }

  async _onSearchButtonClick(q) {
    try {
      const { albums, artists, tracks, playlists } = await jukeboxApi.search(q);
      this.setState(
        {
          tab: Tab.SEARCH,
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
    } catch (err) {
      this._commonApiErrorHandle(err);
    }
  }

  _refreshTabContent() {
    const { tab } = this.state;
    switch (tab) {
      case Tab.HOME:
        this._refreshUserTop();
        break;
      case Tab.MY_PLAYLISTS:
        this._refreshUserPlaylists();
        break;
      case Tab.MY_ALBUMS:
        this._refreshUserAlbums();
        break;
      case Tab.MY_ARTISTS:
        this._refreshUserArtists();
        break;
      case Tab.MY_TRACKS:
        this._refreshUserTracks();
        break;
      default:
        break;
    }
  }

  async _refreshUserTop() {
    try {
      const { artists, tracks } = await jukeboxApi.getUserTop();
      this.setState(
        {
          currentSearchListData: {
            ...this._EMPTY_SEARCH_LIST_DATA,
            artists,
            tracks
          }
        },
        this._pushState
      );
    } catch (err) {
      this._commonApiErrorHandle(err);
    }
  }

  async _refreshUserPlaylists() {
    try {
      const { playlists } = await jukeboxApi.getUserPlaylists();
      this.setState(
        {
          currentSearchListData: {
            ...this._EMPTY_SEARCH_LIST_DATA,
            playlists
          }
        },
        this._pushState
      );
    } catch (err) {
      this._commonApiErrorHandle(err);
    }
  }

  async _refreshUserAlbums() {
    try {
      const { albums } = await jukeboxApi.getUserAlbums();
      this.setState(
        {
          currentSearchListData: {
            ...this._EMPTY_SEARCH_LIST_DATA,
            albums
          }
        },
        this._pushState
      );
    } catch (err) {
      this._commonApiErrorHandle(err);
    }
  }

  async _refreshUserArtists() {
    try {
      const { artists } = await jukeboxApi.getUserArtists();
      this.setState(
        {
          currentSearchListData: {
            ...this._EMPTY_SEARCH_LIST_DATA,
            artists
          }
        },
        this._pushState
      );
    } catch (err) {
      this._commonApiErrorHandle(err);
    }
  }

  async _refreshUserTracks() {
    try {
      const { tracks } = await jukeboxApi.getUserTracks();
      this.setState(
        {
          currentSearchListData: {
            ...this._EMPTY_SEARCH_LIST_DATA,
            tracks
          }
        },
        this._pushState
      );
    } catch (err) {
      this._commonApiErrorHandle(err);
    }
  }

  _onTabChangeButtonClick(tab) {
    this.setState({
      tab
    });
  }

  _logout() {
    logout();
    this.setState(this._INITIAL_STATE);
    window.history.pushState("logged_out", null, "/");
  }

  _onLogoutButtonClick() {
    this._logout();
  }

  _commonApiErrorHandle(err) {
    // TODO show notification
    this._logout();
  }

  render() {
    const { login } = this.state;

    if (!login.isLogin) {
      return <Login onLoginCallback={this._onLoginCallback} />;
    }

    const {
      tab,
      inQueueTracks,
      inQueueAlbums,
      inQueuePlaylists,
      currentTrack,
      currentSearchListData,
      playerState
    } = this.state;

    return (
      <div className={style.container}>
        <div className={style.headerBarContainer}>
          <HeaderBar
            activeTab={tab}
            onSearchButtonClick={this._onSearchButtonClick}
            onTabChangeButtonClick={this._onTabChangeButtonClick}
            onLogoutButtonClick={this._onLogoutButtonClick}
          />
        </div>
        <div className={style.searchListContainer}>
          <SearchList
            {...currentSearchListData}
            inQueueTracks={inQueueTracks}
            inQueueAlbums={inQueueAlbums}
            inQueuePlaylists={inQueuePlaylists}
            albumComponent={AlbumListItem}
            artistComponent={ArtistLiteItem}
            playlistComponent={PlaylistListItem}
            trackComponent={TrackListItem}
            onQueueTrackButtonClick={this._onQueueTrackButtonClick}
            onQueueAlbumButtonClick={this._onQueueAlbumButtonClick}
            onQueuePlaylistButtonClick={this._onQueuePlaylistButtonClick}
            onViewAlbumButtonClick={this._onViewAlbumButtonClick}
            onViewArtistButtonClick={this._onViewArtistButtonClick}
            onViewPlaylistButtonClick={this._onViewPlaylistButtonClick}
          />
        </div>
        <div className={style.footerBarContainer}>
          <FooterBar
            currentTrack={currentTrack}
            displayPlayButton={playerState === _PlayerState.READY}
            onPlayButtonClick={this._onPlayButtonClick}
          />
        </div>
        <PollingCurrentTrack
          onCurrentTrackChange={this._onCurrentTrackChange}
        />
        <Player
          onPlayerReady={this._onPlayerReady}
          play={playerState === _PlayerState.PLAY}
        />
      </div>
    );
  }
}

export default App;
