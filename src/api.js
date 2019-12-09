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

export const enqueue = track => instance.post(`/track/${track.id}/enqueue`);

export const getCurrentTrack = async () => {
  const rv = await instance.get("/track/current");
  return rv.data;
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
