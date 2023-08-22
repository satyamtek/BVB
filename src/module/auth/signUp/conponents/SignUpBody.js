import { View, TextInput, Image, Text, Button, TouchableOpacity, ActivityIndicator, ScrollView, } from 'react-native'
import React, { useState } from 'react';
import { SignUpStyle } from '../SignUpStyle';

export default function SignUpBody({handleFormSubmit }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [loading, setLoading] = useState(false);

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mobileError, setMobileError] = useState('');

    const validateInputs = () => {
        let isValid = true;
        if (firstName.trim() === '') {
            setFirstNameError('First Name is Required');
            isValid = false;
        } else { setFirstNameError(''); }

        if (lastName.trim() === '') {
            setLastNameError("Last Name is required")
            isValid = false;
        } else { setLastNameError(''); }

        if (email.trim() === '') {
            setEmailError("Email is Required");
            isValid = false;
        } else if (!isValidEmail(email)) {
            setEmailError("Invalid email format");
            isValid = false;
        } else { setEmailError(""); }

        if (mobile.trim() === '') {
            setMobileError(' Mobile Number is required');
            isValid = false;
        } else if (!isValidMobile(mobile)) {
            setMobileError("Invalid Mobile Number ");
            isValid = false;
        } else { setMobileError(''); }

        return isValid;
    }

    const isValidEmail = (email) => { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); };
    const isValidMobile = (mobile) => { return /^\d{10}$/.test(mobile); }

    const handleSubmit = async () => {
        if (validateInputs()) {
            setLoading(true); 
            try {
                await handleFormSubmit({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    mobile: mobile,
                });
            } catch (error) {
                console.error('Error submitting form:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    // const inputValues = {
    //     firstName: firstName,
    //     lastName: lastName,
    //     email: email,
    //     mobile: mobile,
    // };

    return (
        <ScrollView>
            <View style={SignUpStyle.from}>
                <Text style={SignUpStyle.registration}>Registration Page </Text>
                <View>
                    <View style={{ margin: 11, marginHorizontal: 21, }}>
                        <TextInput
                            style={SignUpStyle.input} value={firstName}
                            placeholder='Enter Your First Name '
                            onChangeText={text => setFirstName(text)}
                        />
                        {firstNameError ? <Text style={SignUpStyle.errorText}>{firstNameError}</Text> : null}
                        <TextInput
                            placeholder='Enter Your Last Name'
                            style={SignUpStyle.input} value={lastName}
                            onChangeText={text => setLastName(text)}
                        />
                        {lastNameError ? <Text style={SignUpStyle.errorText}>{lastNameError}</Text> : null}
                        <TextInput
                            placeholder='Enter Your Email Address'
                            style={SignUpStyle.input} value={email}
                            onChangeText={text => setEmail(text)}
                        />
                        {emailError ? <Text style={SignUpStyle.errorText}>{emailError}</Text> : null}
                        <TextInput
                            placeholder='Enter Your Mobile Number'
                            style={SignUpStyle.input} value={mobile} maxLength={10}
                            onChangeText={text => setMobile(text)}
                        />
                        {mobileError ? <Text style={SignUpStyle.errorText}>{mobileError}</Text> : null}
                    </View>
                    <TouchableOpacity
                        style={[SignUpStyle.button, loading && SignUpStyle.buttonLoading]}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (<ActivityIndicator color="#ffffff" size="large" />
                        ) : (<Text style={SignUpStyle.buttonText}>Submit</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}