import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        textAlign: 'center',
        backgroundColor: 'tomato',
        padding: 8,
        borderRadius: 10,
        marginTop: 10,
        zIndex: 99,
    },
    buttontext: {
        color: 'white',
        fontSize: 16,
    },
    picker: {
        marginTop: -40,
        zIndex: -1,
        transform: [
            { scaleX: 0.85 }, 
            { scaleY: 0.85 },
        ],
    }
});

export default styles;
