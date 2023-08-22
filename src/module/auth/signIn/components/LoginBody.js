
import React, { useState } from 'react';
import { View, TextInput, ActivityIndicator, TouchableOpacity,Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginStyle } from '../LoginStyle';

export default function Form({ setLoginName, onSubmit, errorMessage  }) {
  const [loading, setLoading] = useState(false);

  const handleLoginNameChange = (text) => {setLoginName(text);};
 
  const handleLogin = async () => {
    setLoading(true);
    try { await onSubmit();
    } catch (error) { console.error('API Error:', error);
    } finally {  setLoading(false);   }
  };

  return (
    <SafeAreaView keyboardDismissMode="interactive">
      <TextInput
        style={LoginStyle.input}
        onChangeText={handleLoginNameChange}
        placeholder="Enter Your Mobile Number"
        returnKeyType="next"
        blurOnSubmit={false}
        maxLength={10}
        keyboardType="numeric"
        underlineColorAndroid="transparent"
      />
     {errorMessage && <Text style={LoginStyle.errorText}>{errorMessage}</Text>}
          <View style={LoginStyle.buttonContainer}>
        <TouchableOpacity
          style={[LoginStyle.button, loading && LoginStyle.buttonLoading]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? ( <ActivityIndicator color="#ffffff" size="large" />
          ) : ( <Text style={LoginStyle.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>
         </View>
    </SafeAreaView>
  );
}

