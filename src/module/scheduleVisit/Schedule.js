import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { API_ENDPOINTS } from '../../constants';
import { ScheduleVisitStyle } from './scheduleVisitStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScheduleVisitBody } from './components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';


const ScheduleVisit = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [radioValue, setRadioValue] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState(null);
  const [showRadioOptions, setShowRadioOptions] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const radioOptions = [
    { label: 'Accept', value: 'accept' },
    { label: 'Deny', value: 'deny' },
  ];


  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDateField === 'fromDate') {
      setFromDate(selectedDate || fromDate);
    } else {
      setToDate(selectedDate || toDate);
    }
  };

  const showDatepicker = (field) => {
    setSelectedDateField(field);
    setShowDatePicker(true);
  };

  const handleRadioToggle = () => {
    setShowRadioOptions(!showRadioOptions);
  };

  const handleRadioSelect = (value) => {
    setRadioValue(value);
    // setShowRadioOptions(false);
  };

  const handleSubmit = () => {
    const filterData = {
      fromDate: fromDate.toISOString(),
      toDate: toDate.toISOString(),
      radioValue: radioValue,
    };
    console.log('Submitted data:', filterData);
  };

  // const [modalVisible, setModalVisible] = useState(false);
  // const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  // const [selectedToDate, setSelectedToDate] = useState(new Date());
  // const [acceptDeny, setAcceptDeny] = useState('accept');
  // const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  // const [showToDatePicker, setShowToDatePicker] = useState(false);

  // const handleFromDateChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || selectedFromDate;
  //   setShowFromDatePicker(false);
  //   setSelectedFromDate(currentDate);
  // };
  // const handleToDateChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || selectedToDate;
  //   setShowToDatePicker(false);
  //   setSelectedToDate(currentDate);
  // };

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

  useEffect(() => { if (token) { scheduleAPI(token); } }, [token]);

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

  // const Radio = ({ selected, onPress }) => (
  //   <TouchableOpacity onPress={onPress} style={{ marginHorizontal: 5 }}>
  //     <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
  //       {selected && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'black' }} />}
  //     </View>
  //   </TouchableOpacity>
  // );


  return (
    <SafeAreaView style={ScheduleVisitStyle.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 36, fontWeight: '600', margin: 16, textAlign: 'center' }}>Schedule Visit</Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate("Filter")}> */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="filter" size={60} color="#ff80d5" />
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginTop: 21 }}>

          <View style={styles.radioContainer}>
            {(
              <View style={styles.radioOptions}>
                {radioOptions.map((option, index) => (
                  <RadioButton.Item
                    key={index}
                    label={option.label}
                    value={option.value}
                    status={radioValue === option.value ? 'checked' : 'unchecked'}
                    onPress={() => handleRadioSelect(option.value)}
                  />
                ))}
              </View>
            )}
          </View>
          <Text style={{ fontSize: 21, right: 0 }}>Created At Date</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <View style={{ margin: 11, }}>
              <TouchableOpacity onPress={() => showDatepicker('toDate')}>
                <Text>From Date:</Text>
                <Text> {toDate.toDateString()}</Text>
              </TouchableOpacity>
            </View>

            <View style={{ margin: 11, }}>
              <TouchableOpacity onPress={() => showDatepicker('fromDate')}>
                <View style={{ borderRadius: 11, borderColor: '#001a1a' }}>

                  <Text>To Date: </Text>
                  <Text>{fromDate.toDateString()}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </Modal>
      {/* <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <TouchableOpacity onPress={() => setShowFromDatePicker(true)}>
            <Text>Select From Date: {selectedFromDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showFromDatePicker && (
            <DateTimePicker
              value={selectedFromDate}
              mode="date"
              display="default"
              onChange={handleFromDateChange}
            />
          )}
          <TouchableOpacity onPress={() => setShowToDatePicker(true)}>
            <Text>Select To Date: {selectedToDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showToDatePicker && (
            <DateTimePicker
              value={selectedToDate}
              mode="date"
              display="default"
              onChange={handleToDateChange}
            />
          )}
        </View>
      </Modal> */}


      <ScheduleVisitBody data={data} loading={loading} refreshing={refreshing} onRefresh={onRefresh} />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 21,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  radioContainer: {
    marginTop: 20,
  },
  radioOptions: {
    flexDirection: 'row'
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#ccffff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginRight: 21,
  },
  submitButton1: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 21,
  },
});
export default ScheduleVisit;


