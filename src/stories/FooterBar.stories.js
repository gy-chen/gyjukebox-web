import React from "react";
import sampleData from "./search.sample.json";
import FooterBar from "../FooterBar";

export default {
  title: "FooterBar"
};

export const basic = () => {
  const user = {
    sub: "testSub",
    name: "Test Name"
  };

  const track = sampleData.tracks[1];

  return <FooterBar currentTrack={{ user, track }} />;
};

export const noCurrentTrack = () => <FooterBar />;
