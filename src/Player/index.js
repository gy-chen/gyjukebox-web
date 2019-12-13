import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import Hls from "hls.js";

const HLS_LOCATION = process.env.REACT_APP_HLS_LOCATION;

class Player extends React.PureComponent {
  constructor(props) {
    super(props);

    this._onMediaAttached = this._onMediaAttached.bind(this);
    this._onManifestParsed = this._onManifestParsed.bind(this);
    this._onError = this._onError.bind(this);
    this._retryLoadResource = _.throttle(
      this._retryLoadResource.bind(this),
      2000
    );

    this._audioRef = React.createRef();
    this._hls = null;
    this._mediaParsed = false;
  }

  componentDidMount() {
    if (Hls.isSupported()) {
      this._hls = new Hls();
      this._hls.attachMedia(this._audioRef.current);
      this._hls.on(Hls.Events.MEDIA_ATTACHED, this._onMediaAttached);
    } else {
      this._audioRef.current.src = HLS_LOCATION;
      this._audioRef.current.addEventListener(
        "loadedmetadata",
        this._onManifestParsed
      );
    }
  }

  componentDidUpdate(prevProps) {
    const { prevPlay } = prevProps;
    const play = this.props;
    if (prevPlay !== play) {
      if (play) {
        this._audioRef.current.play();
      } else {
        this._audioRef.current.pause();
      }
    }
  }

  _onMediaAttached() {
    this._hls.loadSource(HLS_LOCATION);
    this._hls.on(Hls.Events.MANIFEST_PARSED, this._onManifestParsed);
    this._hls.on(Hls.Events.ERROR, this._onError);
  }

  _onManifestParsed() {
    const { onPlayerReady } = this.props;

    this._mediaParsed = true;
    onPlayerReady && onPlayerReady();
  }

  _onError(_, data) {
    if (data.fatal) {
      console.log("encounter fatal error, try to recover", data);
      if (this._mediaParsed) {
        this._hls.startLoad();
      } else {
        this._retryLoadResource();
      }
    }
  }

  _retryLoadResource() {
    this._hls.loadSource(HLS_LOCATION);
  }

  render() {
    return <audio ref={this._audioRef}></audio>;
  }
}

Player.propTypes = {
  onPlayerReady: PropTypes.func,
  play: PropTypes.bool
};

export default Player;
