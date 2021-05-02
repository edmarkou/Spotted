import React from 'react';
import { Image, View, Text } from 'react-native';
import logoIcon from '../../assets/images/logo.png';
import style from './style';

export const SpotCallout = ({ spot }) => {
    return (
        <View style={style.container}>
            <Image source={logoIcon} style={style.image} />
            <View>
                <Text>{spot.title}</Text>
            </View>
        </View>

    );
};
