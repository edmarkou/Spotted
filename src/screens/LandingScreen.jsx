import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearButton from '../components/LinearButton';
import style from '../styles/global';

const LandingScreen = ({
    navigation
}) => {

    return (
        <View style={style.flex_center}>
            <Text>Spotted</Text>
            <LinearButton onPress={() => navigation.navigate('Login')}>
                <Text style={style.button_white_text}>Login</Text>
            </LinearButton>
            <LinearButton onPress={() => navigation.navigate('First Register')}>
                <Text style={style.button_white_text}>Sign up</Text>
            </LinearButton>
        </View>
    );
}

export default LandingScreen;