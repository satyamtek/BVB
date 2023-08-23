import { } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import SignUpScreen from '../module/auth/signUp/SignUp.Screen';
import LoginScreen from '../module/auth/signIn/Login.Screen';
import ScheduleVisit from '../module/scheduleVisit/Schedule';
import OTPscreens from '../module/auth/otp/OTP.screen';
import Filter from '../module/scheduleVisit/Filter';
// import { State } from 'react-native-gesture-handler';


const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="LoginScreen" >   */}
      <Stack.Navigator  >
      <Stack.Screen
          name="ScheduleVisit"
          component={ScheduleVisit}
        />
        <Stack.Screen
          name='LoginScreen'
          component={LoginScreen}
          options={{ headerShown: false }} />

        <Stack.Screen
          name='OTPscreen'
          component={OTPscreens} options={{
            title: '   OTP ',
            headerStyle: { backgroundColor: '#174296', },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold', },
          }} />
        {/* <Stack.Screen
          name="ScheduleVisit"
          component={ScheduleVisit}
        /> */}
        <Stack.Screen
          name='Filter'
          component={Filter}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='SignUpScreen'
          component={SignUpScreen}
          options={{
            title: 'Registration',
            headerStyle: { backgroundColor: '#174296', height: 44, },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold', },
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}



