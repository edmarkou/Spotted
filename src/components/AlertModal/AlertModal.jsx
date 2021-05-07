import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import style from './style';
import global from './../../styles/global';
import LinearButton from '../LinearButton';

export const AlertModal = ({
    isVisible,
    closeModal,
    text
}) => {

    return (
        <Modal isVisible={isVisible} style={style.container}>
            <SafeAreaView style={global.flex_center}>
                <View style={style.content}>
                    <Text style={style.contentTitle}>{text}</Text>
                    <LinearButton onPress={closeModal}>
                        <Text style={global.button_white_text}>Ok</Text>
                    </LinearButton>
                </View>
            </SafeAreaView>
        </Modal>
    );
}