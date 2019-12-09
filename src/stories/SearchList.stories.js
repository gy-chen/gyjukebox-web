import React from "react";
import { action } from "@storybook/addon-actions";
import SearchList from "../SearchList";
import sampleData from "./search.sample.json";
import TrackListItem from "../TrackListItem";
import AlbumListItem from "../AlbumListItem";

export default {
  title: "SearchList"
};

export const empty = () => <SearchList />;

export const basic = () => (
  <SearchList
    {...sampleData}
    albumComponent={AlbumListItem}
    trackComponent={TrackListItem}
    inQueueTracks={[
      "spotify:track:5DXt0rgXsJPkU6sBCh4L4J",
      "spotify:track:4aebBr4JAihzJQR0CiIZJv"
    ]}
    onQueueTrackButtonClick={action("onQueueTrackButtonClick")}
    onViewAlbumButtonClick={action("onViewAlbumButtonClick")}
    onViewArtistButtonClick={action("onViewArtistButtonClick")}
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
        "spotify:track:5DXt0rgXsJPkU6sBCh4L4J",
        "spotify:track:4aebBr4JAihzJQR0CiIZJv"
      ]}
    />
  );
};
