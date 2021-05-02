import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { PLACEHOLDER_COLOR, PRIMARY_COLOR } from '../../../styles/constants';
import global from '../../../styles/global';
import { ERROR_COLOR } from '../../../styles/constants';
import LinearButton from '../../LinearButton';

const ImagePicker = ({
    image,
    openCamera,
    openGallery,
    placeholder,
    errorMessage,
    showError
}) => {
    return (
        <View style={style.image_picker_container}>
            <View
                style={{ ...style.spot_image_container, borderColor: showError ? ERROR_COLOR : PRIMARY_COLOR }}
            >
                {image ?
                    <Image style={style.spot_image} source={{ uri: image }} />
                    :
                    <Text style={showError ? style.error : style.placeholder}>
                        {showError ? errorMessage : placeholder}
                    </Text>}
            </View>
            <View style={style.spot_image_button_container}>
                <LinearButton
                    buttonStyle={{ ...style.spot_image_button, marginBottom: 'auto' }}
                    onPress={openGallery}
                    gradientStyle={global.small_gradient_button}
                >
                    <Text style={global.button_white_text_little}>Gallery</Text>
                </LinearButton>
                <LinearButton
                    buttonStyle={style.spot_image_button}
                    onPress={openCamera}
                    gradientStyle={global.small_gradient_button}
                >
                    <Text style={global.button_white_text_little}>Camera</Text>
                </LinearButton>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    spot_image_container: {
        width: '50%',
        height: 100,
        borderRadius: 10,
        borderColor: '#6e28b5',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    spot_image: {
        width: '100%',
        height: 99,
        borderRadius: 10,
        resizeMode: 'cover'
    },
    image_picker_container: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
        marginBottom: 5
    },
    spot_image_button_container: {
        width: '50%',
        height: '100%',
        maxHeight: '100%',
        paddingLeft: 10,
    },
    spot_image_button: {
        width: '100%',
        height: 45,
        marginTop: 0,
        marginBottom: 0
    },
    placeholder: {
        color: PLACEHOLDER_COLOR,
        fontSize: 16,
        fontWeight: "400",
        textAlign: 'center'
    },
    error: {
        color: ERROR_COLOR,
        fontSize: 16,
        fontWeight: "400",
        textAlign: 'center'
    }
});

export default ImagePicker;
