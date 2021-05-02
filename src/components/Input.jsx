import React from 'react';
import { TextInput, Text } from 'react-native';
import { useState } from 'react/cjs/react.development';
import { ERROR_COLOR, PLACEHOLDER_COLOR } from '../styles/constants';
import style from '../styles/global';

const Input = ({
    secureTextEntry = false,
    inputStyle = {},
    text,
    showError = false,
    errorMessage,
    onChangeText = () => null,
    onBlur = () => null,
    onFocus = () => null,
    placeholder = 'Placeholder',
    disabled = false,
    multiline = false,
    maxLength,
    numberOfLines
}) => {
    const [input, setInput] = useState(text);

    const updateInput = value => {
        setInput(value);
        onChangeText(value);
    };

    return (
        <>
            <TextInput
                onBlur={onBlur}
                onFocus={onFocus}
                placeholderTextColor={PLACEHOLDER_COLOR}
                disabled={disabled}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                style={!showError ? { ...style.text_input, ...inputStyle } : { ...style.text_input, ...inputStyle, borderColor: ERROR_COLOR }}
                onChangeText={updateInput}
                value={input}
                multiline={multiline}
                maxLength={maxLength}
                numberOfLines={numberOfLines}
            />
            {showError && <Text style={style.error_text}>{errorMessage}</Text>}
        </>
    );
};

export default Input;
