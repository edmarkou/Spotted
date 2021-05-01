import React from 'react';
import { View, ActivityIndicator} from 'react-native';
import style from '../styles/global';

export default () => (
    <View style={style.flex_center}>
        <ActivityIndicator />
    </View>
);
