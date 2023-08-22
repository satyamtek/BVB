

import { View, SafeAreaView, Text, Alert, Image } from 'react-native';
import { SignUpBody } from './conponents';
import { API_ENDPOINTS } from '../../../constants';
import { SignUpStyle } from './SignUpStyle';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';


const SignUpScreen = ({ navigation }) => {
  const handleFormSubmit = async (inputValues,) => {
    console.log(inputValues)
    try {
      const response = await fetch(API_ENDPOINTS.Registration,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify(inputValues),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        console.log("DATA ", data)
        showMessage({
          message: 'OTP Verified',
          type: 'success',
          duration: 5000,
        });
        navigation.navigate('LoginScreen');
      } else if (response.status === 400) {
        const error = await response.json();
        Alert.alert('Error', error.message);
      } else { Alert.alert('Error', 'Something went wrong. Try again') }
    } catch (error) {Alert.alert('Error', 'Something went wrong. Try again');
    }
  }

  return(
    <SafeAreaView>
      <View style={{backgroundColor:'#174376'}}>
        <FlashMessage position='top'/>
        <Text style={SignUpStyle.welcome}> WELCOME! </Text>
        <Image source={require('../../../assets/logo-without-background.png')} style={SignUpStyle.img}/>
      </View>
      <View>
        <SignUpBody handleFormSubmit={handleFormSubmit} />
      </View>
    </SafeAreaView>
  )
};
export default SignUpScreen;



