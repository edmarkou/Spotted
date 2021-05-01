import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import backIcon from '../assets/images/back.png';
import style from '../styles/global';

const Logo = ({ onPress, canGoBack }) => {
    if (!canGoBack) return null;
    return (
        <TouchableOpacity onPress={onPress}>
            <Image source={backIcon} style={style.back_button} />
        </TouchableOpacity>
    );
};

export default Logo;