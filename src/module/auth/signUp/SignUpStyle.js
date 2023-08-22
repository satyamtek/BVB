import { StyleSheet, } from 'react-native';
import { Border, FontSize, FontWeight } from '../GobleStyle';

export const SignUpStyle = StyleSheet.create({
    welcome: { fontSize: FontSize.size_title, fontWeight: FontWeight.size_xs, textAlign: 'center', marginTop: 35, color: '#fff', elevation: 5 },
    registration: { fontSize: FontSize.size_mini, fontWeight: FontWeight.size_xl, marginTop: 10, marginBottom: 10, textAlign: 'center', marginLeft: 26, },
    from: { flex: 2, paddingTop: 20, paddingBottom: 60, position: 'relative' },
    img: { width: 'auto', height: 100, marginTop: 22, marginBottom: 11, },
    contaner: { height: '100%', marginTop: 50, backgroundColor: '#fff', },
    title: { fontSize: FontSize.size_mini, fontWeight: FontWeight.size_xl, marginTop: 25, marginBottom: 18, letterSpacing: 2, marginLeft: 20, textAlign: 'left', },
    signup: { marginRight: '4%', fontSize: FontSize.size_smi, fontWeight: FontWeight.size_xl, color: '#174276', marginTop: 15 },
    input: {
        width: '90%',
        height: 40,
        borderBottomWidth: 1,
        marginBottom: 15,
        marginLeft: 15,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'justify',
    },
    button: {
        backgroundColor: "#3f85d9",
        borderRadius: Border.br_xl,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: '85%', marginLeft: 30,
        marginTop: 7,
        marginRight: 30,height:50,
      },
      buttonText: {
        color: 'white',
        fontSize: FontSize.size_smi, 
        fontWeight: FontWeight.bold,
        textAlign: 'center',
      },
    errorText: {
        color: 'red',
        fontSize: FontSize.size_xs,
        marginTop: 2,
        marginLeft: 44,
    },
    loadingIndicator: { marginTop: 15 },
    buttonContainer: { marginTop: 20 },
    buttonLoading: { opacity: 0.9 },
})
