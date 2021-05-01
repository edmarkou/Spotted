import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import style from '../styles/global';

const UserHeaderTitle = ({ user, navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { user })} style={style.user_logo}>
            <Image source={{ uri: user.image }} style={style.avatar_small} />
        </TouchableOpacity>
    );
};

export default UserHeaderTitle;
