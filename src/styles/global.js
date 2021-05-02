import { StyleSheet } from 'react-native';
import { ERROR_COLOR } from './constants';

const style = StyleSheet.create({
    main_container: {
        flex: 1
    },
    flex_center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    flex_end: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    home_container: {
        flex: 1,
        alignItems: 'center'
    },
    flex_top: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10
    },
    text_input: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#8E54E9',
        width: '100%',
        height: 50,
        borderRadius: 10,
        padding: 10,
        marginBottom: 5,
        marginTop: 5,
        color: '#6e28b5'
    },
    default_button: {
        backgroundColor: '#321321',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 10,
        marginBottom: 5,
        marginTop: 5
    },
    button_white_text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: "400"
    },
    button_white_text_little: {
        color: '#fff',
        fontSize: 14,
        fontWeight: "400"
    },
    error_text: {
        color: ERROR_COLOR,
        fontSize: 16,
        fontWeight: "400"
    },
    linear_button_container: {
        borderRadius: 10,
        overflow: 'hidden',
        width: '100%',
        height: 50,
        marginBottom: 5,
        marginTop: 5
    },
    linear_button: {
        width: '100%',
        height: '100%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    center_horizontal: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap'
    },
    small_button_container: {
        width: '45%',
        maxWidth: 150,
        height: 30,
        marginBottom: 30
    },
    small_gradient_button: {
        paddingBottom: 3,
        paddingTop: 3
    },
    avatar_container: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#6e28b5',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 20,
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    avatar_big: {
        width: 98,
        height: 98,
        borderRadius: 49,
        resizeMode: 'cover'
    },
    logo_header: {
        width: 40,
        height: 40,
        resizeMode: 'cover'
    },
    back_button: {
        marginLeft: 10,
        width: 20,
        height: 20,
        resizeMode: 'cover'
    },
    user_logo: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderColor: '#6e28b5',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    avatar_small: {
        width: 34,
        height: 34,
        borderRadius: 17,
        resizeMode: 'cover'
    }
});

export default style;