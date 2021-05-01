import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import style from '../styles/global';
import { updateAuthorization } from '../actions/userActions';

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%'
    },
});

const SpotScreen = ({
    updateAuthorization,
    navigation
}) => {

    return (
        <View style={style.flex_center}>

        </View>
    );
};

const mapDispatchToProps = dispatch => ({
    updateAuthorization: (bool, extraData) => dispatch(updateAuthorization(bool, extraData))
});

export default connect(null, mapDispatchToProps)(SpotScreen);