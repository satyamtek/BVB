import { StyleSheet, } from 'react-native';
import { Border, Color, FontFamily, } from '../GobleStyle';

export const OTPstyle = StyleSheet.create({
    submitOtp: {
        backgroundColor: Color.darkslategray,
        width: "100%",
        overflow: "hidden",
    },
    input: {
        margin: 1, marginBottom: 10, marginLeft: 10,
        borderRadius: Border.br_3xs,
        borderWidth: 1,
        borderColor: Color.black,
        height: 45, width: 41,
        justifyContent: 'space-between', fontSize: 21, fontWeight: '700',
        left: 40,
        fontFamily: FontFamily.outfitRegular,
        color: Color.black,
        // fontSize: FontSize.size_mini,
        textAlign: 'center', alignItems: 'center',
    },
    button: {
        elevation: 8,
        backgroundColor: "#3f85d9",
        borderRadius: Border.br_3xs,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 300, marginLeft: 50,
        marginTop: 11, paddingRight: 30,
        marginRight: 30, height: 60,
    },
    buttonText: {
        color: Color.white,
        fontSize: 20, marginTop: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorText: {
        color: Color.red,
        fontSize: 12,
        textAlign: 'center',
    },
    title: {
        fontSize: 26, fontWeight: '600',
        marginTop:21, marginBottom: 25,
        textAlign: 'center',
    },
    welcome: {
        fontSize: 50, fontWeight: '400',
        textAlign: 'center', marginTop: 36,
        elevation: 5, color: Color.white,
    },
    contener: { height: '100%', marginTop: '10%', },
    img: { width: 'auto', height: 90, marginTop: 27, marginBottom:17,  },
})