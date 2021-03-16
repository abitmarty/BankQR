import { Platform, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        textAlign: 'center',
        backgroundColor: 'tomato',
        padding: 8,
        borderRadius: 5,
        marginTop: 10,
        zIndex: 99,
    },
    buttontext: {
        color: 'white',
        fontSize: 15,
    },
    picker: {
        marginTop: (Platform.OS === 'ios') ? -60 : 0,
        zIndex: -1,
        transform: [
            { scaleX: 0.80 }, 
            { scaleY: 0.80 },
        ],
    }
});

export default styles;
