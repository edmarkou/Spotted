import React from 'react';
import { Image, View } from 'react-native';
import dropdownIcon from '../../assets/images/dropdown.png';
import RNPickerSelect from 'react-native-picker-select';
import style from './style';
import global from '../../styles/global';

const DropdownArrow = () => (
    <View style={style.icon_placement}>
        <Image source={dropdownIcon} style={style.icon} />
    </View>
);

export const Picker = ({
    onOpen = () => { },
    onClose = () => { },
    placeholder = {},
    onValueChange,
    items,
    value
}) => {
    return (
        <RNPickerSelect
            onOpen={onOpen}
            onClose={onClose}
            Icon={DropdownArrow}
            style={{ inputIOS: global.text_input }}
            placeholder={placeholder}
            onValueChange={onValueChange}
            items={items}
            value={value}
        />
    );
};
