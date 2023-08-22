
import { View, Image, Text, TextInput, TouchableOpacity  } from 'react-native'
import React, { useState, useRef } from 'react';
import { OTPstyle } from '../OTPstyle';

export default function OTPBody({ handleFormSubmit, }) {
    const inputRef = useRef([]);
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [apiErrorMessage, setApiErrorMessage] = useState('');

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

    // const validateOtp = () => {
    //     if (otp.length !== 6) {
    //         setError('Please enter a valid 6-digit OTP');
    //         return false;
    //     } else { setError('');return true;
    //     }
    // };

    // const handleOtpSubmitSS = async () => {
    //     if (validateOtp()) {
    //         const apiResponse = await handleOtpSubmit(otp);
    //         if (apiResponse && !apiResponse.isSuccess) {
    //             setApiErrorMessage(apiResponse.message);
    //         } else {
    //             setApiErrorMessage('');
    //         }
    //     }
    // };

    const handleOtpSubmit = () => { if (validateOtp()) { handleOtpSubmit(otp);}};

    return (
        <View style={{backgroundColor:'#174376'}}>
            <Text style={{ fontSize: 50, fontWeight: '400', textAlign: 'center', marginTop: 25,  elevation: 5 }}>WELCOME!</Text>
            <Image source={require('../../../../assets/logo-without-background.png')} style={{ width: 'auto', height: 100, marginTop: 40 }} />
            <View style={{ height: '90%', marginTop: '10%',backgroundColor:'#fff'  }}>
                <Text style={{ fontSize: 21, fontWeight: '600', marginTop: 40, marginBottom: 30, textAlign: 'center', }}>Enter YOUR OTP </Text>
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
                     {error ? <Text style={OTPstyle.errorText}>{error}</Text> : null}
                     {error ? <Text style={OTPstyle.errorText}>{apiErrorMessage}</Text> : null}
                </View>
                <TouchableOpacity style={OTPstyle.button} onPress={handleFormSubmit}>
                {/* <Button onPress={handleFormSubmit} title="Submit " color={'white'} /> */}
                    <Text style={OTPstyle.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

