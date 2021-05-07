import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from '../../styles/constants';

const style = StyleSheet.create({
    image_container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    image: {
        width: '100%',
        height: 300,
    },
    info_container: {
        // flex: 1,
        padding: 10,
        flexGrow: 1
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 10,
        alignSelf: 'center',
        textAlign: 'center'
    },
    topic_text: {
        color: PRIMARY_COLOR,
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 5
    },
    regular_text: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: '300'
    }
});

export default style;