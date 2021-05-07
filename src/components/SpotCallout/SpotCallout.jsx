import React from 'react';
import { Image, View, Text } from 'react-native';
import style from './style';

export const SpotCallout = ({ spot }) => {
    return (
        <View style={style.container}>
            <Image source={{ uri: spot.image }} style={style.image} />
            <Text style={style.title}>{spot.title}</Text>
        </View>
    );
};
