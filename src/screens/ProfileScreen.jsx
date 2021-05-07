import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { makeAuthRequest } from '../helpers/fetch';
import style from '../styles/global';
import LogoutButton from '../components/LogoutButton';
import { updateAuthorization } from '../actions/userActions';
import LinearButton from '../components/LinearButton';

const ProfileScreen = ({
    updateAuthorization,
    navigation,
    user
}) => {

    const deleteAll = () => {
        makeAuthRequest(`http://192.168.1.234:5000/spots/delete`, user, 'DELETE')
            .then().catch(err => {
                console.log(err.message);
            });
    }

    const deleteUsers = () => {
        makeAuthRequest(`http://192.168.1.234:5000/users/delete`, user, 'DELETE')
            .then().catch(err => {
                console.log(err.message);
            });
    }

    return (
        <View style={style.flex_center}>
            <LogoutButton updateAuthorization={updateAuthorization} />
            <LinearButton onPress={deleteAll}>
                <Text style={style.button_white_text}>Delete spots</Text>
            </LinearButton>
            <LinearButton onPress={deleteUsers}>
                <Text style={style.button_white_text}>Delete users</Text>
            </LinearButton>
        </View>
    );
};

const mapStateToProps = ({ user }) => ({
    user
});

const mapDispatchToProps = dispatch => ({
    updateAuthorization: (bool, extraData) => dispatch(updateAuthorization(bool, extraData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);