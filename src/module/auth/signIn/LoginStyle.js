import { StyleSheet, } from 'react-native';
import { Border, FontFamily, FontSize, FontWeight } from '../GobleStyle';

export const LoginStyle = StyleSheet.create({
  welcome: { fontSize: 50, fontWeight: FontWeight.size_xs, textAlign: 'center', marginTop: 51, color: '#fff', elevation: 5 },
  img: { width: 'auto', height: 100, marginTop: 45 },
  contaner: { height: '100%', marginTop: 50, backgroundColor: '#fff', },
  title: { fontSize: FontSize.size_xl, fontWeight: FontWeight.size_smi, marginTop: 25,marginBottom:18, letterSpacing: 2, marginLeft:20,textAlign: 'left', },
  signup: { marginRight: '4%', fontSize: FontSize.size_smi, fontWeight: FontWeight.size_xl, color: '#174276', marginTop: 15 },
  input: {
    width: '78%',
    height: 45, fontSize: FontSize.size_smi,
    borderBottomWidth: 1,
    marginBottom: 10,
    marginLeft: 44,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'justify',
  },
  button: {
    // elevation: 4,
    backgroundColor: "#3f85d9",
    borderRadius: Border.br_xl,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '85%', marginLeft: 30,
    marginTop: 7, paddingRight: 30,
    marginRight: 30,height:60,
  },
  buttonText: {
    color: 'white',
    fontWeight: FontWeight.bold,
    textAlign: 'center',marginTop:5,
    fontSize: FontSize.size_mini, 
    fontFamily:FontFamily.outfitSemiBold,
  },
  errorText: {
    color: 'red',
    marginTop: 2,
    marginLeft: 44,
    fontSize: FontSize.size_xs,
  },
  loadingIndicator: {marginTop: 15},
  buttonContainer: {marginTop: 20},
  buttonLoading: {opacity: 0.9},
})
