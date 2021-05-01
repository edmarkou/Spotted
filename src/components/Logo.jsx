import React from 'react';
import { Image } from 'react-native';
import logoIcon from '../assets/images/logo.png';
import style from '../styles/global';

const Logo = props => {
    return (
        <Image source={logoIcon} style={style.logo_header} />
    );
};

export default Logo;
