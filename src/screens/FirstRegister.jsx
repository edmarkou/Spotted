import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useState } from 'react/cjs/react.development';
import Input from '../components/Input';
import { makeRequest } from '../helpers/fetch';
import { validateFirstRegistration } from '../helpers/validator';
import style from '../styles/global';
import LinearButton from '../components/LinearButton';

const FirstRegister = ({
    navigation
}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [repeatPass, setRepeatPass] = useState('');
    const [errors, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const onSubmit = () => {
        const { error } = validateFirstRegistration({ email, pass, repeatPass });
        if (error) {
            let newErrors = {};
            error.details.forEach(detail => {
                newErrors[detail.context.key] = detail.message;
            });
            setError(newErrors);
        } else {
            setError({});
            setLoading(true);
            makeRequest(`http://192.168.1.234:5000/users/check-email`, { email }, "POST").then(res => {
                if (res.success) {
                    if (res.userExists) {
                        setError({ email: res.message });
                    } else {
                        navigation.navigate('Second Register', { email, pass });
                    }
                } else {
                    console.warn(res.message);
                }
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setLoading(false);
            });
        }
    }

    return (
        <View style={style.flex_center}>
            <Input
                disabled={loading}
                placeholder={"Email address"}
                text={email}
                onChangeText={setEmail}
                showError={!!errors['email']}
                errorMessage={errors['email']}
            />
            <Input
                disabled={loading}
                placeholder={"Password"}
                showError={!!errors['pass']}
                errorMessage={errors['pass']}
                secureTextEntry={true}
                text={pass}
                onChangeText={setPass}
            />
            <Input
                disabled={loading}
                placeholder={"Repeat password"}
                showError={!!errors['repeatPass']}
                errorMessage={errors['repeatPass']}
                secureTextEntry={true}
                text={repeatPass}
                onChangeText={setRepeatPass}
            />
            <LinearButton
                onPress={onSubmit}
                disabled={loading}
            >
                {loading ? <ActivityIndicator /> : <Text style={style.button_white_text}>Next</Text>}
            </LinearButton>
        </View>
    );
}

export default FirstRegister;
