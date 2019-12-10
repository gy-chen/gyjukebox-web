import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import * as jukeboxApi from "../api";

class PollingCurrentTrack extends React.Component {
  constructor(props) {
    super(props);

    this._poll = this._poll.bind(this);

    this._pollingInterval = null;
    this._previousCurrentTrack = null;
  }

  componentDidMount() {
    this._pollingInterval = setInterval(this._poll, 2000);
  }

  componentWillUnmount() {
    clearInterval(this._pollingInterval);
    this._pollingInterval = null;
  }

  async _poll() {
    const currentTrack = await jukeboxApi.getCurrentTrack();
    if (!_.isEqual(this._previousCurrentTrack, currentTrack)) {
      const { onCurrentTrackChange } = this.props;
      onCurrentTrackChange && onCurrentTrackChange(currentTrack);
      this._previousCurrentTrack = currentTrack;
    }
  }

  render() {
    return null;
  }
}

PollingCurrentTrack.propTypes = {
  onCurrentTrackChange: PropTypes.func
};

export default PollingCurrentTrack;
