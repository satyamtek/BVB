import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS } from '../../constants';

const Filter = ({ navigation, route }) => {
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [radioValue, setRadioValue] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDateField, setSelectedDateField] = useState(null);
    const [showRadioOptions, setShowRadioOptions] = useState(false);
    const [data, setData] = useState(null);
    const [token, setToken] = useState(null);
    // console.log(data)
    
    const radioOptions = [
        { label: 'Accept', value: '1' },
        { label: 'Deny', value: '0' },
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
    const handleSubmits = () => {
        const filterData = {
            fromDate: fromDate.toISOString(),
            toDate: toDate.toISOString(),
            radioValue: radioValue,
        };
        console.log('Submitted data:', filterData);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                setToken(storedToken);
                if (storedToken) {
                    handleSubmit(storedToken);
                }
            } catch (error) { console.error(error); }
        };
        fetchData();
        // const interval = setInterval(fetchData, 900000);
        // return () => clearInterval(interval);
    
    }, []);

    // const handleSubmit = async (token) => {
    //     const filterData = {
    //         fromDate: fromDate.toISOString(),
    //         toDate: toDate.toISOString(),
    //         radioValue: radioValue,
    //     };
    //     console.log('Header value sent in filter get api ', filterData)
    //     try {
    //         const response = await fetch(API_ENDPOINTS.FilterVisitSchedule, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: 'Bearer ' + token,
    //                 'From-Date': filterData.fromDate,
    //                 'To-Date': filterData.toDate,
    //                 'Radio-Value': filterData.radioValue,
    //             },
    //         });
    //         const result = await response.json();
    //         //   console.log('result  ',result)
    //         setData(result);
    //     } catch (error) { console.error('Error fetching data:', error); }
    // };

    useEffect(() => { if (token) { handleSubmit(token); } }, [token]);
    const handleSubmit = async () => {
        // Construct the query parameters
        // const queryParams = new URLSearchParams({
            const filter=({
          fromDate: fromDate.toISOString(),
          toDate: toDate.toISOString(),
          isAccepted: radioValue,
        });
        
        try {
          const storedToken = await AsyncStorage.getItem('token');
          setToken(storedToken);
      
          if (storedToken) {
            console.log(API_ENDPOINTS.FilterVisitSchedule+JSON.stringify(filter))
            // const response = await fetch(`${API_ENDPOINTS.FilterVisitSchedule}${queryParams}`, {
            const response = await fetch(API_ENDPOINTS.FilterVisitSchedule+JSON.stringify(filter), {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + storedToken,
              },
            });
      
            if (response.ok) {
              const result = await response.json();
              setData(result);
              console.log(token)
            } else {
              // Handle error case
              console.error('API call failed:', response.status, response.statusText);
            }
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      

    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>

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

                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDateField === 'fromDate' ? fromDate : toDate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}

                    <View style={{ flexDirection: 'row', margin: 11, }}>
                        {/* <TouchableOpacity style={styles.submitButton} onPress={() => { handleSubmit(); setIsModalVisible(false); }}> */}
                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text>Submit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.submitButton1} onPress={() => navigation.navigate('ScheduleVisit')}>
                            {/* <TouchableOpacity style={styles.submitButton1} onPress={() => { setIsModalVisible(false) }}> */}
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    );
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

export default Filter




/*
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { RadioButton, Text, Button, TextInput } from 'react-native-paper';
// import Icon from 'react-native-paper/lib/typescript/components/Icon';
import Icon from 'react-native-vector-icons/FontAwesome';
const Filter = () => {
    const [selectedRange, setSelectedRange] = useState({});
    const [selectedRadioButton, setSelectedRadioButton] = useState('option1');
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);

    const handleDateSelect = (date) => {
        if (Object.keys(selectedRange).length === 2) {
            setSelectedRange({ [date.dateString]: { selected: true } });
        } else if (Object.keys(selectedRange).length === 1) {
            const [start, end] = Object.keys(selectedRange);
            if (date.dateString < start) {
                setSelectedRange({ [date.dateString]: { selected: true, startingDay: true } });
            } else {
                setSelectedRange({ ...selectedRange, [date.dateString]: { selected: true, endingDay: true } });
            }
        } else {
            setSelectedRange({ [date.dateString]: { selected: true, startingDay: true } });
        }
    };

    const handleRadioButtonChange = (value) => {
        setSelectedRadioButton(value);
    };

    const handleDropdownPress = () => {
        setIsCalendarVisible(!isCalendarVisible)
    };

    const handleCalendarDayPress = (day) => {
        handleDateSelect({ dateString: day.dateString });
        setIsCalendarVisible(false);
    };

    const handleSubmit = () => {
        console.log(selectedRange);
        console.log(selectedRadioButton);
    };

    return (
        <View style={styles.container}>

            <Text style={styles.header}>Filter</Text>
            <View style={styles.imageStyle}>

                <Icon name="calendar" size={60} color="#ff80d5" />
            </View>
            <TextInput
                label="Created At Date"
                value={Object.keys(selectedRange).join(' - ')}
                onTouchStart={handleDropdownPress}
            />
            {isCalendarVisible && (
                <Calendar
                    onDayPress={handleCalendarDayPress}
                    markedDates={selectedRange}
                    markingType="period"
                    current={Date()}
                />
            )}
            <RadioButton.Group
                onValueChange={handleRadioButtonChange}
                value={selectedRadioButton}
            >
                <RadioButton.Item label="Accepted" value="Accept" />
                <RadioButton.Item label="Deny" value="Deny" />
            </RadioButton.Group>
            <Button mode="contained" onPress={handleSubmit}>
                Submit
            </Button>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    imageStyle: {
        // padding: 10,
        // margin: 5,
        // height: 25,
        // width: 25,
        // resizeMode: 'stretch',
        // alignItems: 'center',
    },
    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 40,
        borderRadius: 5,
        margin: 10,
    },
});
export default Filter;
*/

