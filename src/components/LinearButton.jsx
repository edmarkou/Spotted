import React from 'react';
import { TouchableOpacity } from 'react-native';
import style from '../styles/global';
import LinearGradient from 'react-native-linear-gradient';
import { DEFAULT_LINEAR_COLORS } from '../styles/constants';

const LinearButton = ({
    children,
    onPress = () => null,
    buttonStyle = {},
    gradientStyle = {},
    disabled
}) => {

    return (
        <TouchableOpacity
            disabled={disabled}
            style={{ ...style.linear_button_container, ...buttonStyle }}
            onPress={onPress}
        >
            <LinearGradient useAngle angle={45} colors={DEFAULT_LINEAR_COLORS} style={{ ...style.linear_button, ...gradientStyle }}>
                {children}
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default LinearButton;
