import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import AppNavigation from './src/navigation/AppNavigation'
import Filter from './src/module/scheduleVisit/Filter'

export default function App() {
  return (<View style={{flex:1}}>
    <StatusBar backgroundColor={'#174376'} />
    <AppNavigation />
  </View>
  )
}