import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import useSpotSocket from '../../context/useSpotSocket';
import { updateAuthorization } from '../../actions/userActions';
import { connect } from 'react-redux';
import global from '../../styles/global';
import LinearButton from '../../components/LinearButton';
import style from './style';
import { getDistanceBetween, getLocation } from '../../helpers/locationHelper';
import { UserListItem } from '../../components/UserListItem/UserListItem';

const Spot = ({
    updateAuthorization,
    navigation,
    route,
    user
}) => {
    const [location, setLocation] = useState(null);

    const onUserDataChange = (user) => {
        updateAuthorization(true, user);
    };

    const [spot, joinSession, leaveSession] = useSpotSocket({
        spotId: route.params._id,
        user: {
            _id: user._id,
            firstName: user.firstName,
            username: user.username,
            image: user.image,
            inSession: user.inSession
        },
        onUserDataChange
    });

    useEffect(() => {
        getLocation().then(location => {
            setLocation({ latitude: location.latitude, longitude: location.longitude });
        });
    }, []);

    const getRadius = size => {
        const radius = { MEDIUM: 150, SMALL: 100, LARGE: 250 };
        return radius[size];
    }

    const canJoin = () => {
        if (location) {
            const distance = getDistanceBetween(
                location.latitude, location.longitude,
                spot.location.coordinates[1], spot.location.coordinates[0]
            );
            const radius = getRadius(spot.size);
            return distance <= radius;
        }
        return false;
    }

    const isJoined = () => {
        const index = spot.usersAtSpot.findIndex(u => u._id === user._id);
        return index !== -1;
    }

    if (!spot) {
        return (
            <View style={global.flex_center}>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <View style={global.main_container}>
            <View style={style.image_container}>
                <Image resizeMode={'contain'} style={style.image} source={{ uri: spot.image }} />
            </View>
            <ScrollView contentContainerStyle={style.info_container}>
                <Text style={style.title}>{spot.title}</Text>
                <Text style={style.topic_text}>About</Text>
                <Text style={style.regular_text}>{spot.description}</Text>
                <Text style={style.topic_text}>Size of the spot</Text>
                <Text style={style.regular_text}>{spot.size}</Text>
                <Text style={style.topic_text}>Spot type</Text>
                <Text style={style.regular_text}>{spot.type}</Text>
                {canJoin() && !isJoined() &&
                    <LinearButton onPress={joinSession}>
                        <Text style={global.button_white_text}>Join session</Text>
                    </LinearButton>}
                {isJoined() &&
                    <LinearButton onPress={leaveSession}>
                        <Text style={global.button_white_text}>Leave session</Text>
                    </LinearButton>}
                <View style={style.userSpotContainer}>
                    <Text style={style.topic_text}>Users at spot</Text>
                    {spot.usersAtSpot.filter(u => u._id !== user._id).map((u, i) => (
                        <UserListItem key={i} user={u} onPress={() => navigation.navigate('UserInfo', { _id: u._id })} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const mapStateToProps = ({ user }) => ({
    user
});

const mapDispatchToProps = dispatch => ({
    updateAuthorization: (bool, extraData) => dispatch(updateAuthorization(bool, extraData))
});

const SpotScreen = connect(mapStateToProps, mapDispatchToProps)(Spot);
export { SpotScreen };