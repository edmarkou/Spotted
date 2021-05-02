import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { DEFAULT_LINEAR_COLORS } from '../../styles/constants';
import style from './style';
import global from './../../styles/global';
import Input from '../Input';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uploadToS3 } from '../../helpers/aws';
import LinearButton from '../LinearButton';
import { SPOT_TYPES, SIZE_TYPES } from '../../constants';
import { validateSpot } from '../../helpers/validator';
import { useEffect } from 'react';
import Picker from '../Picker';
import ImagePicker from './components/ImagePicker';

const defaultSpotParams = {
    title: '',
    description: '',
    size: SIZE_TYPES[0].value,
    type: SPOT_TYPES[0].value,
    image: null
};

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback style={global.flex_end} onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export const BottomHalfModal = ({
    isVisible,
    onClose,
    onSubmit
}) => {
    const [spot, setSpot] = useState(defaultSpotParams)
    const [focused, setFocus] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length) setErrors({});
    }, [spot]);

    const openGallery = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.1
        }, res => {
            if (!res.didCancel) {
                const source = {
                    uri: res.uri,
                    type: res.type,
                    name: res.fileName,
                };
                setSpot({ ...spot, image: res.uri });
                uploadToS3(source, data => {
                    setSpot({ ...spot, image: data.Location });
                });
            }
        });
    }

    const disableModal = () => setFocus(true);
    const enableModal = () => setFocus(false);

    const submit = () => {
        const { error } = validateSpot(spot);
        if (error) {
            let newErrors = {};
            error.details.forEach(detail => newErrors[detail.context.key] = detail.message);
            setErrors(newErrors);
        } else {
            setErrors({});
            onSubmit(spot);
            setSpot(defaultSpotParams);
        }
    }

    return (
        <Modal
            isVisible={isVisible}
            onSwipeComplete={onClose}
            swipeDirection={!focused ? ['down'] : []}
            style={style.container}
        >
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={global.flex_end}>
                <DismissKeyboard>
                    <SafeAreaView style={style.view}>
                        <LinearGradient useAngle angle={45} colors={DEFAULT_LINEAR_COLORS} style={style.notch} />
                        <ScrollView contentContainerStyle={style.scrollview}>
                            <Input
                                onFocus={disableModal}
                                onBlur={enableModal}
                                onChangeText={title => setSpot({ ...spot, title })}
                                disabled={loading}
                                placeholder={"Title"}
                                showError={!!errors['title']}
                                errorMessage={errors['title']}
                                text={spot.title}
                                maxLength={50}
                            />
                            <Input
                                onFocus={disableModal}
                                onBlur={enableModal}
                                onChangeText={description => setSpot({ ...spot, description })}
                                disabled={loading}
                                placeholder={"Description"}
                                showError={!!errors['description']}
                                errorMessage={errors['description']}
                                text={spot.description}
                                multiline={true}
                                maxLength={500}
                                numberOfLines={5}
                                inputStyle={{ height: 100 }}
                            />
                            <ImagePicker
                                placeholder={'Image required'}
                                openCamera={openGallery}
                                openGallery={openGallery}
                                image={spot.image}
                                showError={!!errors['image']}
                                errorMessage={errors['image']}
                            />
                            <Picker
                                onOpen={disableModal}
                                onClose={enableModal}
                                onValueChange={type => setSpot({ ...spot, type })}
                                items={SPOT_TYPES}
                                value={spot.type}
                            />
                            <Picker
                                onOpen={disableModal}
                                onClose={enableModal}
                                onValueChange={size => setSpot({ ...spot, size })}
                                items={SIZE_TYPES}
                                value={spot.size}
                            />
                            <LinearButton onPress={submit} disabled={Object.keys(errors).length}>
                                <Text style={global.button_white_text}>Create spot</Text>
                            </LinearButton>
                        </ScrollView>
                    </SafeAreaView>
                </DismissKeyboard>
            </KeyboardAvoidingView>
        </Modal>
    );
}