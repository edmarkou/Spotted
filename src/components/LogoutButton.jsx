import React from 'react';
import { Text } from 'react-native';
import { makeAuthRequest } from '../helpers/fetch';
import { removeUserSession } from '../helpers/userSessionHelper';
import style from '../styles/global';
import LinearButton from './LinearButton';

const Logout = ({
    updateAuthorization,
    buttonStyle = {},
    textStyle = {},
    text = 'Logout'
}) => {

    const logout = () => {
        makeAuthRequest('http://192.168.1.234:5000/users/logout')
            .then(() => {
                updateAuthorization(false);
                removeUserSession();
            })
            .catch(err => {
                console.warn(err);
            });
    };

    return (
        <LinearButton onPress={logout} buttonStyle={buttonStyle}>
            <Text style={{ ...style.button_white_text, ...textStyle }}>{text}</Text>
        </LinearButton>
    );
};

export default Logout;
