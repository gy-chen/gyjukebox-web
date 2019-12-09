import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as PlusIcon } from "bootstrap-icons/icons/plus.svg";
import { ReactComponent as CheckIcon } from "bootstrap-icons/icons/check.svg";
import AlbumColumnItem from "../AlbumColumItem";
import ArtistsColumnItem from "../ArtistsColumnItem";
import style from "./TrackListItem.module.css";

const TrackListItem = props => {
  const { track, onViewArtistButtonClick } = props;

  const _onQueueTrackButtonClick = () => {
    const { onQueueTrackButtonClick } = props;

    onQueueTrackButtonClick && onQueueTrackButtonClick(track);
  };

  const _onViewAlbumButtonClick = () => {
    const { onViewAlbumButtonClick } = props;

    onViewAlbumButtonClick && onViewAlbumButtonClick(track.album);
  };

  const _renderQueueButton = () => {
    const { inQueue } = props;
    if (inQueue) {
      return <CheckIcon className={style.queuedButton} />;
    }
    return (
      <PlusIcon
        onClick={_onQueueTrackButtonClick}
        className={style.queueButton}
      />
    );
  };

  return (
    <div className={style.container}>
      <div>{track.name}</div>
      <div>
        <ArtistsColumnItem
          artists={track.artists}
          onViewArtistButtonClick={onViewArtistButtonClick}
        />
      </div>
      <div>
        <AlbumColumnItem
          album={track.album}
          onViewAlbumButtonClick={_onViewAlbumButtonClick}
        />
      </div>
      <div>{_renderQueueButton()}</div>
    </div>
  );
};

TrackListItem.propTypes = {
  track: PropTypes.object.isRequired,
  inQueue: PropTypes.bool,
  onQueueTrackButtonClick: PropTypes.func,
  onViewAlbumButtonClick: PropTypes.func,
  onViewArtistButtonClick: PropTypes.func
};

export default TrackListItem;
