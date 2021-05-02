import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import mapIcon from '../assets/images/map.png';
import mapActiveIcon from '../assets/images/map_active.png';
import accountIcon from '../assets/images/account.png';
import accountActiveIcon from '../assets/images/account_active.png';
import style from '../styles/tabBar';

const TabBar = ({ state, descriptors, navigation }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    const getIcon = (isFocused, routeName) => {
        switch (routeName) {
            case "Home":
                return isFocused ? mapActiveIcon : mapIcon;
            case "Profile":
                return isFocused ? accountActiveIcon : accountIcon;
            default:
                return null;
        }
    };

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    console.log(state);

    return (
        <View style={{ flexDirection: 'row', height: 50, backgroundColor: 'white' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={style.tab_button}
                    >
                        <Image style={style.tab_button_image} source={getIcon(isFocused, label)} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default TabBar;
