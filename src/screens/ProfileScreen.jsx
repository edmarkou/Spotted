import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { connect } from 'react-redux';
import { makeAuthRequest } from '../helpers/fetch';
import style from '../styles/global';
import LogoutButton from '../components/LogoutButton';
import { updateAuthorization } from '../actions/userActions';
import LinearButton from '../components/LinearButton';
import { validateProfile } from '../helpers/validator';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uploadToS3 } from '../helpers/aws';
import Picker from '../components/Picker';
import Input from '../components/Input';
import { USER_TYPES } from '../constants';

const ProfileScreen = ({
    updateAuthorization,
    navigation,
    user
}) => {
    const [userData, setUserData] = useState({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        description: user.description || '',
        type: user.type,
        image: user.image,
    });
    const [saving, setSaving] = useState(false);
    const [loadingImage, setLoadingImage] = useState(false);
    const [errors, setError] = useState({});

    const deleteAll = () => {
        makeAuthRequest(`http://192.168.1.234:5000/spots/delete`, user, 'DELETE')
            .then().catch(err => {
                console.log(err.message);
            });
    };

    const deleteUsers = () => {
        makeAuthRequest(`http://192.168.1.234:5000/users/delete`, user, 'DELETE')
            .then().catch(err => {
                console.log(err.message);
            });
    };

    const saveChanges = () => {
        const { error } = validateProfile(userData);
        if (error) {
            let newErrors = {};
            error.details.forEach(detail => newErrors[detail.context.key] = detail.message);
            setError(newErrors);
        } else {
            setError({});
            setSaving(true);
            makeAuthRequest(`http://192.168.1.234:5000/users/save`, userData, 'POST')
                .then((res) => {
                    if (res.success) {
                        updateAuthorization(true, userData);
                    }
                    setSaving(false);
                }).catch(err => {
                    console.log(err.message);
                    setSaving(false);
                });
        }
    };

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
                setUserData({ ...userData, image: res.uri });
                setLoadingImage(true);
                uploadToS3(source, data => {
                    setUserData({ ...userData, image: data.Location });
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
                setUserData({ ...userData, image: res.uri });
                setLoadingImage(true);
                uploadToS3(source, data => {
                    setUserData({ ...userData, image: data.Location });
                    setLoadingImage(false);
                });
            }
        });
    }

    return (
        <ScrollView contentContainerStyle={style.scrolview_flex_all}>
            <View style={style.flex_center}>
                <KeyboardAvoidingView style={style.keyboard_avoiding_view} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={style.avatar_container}>
                        <Image style={style.avatar_big} source={{ uri: userData.image }} />
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
                        disabled={saving}
                        placeholder={"User name"}
                        showError={!!errors['username']}
                        errorMessage={errors['username']}
                        text={userData.username}
                        onChangeText={username => setUserData({ ...userData, username })}
                    />
                    <Input
                        disabled={saving}
                        onChangeText={description => setUserData({ ...userData, description })}
                        placeholder={"Description"}
                        showError={!!errors['description']}
                        errorMessage={errors['description']}
                        text={userData.description}
                        multiline={true}
                        maxLength={500}
                        numberOfLines={5}
                        inputStyle={{ height: 100 }}
                    />
                    <Input
                        disabled={saving}
                        placeholder={"First name"}
                        text={userData.firstName}
                        onChangeText={firstName => setUserData({ ...userData, firstName })}
                        showError={!!errors['firstName']}
                        errorMessage={errors['firstName']}
                    />
                    <Input
                        disabled={saving}
                        placeholder={"Last name"}
                        showError={!!errors['lastName']}
                        errorMessage={errors['lastName']}
                        text={userData.lastName}
                        onChangeText={lastName => setUserData({ ...userData, lastName })}
                    />
                    <Picker
                        onValueChange={type => setType(type)}
                        items={USER_TYPES}
                        value={userData.type}
                    />
                    <LinearButton disabled={saving || loadingImage} onPress={saveChanges}>
                        {saving ? <ActivityIndicator /> : <Text style={style.button_white_text}>Save changes</Text>}
                    </LinearButton>
                    <LogoutButton updateAuthorization={updateAuthorization} />
                    {/* <LinearButton onPress={deleteAll}>
                <Text style={style.button_white_text}>Delete spots</Text>
            </LinearButton>
            <LinearButton onPress={deleteUsers}>
                <Text style={style.button_white_text}>Delete users</Text>
            </LinearButton> */}
                </KeyboardAvoidingView>
            </View>

        </ScrollView>
    );
};

const mapStateToProps = ({ user }) => ({
    user
});

const mapDispatchToProps = dispatch => ({
    updateAuthorization: (bool, extraData) => dispatch(updateAuthorization(bool, extraData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);