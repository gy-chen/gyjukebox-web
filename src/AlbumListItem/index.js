import React from 'react';
import PropTypes from 'prop-types';
import style from './AlbumListItem.module.css';
import { ReactComponent as SearchIcon } from 'bootstrap-icons/icons/search.svg';

const AlbumListItem = props => {
    const { album } = props;

    const _onViewAlbumButtonClick = () => {
        const { onViewAlbumButtonClick } = props;

        onViewAlbumButtonClick && onViewAlbumButtonClick(album);
    }

    return (
        <div className={style.container}>
            <div>{album.name}</div>
            <div>{album.artists.map(artist => artist.name).join(", ")}</div>
            <div><SearchIcon onClick={_onViewAlbumButtonClick} className={style.searchIcon} /></div>
        </div>
    );
};

AlbumListItem.propTypes = {
    album: PropTypes.object.isRequired,
    onViewAlbumButtonClick: PropTypes.func,
};

export default AlbumListItem;