import React, { useEffect, useState } from 'react';
import Router from './navigation/Router';
import { connect } from 'react-redux';
import { updateAuthorization } from './actions/userActions';
import { makeAuthRequest } from './helpers/fetch';
import { removeUserSession } from './helpers/userSessionHelper';
import { initiateSocket } from './context/socketContext';
import { initLocationServices } from './helpers/locationHelper';
import { SafeAreaView, KeyboardAvoidingView } from 'react-native';
import style from './styles/global';

const App = ({
    updateAuthorization
}) => {
    const [locationGranted, setLocationPermission] = useState(false);

    useEffect(() => {
        initiateSocket();
        initLocationServices().then(initiated => {
            setLocationPermission(initiated);
            if (!initiated) {
                console.warn('Locations are not granted');
            }
        });

    }, []);

    useEffect(() => {
        makeAuthRequest('http://192.168.1.234:5000/users/auth')
            .then(res => {
                if (!res.success) {
                    removeUserSession()
                        .then(() => {
                            updateAuthorization(false);
                        }).catch(err => {
                            console.warn(err);
                        });
                } else {
                    updateAuthorization(true, res.user);
                }
            }).catch(err => {
                console.log(err.message);
                updateAuthorization(false);
            });
    }, []);

    return (
        <SafeAreaView style={style.main_container}>
            <KeyboardAvoidingView style={style.main_container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <Router locationGranted={locationGranted} />
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
};

const mapDispatchToProps = dispatch => ({
    updateAuthorization: (bool, extraData) => dispatch(updateAuthorization(bool, extraData))
});

export default connect(null, mapDispatchToProps)(App);
