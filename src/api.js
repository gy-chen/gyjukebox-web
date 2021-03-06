import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

export const PAGING_SIZE = 20;

export const setAuthorizationToken = token =>
  (instance.defaults.headers.common["Authorization"] = `Bearer ${token}`);

export const search = async (q, offset = 0) => {
  const rv = await instance.get("/search", { params: { q, offset } });
  return rv.data;
};

export const enqueueTrack = track =>
  instance.post(`/track/${track.id}/enqueue`);

export const enqueueAlbum = album =>
  instance.post(`/album/${album.id}/enqueue`);

export const enqueuePlaylist = playlist =>
  instance.post(`/playlist/${playlist.id}/enqueue`);

export const getCurrentTrack = async () => {
  const rv = await instance.get("/track/current");
  const currentTrack = rv.data;
  if (!currentTrack) {
    return {
      track: null,
      user: null
    };
  }
  return currentTrack;
};

export const getAlbumTracks = async (album, offset = 0) => {
  const params = { offset };
  const rv = await instance.get(`/album/${album.id}/tracks`, { params });
  rv.data.tracks.forEach(track => (track.album = album));
  return rv.data;
};

export const getArtistDetails = async (artist, offset = 0) => {
  const params = { offset };
  const rv = await instance.get(`/artist/${artist.id}/details`, { params });
  return rv.data;
};

export const getPlaylistTracks = async (playlist, offset = 0) => {
  const params = { offset };
  const rv = await instance.get(`/playlist/${playlist.id}/tracks`, { params });
  rv.data.tracks = rv.data.tracks.map(playlistTrack => playlistTrack.track);
  return rv.data;
};

export const getUserTop = async (offset = 0) => {
  const params = { offset };
  const rv = await instance.get("/me/top", { params });
  return rv.data;
};

export const getUserPlaylists = async (offset = 0) => {
  const params = { offset };
  const rv = await instance.get("/me/playlists", { params });
  return rv.data;
};

export const getUserAlbums = async (offset = 0) => {
  const params = { offset };
  const rv = await instance.get("/me/albums", { params });
  rv.data.albums = rv.data.albums.map(userAlbum => userAlbum.album);
  return rv.data;
};

export const getUserArtists = async (after = null) => {
  const params = { after };
  const rv = await instance.get("/me/artists", { params });
  return rv.data;
};

export const getUserTracks = async (offset = 0) => {
  const params = { offset };
  const rv = await instance.get("/me/tracks", { params });
  rv.data.tracks = rv.data.tracks.map(userTrack => userTrack.track);
  return rv.data;
};
