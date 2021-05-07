import { StyleSheet } from 'react-native';
import { PLACEHOLDER_COLOR, PRIMARY_COLOR } from '../../styles/constants';

const style = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        margin: 0,
        flex: 1,
    },
    content: {
        backgroundColor: 'white',
        width: '80%',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
        fontSize: 20,
        color: PRIMARY_COLOR,
        fontWeight: '400',
        marginBottom: 12,
        textAlign: 'center'
    },
});

export default style;