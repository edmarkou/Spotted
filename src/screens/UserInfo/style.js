import { StyleSheet } from 'react-native';
import { PLACEHOLDER_COLOR, PRIMARY_COLOR } from '../../styles/constants';

const style = StyleSheet.create({
    info_container: {
        padding: 10,
        flexGrow: 1
    },
    flex: {
        flex: 1
    },
    take_width: {
        width: '100%'
    },
    default_container: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20
    },
    default_container_column: {
        width: '100%',
        marginTop: 20
    },
    avatar_container: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: '#6e28b5',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#fff',
        marginRight: 20
    },
    avatar_big: {
        width: 78,
        height: 78,
        borderRadius: 39,
        resizeMode: 'cover'
    },
    username: {
        fontSize: 20,
        fontWeight: '500',
        color: PRIMARY_COLOR
    },
    firstName: {
        fontSize: 16,
        fontWeight: '500',
        color: PRIMARY_COLOR,
        marginBottom: 5
    },
    type: {
        fontSize: 14,
        fontWeight: '300',
        color: PLACEHOLDER_COLOR,
        marginBottom: 5
    },
    description: {
        fontSize: 13,
        fontWeight: '300',
        marginBottom: 10
    }
});

export default style;