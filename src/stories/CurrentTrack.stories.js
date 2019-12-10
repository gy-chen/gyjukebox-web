import React from "react";
import sampleData from "./search.sample.json";
import CurrentTrack from "../CurrentTrack";

export default {
  title: "CurrentTrack"
};

export const basic = () => {
  const user = {
    sub: "testSub",
    name: "Test Name"
  };

  const track = sampleData.tracks[1];

  return <CurrentTrack user={user} track={track} />;
};
