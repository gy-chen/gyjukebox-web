import React from "react";
import PropTypes from "prop-types";
import { fetchTokenFromUrl } from "./utils";
import style from "./Login.module.css";

const GOOGLE_LOGIN_URL = process.env.REACT_APP_LOGIN_GOOGLE_URL;
const SPOTIFY_LOGIN_URL = process.env.REACT_APP_LOGIN_SPOTIFY_URL;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this._onLoginGoogleButtonClick = this._onLoginGoogleButtonClick.bind(this);
    this._onLoginSpotifyButtonClick = this._onLoginSpotifyButtonClick.bind(
      this
    );
  }

  componentDidMount() {
    const { onLoginCallback } = this.props;

    const token = fetchTokenFromUrl() || localStorage.getItem("LoginToken");
    if (token) {
      localStorage.setItem("LoginToken", token);
      onLoginCallback && onLoginCallback(token);
    }
  }

  _onLoginGoogleButtonClick() {
    window.open(GOOGLE_LOGIN_URL, "_self");
  }

  _onLoginSpotifyButtonClick() {
    window.open(SPOTIFY_LOGIN_URL, "_self");
  }

  render() {
    return (
      <div className={style.container}>
        <h1>GYJUKEBOX</h1>
        <button
          onClick={this._onLoginGoogleButtonClick}
          className={`${style.loginButton} ${style.googleLoginButton}`}
        >
          Login with Google
        </button>
        <button
          onClick={this._onLoginSpotifyButtonClick}
          className={`${style.loginButton} ${style.spotifyLoginButton}`}
        >
          Login with Spotify
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  onLoginCallback: PropTypes.func
};

export default Login;
