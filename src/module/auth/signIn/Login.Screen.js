

import { View, Text, SafeAreaView, Alert, TouchableOpacity, Image } from 'react-native';
import * as React from 'react';
import LoginBody from './components/LoginBody';
import { LoginStyle } from './LoginStyle';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../../constants';

export default function LoginScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {return () => setIsLoading(false); },[]);

  const isValidMobileNumber = (number) => {
    const mobileNumberPattern = /^[0-9]{10}$/;
    return mobileNumberPattern.test(number);
  };
  
  const handleUserLogin = async () => {
    setErrorMessage('');
    if(!isValidMobileNumber(loginName)){
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    try {
      const response = await fetch(API_ENDPOINTS.OTP+"/send/"+ loginName, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
      });
      console.log(response.status);
      if (response.status === 200) {
        const result = await response.json();
        navigation.navigate("OTPscreen", { loginName: loginName, data: result.data });
      } else if (response.status === 400) {
        const error = await response.json();
        Alert.alert('Error', error.message);
      } else { Alert.alert('Error', 'Something went wrong. Try again'); }
    } catch (error) { console.error(error);
      Alert.alert('Error', 'Something went wrong. Try again');
      setIsLoading(false);
    }
  };

  return (
    <View style={{ backgroundColor: '#174276' }}>
      <Text style={LoginStyle.welcome}>WELCOME!</Text>
      <Image source={require('../../../assets/logo-without-background.png')} style={LoginStyle.img} />
      <SafeAreaView style={LoginStyle.contaner}>
        <Text style={LoginStyle.title}>Login To Continue</Text>
        <View>
          <LoginBody
            setLoginName={setLoginName}
            onSubmit={handleUserLogin}
            errorMessage={errorMessage}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')} style={{ flexDirection: 'row-reverse', margin: 11, }}>
          <Text style={LoginStyle.signup}>Registration   </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
};

