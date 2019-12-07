import React from 'react';
import PropTypes from 'prop-types';
import { fetchTokenFromUrl } from './utils';

const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;


class Login extends React.Component {

    constructor(props) {
        super(props);

        this._onLoginButtonClick = this._onLoginButtonClick.bind(this);
    }

    componentDidMount() {
        const { onLoginCallback } = this.props;

        const token = fetchTokenFromUrl();
        if (token) {
            onLoginCallback && onLoginCallback(token);
        }
    }

    _onLoginButtonClick() {
        window.open(LOGIN_URL, '_self');
    }

    render() {
        return (
            <button onClick={this._onLoginButtonClick}>Login to Continue</button>
        );
    }
}

Login.propTypes = {
    onLoginCallback: PropTypes.func
};

export default Login;