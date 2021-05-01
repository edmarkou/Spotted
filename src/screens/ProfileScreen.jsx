import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import style from '../styles/global';
import LogoutButton from '../components/LogoutButton';
import { updateAuthorization } from '../actions/userActions';

const ProfileScreen = ({
    updateAuthorization,
    navigation
}) => {

    return (
        <View style={style.flex_center}>
            <LogoutButton updateAuthorization={updateAuthorization} />
        </View>
    );
};

const mapDispatchToProps = dispatch => ({
    updateAuthorization: (bool, extraData) => dispatch(updateAuthorization(bool, extraData))
});

export default connect(null, mapDispatchToProps)(ProfileScreen);