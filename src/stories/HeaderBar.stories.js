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

export const myPlaylistsTabActivated = () => (
  <HeaderBar activeTab={Tab.MY_PLAYLISTS} />
);

export const myAlbumsTabActivated = () => (
  <HeaderBar activeTab={Tab.MY_ALBUMS} />
);

export const myArtistsTabActivated = () => (
  <HeaderBar activeTab={Tab.MY_ARTISTS} />
);

export const myTracksTabActivated = () => (
  <HeaderBar activeTab={Tab.MY_TRACKS} />
);

export const searchActivated = () => <HeaderBar activeTab={Tab.SEARCH} />;
