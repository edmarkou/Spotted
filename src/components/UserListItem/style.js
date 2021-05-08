import { StyleSheet } from 'react-native';
import { PLACEHOLDER_COLOR, PRIMARY_COLOR } from '../../styles/constants';

const style = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 10,
        paddingBottom: 5
    },
    avatarContainer: {
        borderRadius: 21,
        width: 41,
        height: 41,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        overflow: 'hidden',
        marginRight: 20
    },
    avatar: {
        borderRadius: 20,
        width: 40,
        height: 40,
        resizeMode: 'cover'
    },
    textContainer: {
        flex: 1
    },
    button: {
        flex: 1,
        height: 40
    },
    username: {
        color: PRIMARY_COLOR,
        fontSize: 16,
        fontWeight: '400'
    },
    name: {
        color: PLACEHOLDER_COLOR,
        fontSize: 12,
        fontWeight: '300'
    },
    button_text: {
        fontSize: 16
    }
});

export default style;