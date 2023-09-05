import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Image, Text, Button, View, TextInput, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Color, FontFamily } from '../GobleStyle';
import { OTPstyle } from './OTPstyle';
import { API_ENDPOINTS } from '../../../constants';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';


const OTPscreens = ({ route, navigation }) => {
    const { loginName, data } = route.params;
    const [storedLoginName, setStoredLoginName] = useState('');
    const [storedData, setStoredData] = useState(null);
    const inputRef = useRef([]);
    const [otp, setOtp] = React.useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setStoredLoginName(loginName);
        setStoredData(data);
    }, []);

    const handleOtpChange = (text, index) => {
        const newOtp = otp.split('');
        newOtp[index] = text;
        setOtp(newOtp.join(''));
        if (text && index < inputRef.current.length - 1) {
            inputRef.current[index + 1].focus();
        }
    };

    const handleOtpKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0) {
            const newOtp = otp.split('');
            newOtp[index - 1] = '';
            setOtp(newOtp.join(''));
            inputRef.current[index - 1].focus();
        }
    };

    const handleFormSubmit = async () => {
        if (otp.length !== 6) {
            Alert.alert('Error', 'Please enter a 6-digit OTP.');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(API_ENDPOINTS.OTP + `/Appverify/${storedData}/${otp}/91-${storedLoginName}`, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200) {
                const responseData = await response.json();
                console.log(responseData.message);
              console.log(responseData)
                try {          
                    const id = responseData.data.user.id;
                    const token = responseData.data.token;
                    await AsyncStorage.setItem('ID', id);
                    await AsyncStorage.setItem('token', token);
                    showMessage({
                        message: 'OTP Verified',
                        type: 'success',
                        duration: 5000,
                    });
                    console.log(data)
                    navigation.navigate('ScheduleVisit', { token: token });
                    
                } catch (e) {
                    const errorMessage = responseData.error.message || '   OTP Time out  ';
                    Alert.alert(errorMessage);
                }
            } else if (response.status === 400) {
                const error = await response.json();
                Alert.alert('Error', error.message);
            } else {  Alert.alert('Error', 'Something went wrong. Try again');}
        } catch (error) { Alert.alert('Error', 'Network error. Try again');
        } finally { setLoading(false);
        }
    };

    return (
        <SafeAreaView>
            <View style={{ backgroundColor: '#174276' }}>
            <FlashMessage position="bottom" />
                <Text style={OTPstyle.welcome}>WELCOME!</Text>
                <Image source={require('../../../assets/logo-without-background.png')} style={OTPstyle.img} />
            </View>
            <View style={OTPstyle.contener}>
                <Text style={OTPstyle.title}>Enter YOUR OTP </Text>
                <View style={{ flexDirection: 'row' }}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <TextInput
                            key={index}
                            style={[OTPstyle.input]}
                            keyboardType="numeric"
                            maxLength={1}
                            value={otp[index] || ''}
                            onChangeText={(text) => handleOtpChange(text, index)}
                            onKeyPress={(e) => handleOtpKeyPress(e, index)}
                            ref={(ref) => (inputRef.current[index] = ref)} />
                    ))}
                </View>
                <TouchableOpacity
                    style={OTPstyle.button}
                    onPress={handleFormSubmit}
                    disabled={loading}
                >
                    {loading ? (<ActivityIndicator size="large" color="white" /> // Show loading indicator while loading
                    ) : (<Text style={OTPstyle.buttonText}>SUBMIT</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default OTPscreens;
