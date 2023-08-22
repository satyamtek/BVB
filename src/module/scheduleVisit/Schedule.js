import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, RefreshControl, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { API_ENDPOINTS } from '../../constants';
import moment from 'moment';
import { ScheduleVisitStyle } from './scheduleVisitStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScheduleVisitBody } from './components';



const ScheduleVisit = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [token, setToken] = useState(null);
  const [openItemId, setOpenItemId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      if (token) {
        await scheduleAPI(token);
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
        if (storedToken) {
          scheduleAPI(storedToken);
        }
      } catch (error) { console.error(error); }
    };
    fetchData();
    const interval = setInterval(fetchData, 900000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (token) { scheduleAPI(token); }
  }, [token]);

  const scheduleAPI = async (token) => {
    try {
      const response = await fetch(API_ENDPOINTS.ScheduleVisit, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      const result = await response.json();
      setData(result);
    } catch (error) { console.error('Error fetching data:', error); }
    finally { setLoading(false); }
  };

  // const handleHeaderPress = (item) => {
  //   setSelectedItem(item.propertyCode === selectedItem?.propertyCode ? null : item);
  // };

  // const toggleItem = (itemId) => {
  //   if (openItemId === itemId) {
  //     setOpenItemId(null);
  //   } else { setOpenItemId(itemId); }
  // };

  // const EVisitStatus = {
  //   Created: 12,
  //   Pending: 1,
  //   'Follow Up': 2,
  //   'Visit in Progress': 3,
  //   Rescheduled: 4,
  //   'Not Interested': 5,
  //   Done: 6,
  //   'Owner denied': 9,
  //   'Tenant denied': 10,
  //   'CP denied': 11,
  //   Close: 13,
  // }
  // const scheduleVisit = { 'run-time': 1, pending: 2 }
  // function getKeyByValue(enumObject, value) { return Object.keys(enumObject).find((key) => enumObject[key] === value) }

  return (
    <SafeAreaView style={ScheduleVisitStyle.container}>
      <ScheduleVisitBody data={data} loading={loading} refreshing={refreshing} onRefresh={onRefresh} />
    </SafeAreaView>
  )
};
export default ScheduleVisit;


