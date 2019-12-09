import React from "react";
import { action } from "@storybook/addon-actions";
import SearchBar from "../SearchBar";

export default {
  title: "SearchBar"
};

export const basic = () => (
  <SearchBar onSearchButtonClick={action("onSearchButtonClick")} />
);
