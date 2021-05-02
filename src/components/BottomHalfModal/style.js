import { StyleSheet } from 'react-native';
import { PLACEHOLDER_COLOR, PRIMARY_COLOR } from '../../styles/constants';

const style = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        margin: 0,
        flex: 1,
    },
    view: {
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingBottom: 30,
        backgroundColor: '#fff',
        flexDirection: 'column',
        maxHeight: '75%'
    },
    scrollview: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10
    },
    notch: {
        alignSelf: 'center',
        width: 40,
        height: 6,
        borderRadius: 3,
        marginTop: 10,
        marginBottom: 10
    },
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
        fontWeight: "400"
    }
});

export default style;