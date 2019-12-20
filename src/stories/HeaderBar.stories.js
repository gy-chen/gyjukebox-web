import React from "react";
import { action } from "@storybook/addon-actions";
import HeaderBar from "../HeaderBar";
import { Tab } from "../Tabs";

export default {
  title: "HeaderBar"
};

export const basic = () => (
  <HeaderBar
    onTabChangeButtonClick={action("onTabChangeButtonClick")}
    onLogoutButtonClick={action("onLogoutButtonClick")}
  />
);

export const homeTabActivaed = () => <HeaderBar activeTab={Tab.HOME} />;

export const myPlaylistsTabActivaed = () => (
  <HeaderBar activeTab={Tab.MY_PLAYLISTS} />
);

export const myAlbumsTabActivaed = () => (
  <HeaderBar activeTab={Tab.MY_ALBUMS} />
);

export const myArtistsTabActivaed = () => (
  <HeaderBar activeTab={Tab.MY_ARTISTS} />
);

export const myTracksTabActivaed = () => (
  <HeaderBar activeTab={Tab.MY_TRACKS} />
);
