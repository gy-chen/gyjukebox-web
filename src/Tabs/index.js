import React from "react";
import PropTypes from "prop-types";
import style from "./Tabs.module.css";

const Tabs = props => {
  const { activeTab } = props;

  const _getItemClassName = tab => {
    if (tab === activeTab) {
      return `${style.item} ${style.active}`;
    }
    return style.item;
  };

  const _onTabChangeButtonClick = tab => {
    const { onTabChangeButtonClick } = props;

    onTabChangeButtonClick && onTabChangeButtonClick(tab);
  };

  return (
    <div className={style.container}>
      <div
        className={_getItemClassName(Tab.HOME)}
        onClick={() => _onTabChangeButtonClick(Tab.HOME)}
      >
        HOME
      </div>
      <div
        className={_getItemClassName(Tab.MY_PLAYLISTS)}
        onClick={() => _onTabChangeButtonClick(Tab.MY_PLAYLISTS)}
      >
        MY PLAYLISTS
      </div>
      <div
        className={_getItemClassName(Tab.MY_ALBUMS)}
        onClick={() => _onTabChangeButtonClick(Tab.MY_ALBUMS)}
      >
        MY ALBUMS
      </div>
      <div
        className={_getItemClassName(Tab.MY_ARTISTS)}
        onClick={() => _onTabChangeButtonClick(Tab.MY_ARTISTS)}
      >
        MY ARTISTS
      </div>
      <div
        className={_getItemClassName(Tab.MY_TRACKS)}
        onClick={() => _onTabChangeButtonClick(Tab.MY_TRACKS)}
      >
        MY TRACKS
      </div>
      {activeTab === Tab.SEARCH ? (
        <div
          className={_getItemClassName(Tab.SEARCH)}
          onClick={() => _onTabChangeButtonClick(Tab.SEARCH)}
        >
          SERACH
        </div>
      ) : null}
    </div>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.number,
  onTabChangeButtonClick: PropTypes.func
};

export const Tab = {
  HOME: 1,
  MY_PLAYLISTS: 2,
  MY_ALBUMS: 3,
  MY_ARTISTS: 4,
  MY_TRACKS: 5,
  SEARCH: 6
};

export default Tabs;
