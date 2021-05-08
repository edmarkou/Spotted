import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import style from './style';
import global from './../../styles/global';
import LinearButton from '../LinearButton';

export const UserListItem = ({
    user,
    onPress = () => { }
}) => {

    return (
        <View style={style.container}>
            <View style={style.avatarContainer}>
                <Image source={{ uri: user.image }} style={style.avatar} />
            </View>
            <View style={style.textContainer}>
                <Text style={style.username}>{user.username}</Text>
                <Text style={style.name}>({user.firstName})</Text>
            </View>
            <LinearButton onPress={onPress} buttonStyle={style.button} >
                <Text style={{ ...global.button_white_text, ...style.button_text }}>Profile</Text>
            </LinearButton>
        </View>
    );
}