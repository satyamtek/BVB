
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Modal, Pressable, Button } from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [showRadioOptions, setShowRadioOptions] = useState(false);
  const [radioValue, setRadioValue] = useState(null);
  const [toDate, setToDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState(null);
console.log('data responce ',data)
  const radioOptions = [
    { label: 'Accept', value: '1' },
    { label: 'Deny', value: '0' },
  ];
  const handleRadioSelect = (value) => {
    setRadioValue(value);
    // setShowRadioOptions(false);
  };

  const handleRadioToggle = () => { setShowRadioOptions(!showRadioOptions); };

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
    const st = new Date();
    st.setHours(0, 0, 0, 0);
    const et = new Date();
    et.setDate(et.getDate() + 1);
    et.setHours(0, 0, 0, 0);
    const compare = { between: [st.toISOString(), et.toISOString()] };
    const filter = {
      where: {
        and:
          radioValue != null ? [{ isAccepted: radioValue },
          {
            date: {
              between: [
                `${fromDate.toISOString()}`,
                `${toDate.toISOString()}`
              ]
            }
          }] : [{
            date: {
              between: [
                `${fromDate.toISOString()}`,
                `${toDate.toISOString()}`
              ]
            }
          }
          ]
      },
      include: [
        { "relation": "cprmUser", "scope": { "fields": { "id": true, "firstName": true, "lastName": true, "fullName": true } } },
        {
          "relation": "cpUser",
          "scope": {
            "fields": {
              "id": true,
            }
          }
        },
        {
          "relation": "assigned",
          "scope": {
            "fields": {
              "id": true,
              "fullName": true
            }
          }
        },
        {
          "relation": "createdByUser",
          "scope": {
            "fields": {
              "id": true,
              "fullName": true,
              "firstName": true,
              "lastName": true
            }
          }
        },
        {
          "relation": "contact",
          "scope": {
            "fields": {
              "id": true,
              "firstName": true,
              'lastName': true,
              "fullName": true
            }
          }
        },
        {
          "relation": "property"
        }
      ],
    };
    try {
      console.log(111,API_ENDPOINTS.ScheduleVisit + JSON.stringify(filter))

      const response = await fetch(API_ENDPOINTS.ScheduleVisit + JSON.stringify(filter), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      const result = await response.json();
      setData(result);
      console.log("result  \n", result)
    } catch (error) { console.error('Error fetching data:', error); }
    finally { setLoading(false); }
  };

  // return this.propertyScheduleRepository.find({
  //   include: [
  //     { relation: 'cprmUser', scope: { fields: { id: true, firstName: true, lastName: true, fullName: true } } },
  //     { relation: 'cpUser', scope: { fields: { id: true } } },
  //     { relation: 'assigned', scope: { fields: { id: true, fullName: true } } },
  //     {
  //       relation: 'createdByUser',
  //       scope: { fields: { id: true, fullName: true, firstName: true, lastName: true } },
  //     },
  //     {
  //       relation: 'contact',
  //       scope: { fields: { id: true, firstName: true, lastName: true, fullName: true } },
  //     },
  //     { relation: 'property' },
  //   ],
  // });


  // const filterData = () => {
  //   const st = new Date();
  //   st.setHours(0, 0, 0, 0);
  //   const et = new Date();
  //   et.setDate(et.getDate() + 1);
  //   et.setHours(0, 0, 0, 0);
  //   const compare = { between: [st.toISOString(), et.toISOString()] };
  //   return this.propertyScheduleRepository.find({
  //     include: [
  //       { "relation": "cprmUser", "scope": { "fields": { "id": true, "firstName": true, "lastName": true, "fullName": true } } },
  //       {
  //         "relation": "cpUser",
  //         "scope": {
  //           "fields": {
  //             "id": true,
  //           }
  //         }
  //       },
  //       {
  //         "relation": "assigned",
  //         "scope": {
  //           "fields": {
  //             "id": true,
  //             "fullName": true
  //           }
  //         }
  //       },
  //       {
  //         "relation": "createdByUser",
  //         "scope": {
  //           "fields": {
  //             "id": true,
  //             "fullName": true,
  //             "firstName": true,
  //             "lastName": true
  //           }
  //         }
  //       },
  //       {
  //         "relation": "contact",
  //         "scope": {
  //           "fields": {
  //             "id": true,
  //             "firstName": true,
  //             'lastName': true,
  //             "fullName": true
  //           }
  //         }
  //       },
  //       {
  //         "relation": "property"
  //       }
  //     ],
  //   });
  // }


  return (
    <SafeAreaView style={ScheduleVisitStyle.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 36, fontWeight: '600', margin: 16, textAlign: 'center' }}>Schedule Visit</Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
          <Icon name="filter" size={60} color="#ff80d5" />
        </TouchableOpacity> */}
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Icon name="filter" size={60} color="#ff80d5" />
        </Pressable>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
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

              {/* CALENDER CODE  */}
              <Text style={{ fontSize: 21, right: 0 }}>Created At Date</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 11 }}>
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

              {showDatePicker && (
                <DateTimePicker
                  value={selectedDateField === 'fromDate' ? fromDate : toDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={()=>[scheduleAPI, setModalVisible(false)]}>
                  {/* onPress={() => setModalVisible(!modalVisible)}> */}
                  <Text style={styles.textStyle}>Submit</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Icon name="filter" size={60} color="#ff80d5" />
        </Pressable>
      </View>

      <ScheduleVisitBody data={data} loading={loading} refreshing={refreshing} onRefresh={onRefresh} />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,

  },
  modalView: {
    width: '80%', height: '60%',
    margin: '21%',
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 23,
  },
  buttonOpen: {
    // backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ScheduleVisit;


