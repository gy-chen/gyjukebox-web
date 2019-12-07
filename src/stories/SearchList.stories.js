import React from 'react';
import SearchList from '../SearchList';
import sampleData from './search.sample.json';


export default {
    title: 'SearchList',
};

export const empty = () => <SearchList />;

export const withSimpleDisplay = () => {
    const SimpleDisplay = props => {
        return <pre>{JSON.stringify(props, undefined, 2)}</pre>;
    }

    return <SearchList
        {...sampleData}
        albumComponent={SimpleDisplay}
        artistComponent={SimpleDisplay}
        playlistComponent={SimpleDisplay}
        trackComponent={SimpleDisplay}
    />;
};