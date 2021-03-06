import React from "react";
import { action } from "@storybook/addon-actions";
import SearchList from "../SearchList";
import sampleData from "./search.sample.json";
import TrackListItem from "../TrackListItem";
import AlbumListItem from "../AlbumListItem";
import ArtistListItem from "../ArtistListItem";
import PlaylistListItem from "../PlaylistListItem";

export default {
  title: "SearchList"
};

export const empty = () => <SearchList />;

export const basic = () => (
  <SearchList
    {...sampleData}
    albumComponent={AlbumListItem}
    artistComponent={ArtistListItem}
    trackComponent={TrackListItem}
    playlistComponent={PlaylistListItem}
    inQueueTracks={[
      { uri: "spotify:track:5DXt0rgXsJPkU6sBCh4L4J" },
      { uri: "spotify:track:4aebBr4JAihzJQR0CiIZJv" }
    ]}
    inQueueAlbums={[
      { uri: "spotify:album:7jyiXKzJYgJ24IqlGMKcjN" },
      { uri: "spotify:album:2F8NmuQpBw8tAuusp7w3v5" }
    ]}
    inQueuePlaylists={[
      { uri: "spotify:playlist:4js6I1fwjC60SnT3gPpCvl" },
      { uri: "spotify:playlist:6xwq4yX7Iwcpk8h2BjvKBb" }
    ]}
    onQueueTrackButtonClick={action("onQueueTrackButtonClick")}
    onViewAlbumButtonClick={action("onViewAlbumButtonClick")}
    onViewArtistButtonClick={action("onViewArtistButtonClick")}
    onViewPlaylistButtonClick={action("onViewPlaylistButtonClick")}
    onQueueAlbumButtonClick={action("onQueueAlbumButtonClick")}
    onQueuePlaylistButtonClick={action("onQueuePlaylistButtonClick")}
  />
);

export const withSimpleDisplay = () => {
  const SimpleDisplay = props => {
    return <pre>{JSON.stringify(props, undefined, 2)}</pre>;
  };

  return (
    <SearchList
      {...sampleData}
      albumComponent={SimpleDisplay}
      artistComponent={SimpleDisplay}
      playlistComponent={SimpleDisplay}
      trackComponent={SimpleDisplay}
      inQueueTracks={[
        { uri: "spotify:track:5DXt0rgXsJPkU6sBCh4L4J" },
        { uri: "spotify:track:4aebBr4JAihzJQR0CiIZJv" }
      ]}
    />
  );
};
