import React from 'react';
import { View, Text, ActivityIndicator, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { useState } from 'react/cjs/react.development';
import { updateAuthorization } from '../actions/userActions';
import Input from '../components/Input';
import { makeRequest } from '../helpers/fetch';
import { storeUserSession } from '../helpers/userSessionHelper';
import { validateSecondRegistration } from '../helpers/validator';
import style from '../styles/global';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uploadToS3 } from '../helpers/aws';
import LinearButton from '../components/LinearButton';
import profileIcon from '../assets/images/profile.png';
import Picker from '../components/Picker';
import { USER_TYPES } from '../constants';

const SecondRegister = ({
    updateAuthorization,
    route
}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [errors, setError] = useState({});
    const [loadingImage, setLoadingImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(USER_TYPES[0].value);

    const onSubmit = () => {
        const { error } = validateSecondRegistration({ firstName, lastName, username, image });
        if (error) {
            let newErrors = {};
            error.details.forEach(detail => newErrors[detail.context.key] = detail.message);
            setError(newErrors);
        } else {
            setError({});
            setLoading(true);
            makeRequest(`http://192.168.1.234:5000/users/register`,
                {
                    email: route.params.email,
                    password: route.params.pass,
                    firstName,
                    lastName,
                    username,
                    image,
                    type
                },
                'POST')
                .then(res => {
                    if (res.success) {
                        storeUserSession({ token: res.token, ...res.user });
                        updateAuthorization(true, res.user);
                    } else {
                        if (res.status === 409) {
                            setError({ email: res.message });
                        }
                        console.log(res.message);
                        setLoading(false);
                    }
                }).catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }

    const openCamera = () => {
        launchCamera({
            maxHeight: 1000,
            maxWidth: 1000,
            mediaType: 'photo',
            quality: 0.5,
            cameraType: 'back',
            saveToPhotos: true,
        }, res => {
            if (res.errorCode === "camera_unavailable") {
                console.log('camera unavailable')
            } else if (!res.didCancel) {
                const source = {
                    uri: res.uri,
                    type: res.type,
                    name: res.fileName,
                };
                setImage(res.uri);
                setLoadingImage(true);
                uploadToS3(source, data => {
                    setImage(data.Location);
                    setLoadingImage(false);
                });
            }
        });
    }

    const openGallery = () => {
        launchImageLibrary({
            maxHeight: 1000,
            maxWidth: 1000,
            mediaType: 'photo',
            quality: 0.5,
        }, res => {
            if (!res.didCancel) {
                const source = {
                    uri: res.uri,
                    type: res.type,
                    name: res.fileName,
                };
                setImage(res.uri);
                setLoadingImage(true);
                uploadToS3(source, data => {
                    setImage(data.Location);
                    setLoadingImage(false);
                });
            }
        });
    }

    return (
        <ScrollView contentContainerStyle={style.scrolview_flex_all}>
            <View style={style.flex_top}>
                <KeyboardAvoidingView style={style.keyboard_avoiding_view} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={style.avatar_container}>
                        <Image style={style.avatar_big} source={image ? { uri: image } : profileIcon} />
                        {loadingImage && <ActivityIndicator style={{ position: 'absolute' }} />}
                    </View>
                    <View style={style.center_horizontal}>
                        <LinearButton
                            buttonStyle={style.small_button_container}
                            onPress={openGallery}
                            gradientStyle={style.small_gradient_button}
                        >
                            <Text style={style.button_white_text_little}>Gallery</Text>
                        </LinearButton>
                        <LinearButton
                            buttonStyle={style.small_button_container}
                            onPress={openCamera}
                            gradientStyle={style.small_gradient_button}
                        >
                            <Text style={style.button_white_text_little}>Camera</Text>
                        </LinearButton>
                    </View>
                    <Input
                        disabled={loading}
                        placeholder={"User name"}
                        showError={!!errors['username']}
                        errorMessage={errors['username']}
                        text={username}
                        onChangeText={setUserName}
                    />
                    <Input
                        disabled={loading}
                        placeholder={"First name"}
                        text={firstName}
                        onChangeText={setFirstName}
                        showError={!!errors['firstName']}
                        errorMessage={errors['firstName']}
                    />
                    <Input
                        disabled={loading}
                        placeholder={"Last name"}
                        showError={!!errors['lastName']}
                        errorMessage={errors['lastName']}
                        text={lastName}
                        onChangeText={setLastName}
                    />
                    <Picker
                        onValueChange={type => setType(type)}
                        items={USER_TYPES}
                        value={type}
                    />
                    <LinearButton onPress={onSubmit} disabled={loading || loadingImage}>
                        {loading ? <ActivityIndicator /> : <Text style={style.button_white_text}>Sign up</Text>}
                    </LinearButton>
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    );
}

const mapDispatchToProps = dispatch => ({
    updateAuthorization: (bool, extraData) => dispatch(updateAuthorization(bool, extraData))
});

export default connect(null, mapDispatchToProps)(SecondRegister);