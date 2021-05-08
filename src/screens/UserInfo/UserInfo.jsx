import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { makeAuthRequest } from '../../helpers/fetch';
import global from '../../styles/global';
import LinearButton from '../../components/LinearButton';
import style from './style';
import { getDistanceBetween, getLocation } from '../../helpers/locationHelper';
import { UserListItem } from '../../components/UserListItem/UserListItem';
import { RIDER_TYPE, USER_TYPES } from '../../constants';

const UserInfo = ({
    route
}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        makeAuthRequest(`http://192.168.1.234:5000/users/get/${route.params._id}`)
            .then(res => {
                if (res.success) {
                    setUser(res.user);
                } else {
                    console.warn(res.message);
                }
            });
    }, []);

    if (!user) {
        return (
            <View style={global.flex_center}>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <View style={global.main_container}>
            <ScrollView contentContainerStyle={style.info_container}>
                <View style={style.default_container}>
                    <View style={style.avatar_container}>
                        <Image style={style.avatar_big} source={{ uri: user.image }} />
                    </View>
                    <View>
                        <Text style={style.username}>{user.username}</Text>
                        <View style={style.take_width}>
                            <View style={style.flex}>
                                {user.posts && <Text>Posts: {user.posts.length}</Text>}
                            </View>
                        </View>
                    </View>
                </View>
                <View style={style.default_container_column}>
                    <Text style={style.firstName}>{user.firstName}</Text>
                    <Text style={style.type}>{RIDER_TYPE[user.type]}</Text>
                    <Text style={style.description}>{user.description}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

export { UserInfo };