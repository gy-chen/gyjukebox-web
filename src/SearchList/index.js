import React from 'react';
import PropTypes from 'prop-types';


class SearchList extends React.Component {

    constructor(props) {
        super(props);

        this._renderAlbums = this._renderAlbums.bind(this);
        this._renderArtists = this._renderArtists.bind(this);
        this._renderPlaylists = this._renderPlaylists.bind(this);
        this._renderTracks = this._renderTracks.bind(this);
    }

    _renderAlbums() {
        const { albums, albumComponent: AlbumComponent } = this.props;
        if (!AlbumComponent || !albums || albums.length === 0) {
            return null;
        }

        return (
            <React.Fragment>
                <li>Albums</li>
                {albums.map(album => <li><AlbumComponent album={album} /></li>)}
            </React.Fragment>
        )
    };

    _renderArtists() {
        const { artists, artistComponent: ArtistComponent } = this.props;
        if (!ArtistComponent || !artists || artists.length === 0) {
            return null;
        }

        return (
            <React.Fragment>
                <li>Artists</li>
                {artists.map(artist => <li><ArtistComponent artist={artist} /></li>)}
            </React.Fragment>
        )
    };

    _renderPlaylists() {
        const { playlists, playlistComponent: PlaylistComponent } = this.props;
        if (!PlaylistComponent || !playlists || playlists.length === 0) {
            return null;
        }

        return (
            <React.Fragment>
                <li>Playlist</li>
                {playlists.map(playlist => <li><PlaylistComponent playlist={playlist} /></li>)}
            </React.Fragment>
        );
    }

    _renderTracks() {
        const { tracks, trackComponent: TrackComponent } = this.props;
        if (!TrackComponent || !tracks || tracks.length === 0) {
            return null;
        }

        return (
            <React.Fragment>
                <li>Tracks</li>
                {tracks.map(track => <li><TrackComponent track={track} /></li>)}
            </React.Fragment>
        );
    }

    render() {

        return (
            <ul>
                {this._renderAlbums()}
                {this._renderArtists()}
                {this._renderPlaylists()}
                {this._renderTracks()}
            </ul>
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
};

export default SearchList;