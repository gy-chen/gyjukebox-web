import React from "react";
import PropTypes from "prop-types";
import { fetchTokenFromUrl } from "./utils";
import style from "./Login.module.css";

const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this._onLoginButtonClick = this._onLoginButtonClick.bind(this);
  }

  componentDidMount() {
    const { onLoginCallback } = this.props;

    const token = fetchTokenFromUrl() || localStorage.getItem("LoginToken");
    if (token) {
      localStorage.setItem("LoginToken", token);
      onLoginCallback && onLoginCallback(token);
    }
  }

  _onLoginButtonClick() {
    window.open(LOGIN_URL, "_self");
  }

  render() {
    return (
      <div className={style.container}>
        <h1>GYJUKEBOX</h1>
        <button
          onClick={this._onLoginButtonClick}
          className={style.loginButton}
        >
          Login
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  onLoginCallback: PropTypes.func
};

export default Login;
