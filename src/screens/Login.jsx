import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import style from '../styles/global';
import { makeRequest } from '../helpers/fetch';
import { storeUserSession } from '../helpers/userSessionHelper';
import { connect } from 'react-redux';
import { updateAuthorization } from '../actions/userActions';
import LinearButton from '../components/LinearButton';
import Input from '../components/Input';
import { validateLogin } from '../helpers/validator';


const Login = ({
    updateAuthorization,
    navigation
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState({});

    const login = () => {
        const { error } = validateLogin({ email, password });
        if (error) {
            let newErrors = {};
            error.details.forEach(detail => {
                newErrors[detail.context.key] = detail.message;
            });
            setError(newErrors);
        } else {
            setError({});
            setLoading(true);
            makeRequest(`http://localhost:5000/users/login`, { email, password }, 'POST')
                .then(res => {
                    if (res.success) {
                        storeUserSession({ token: res.token, ...res.user });
                        updateAuthorization(true, res.user);
                    } else {
                        setLoading(false);
                        if (res.status === 404) {
                            setError({ email: res.message });
                        } else if (res.status === 400) {
                            setError({ password: res.message });
                        }
                    }
                });
        }
    };

    return (
        <View style={style.flex_center}>
            <Input
                onChangeText={setEmail}
                disabled={loading}
                placeholder={"Email address"}
                showError={!!errors['email']}
                errorMessage={errors['email']}
                text={email}
            />
            <Input
                onChangeText={setPassword}
                disabled={loading}
                placeholder={"Password"}
                showError={!!errors['password']}
                errorMessage={errors['password']}
                text={password}
                secureTextEntry={true}
            />
            <LinearButton onPress={login}>
                <Text style={style.button_white_text}>Login</Text>
            </LinearButton>
        </View>
    );
}

const mapDispatchToProps = dispatch => ({
    updateAuthorization: (bool, extraData) => dispatch(updateAuthorization(bool, extraData))
});

export default connect(null, mapDispatchToProps)(Login);