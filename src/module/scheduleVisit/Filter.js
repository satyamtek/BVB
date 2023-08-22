// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Platform, Modal } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { RadioButton } from 'react-native-paper';


// const Filter = ({ navigation, route }) => {
//     const [fromDate, setFromDate] = useState(new Date());
//     const [toDate, setToDate] = useState(new Date());
//     const [radioValue, setRadioValue] = useState(null);
//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const [selectedDateField, setSelectedDateField] = useState(null);
//     const [showRadioOptions, setShowRadioOptions] = useState(false);
//     const [isModalVisible, setIsModalVisible] = useState(false);

//     const radioOptions = [
//         { label: 'Accept', value: 'accept' },
//         { label: 'Deny', value: 'deny' },
//     ];

//     const handleDateChange = (event, selectedDate) => {
//         setShowDatePicker(Platform.OS === 'ios');
//         if (selectedDateField === 'fromDate') {
//             setFromDate(selectedDate || fromDate);
//         } else {
//             setToDate(selectedDate || toDate);
//         }
//     };

//     const showDatepicker = (field) => {
//         setSelectedDateField(field);
//         setShowDatePicker(true);
//     };

//     const handleRadioToggle = () => {
//         setShowRadioOptions(!showRadioOptions);
//     };

//     const handleRadioSelect = (value) => {
//         setRadioValue(value);
//         // setShowRadioOptions(false);
//     };
//     const handleSubmit = () => {
//         const filterData = {
//             fromDate: fromDate.toISOString(),
//             toDate: toDate.toISOString(),
//             radioValue: radioValue,
//         };

//         console.log('Submitted data:', filterData);
//     };

//     return (
//         <View style={styles.modalContainer}>
//             {/* <TouchableOpacity onPress={() => setIsModalVisible(true)}>
//                 <Text>Open Filter</Text>
//             </TouchableOpacity> */}

//             {/* <Modal
//                 visible={isModalVisible}
//                 animationType="slide"
//                 transparent={false}
//                 onRequestClose={() => setIsModalVisible(false)}
//             > */}
//             <View style={styles.modalContainer}>
//                 <View style={styles.modalView}>

//                     <View style={styles.radioContainer}>
//                         {/* <TouchableOpacity onPress={handleRadioToggle}>
//                             <Text>Select an Option</Text>
//                         </TouchableOpacity> */}
//                         {/* {showRadioOptions && ( */}
//                         {(
//                             <View style={styles.radioOptions}>
//                                 {radioOptions.map((option, index) => (
//                                     <RadioButton.Item
//                                         key={index}
//                                         label={option.label}
//                                         value={option.value}
//                                         status={radioValue === option.value ? 'checked' : 'unchecked'}
//                                         onPress={() => handleRadioSelect(option.value)}
//                                     />
//                                 ))}
//                             </View>
//                         )}
//                     </View>

//                     {/* <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}> */}
//                     <Text style={{ fontSize: 21, right: 0 }}>Created At Date</Text>
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
//                         <View style={{ margin: 11, }}>
//                             <TouchableOpacity onPress={() => showDatepicker('toDate')}>
//                                 <Text>From Date:</Text>
//                                 {/* <Text> {fromDate.toDateString()}</Text> */}
//                             </TouchableOpacity>
//                         </View>

//                         <View style={{ margin: 11, }}>
//                             <TouchableOpacity onPress={() => showDatepicker('fromDate')}>
//                                 <View style={{ borderRadius: 11, borderColor: '#001a1a' }}>

//                                     <Text>To Date: </Text>
//                                     {/* <Text>{toDate.toDateString()}</Text> */}
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                     {/* </View> */}

//                     {showDatePicker && (
//                         <DateTimePicker
//                             value={selectedDateField === 'fromDate' ? fromDate : toDate}
//                             mode="date"
//                             display="default"
//                             onChange={handleDateChange}
//                         />
//                     )}

//                     {/* <View style={styles.radioContainer}>
//                         {radioOptions.map((option, index) => (
//                             <TouchableOpacity
//                                 key={index}
//                                 style={styles.radioButton}
//                                 onPress={() => setRadioValue(option.value)}
//                             >
//                                 <Text>{option.label}</Text>
//                                 {radioValue === option.value && <Text>✓</Text>}
//                             </TouchableOpacity>
//                         ))}
//                     </View> */}

//                     <View style={{ flexDirection: 'row', margin: 11, }}>
//                         {/* <TouchableOpacity style={styles.submitButton} onPress={() => { handleSubmit(); setIsModalVisible(false); }}> */}
//                         <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('ScheduleVisit')}>
//                             <Text>Submit</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity style={styles.submitButton1} onPress={() => navigation.navigate('ScheduleVisit')}>
//                             {/* <TouchableOpacity style={styles.submitButton1} onPress={() => { setIsModalVisible(false) }}> */}
//                             <Text>Cancel</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//             {/* </Modal > */}
//         </View >
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//     },
//     modalContainer: {
//         // flex: 0.4,
//         // justifyContent: 'center',
//         // alignItems: 'center',
//         // padding: 20,
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 22,
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 35,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     radioContainer: {
//         marginTop: 20,
//     },
//     radioOptions: {
//         flexDirection: 'row'
//     },
//     radioButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 10,
//     },
//     submitButton: {
//         backgroundColor: '#ccffff',
//         padding: 10,
//         alignItems: 'center',
//         borderRadius: 5,
//         marginTop: 20,
//         marginRight: 21,
//     },
//     submitButton1: {
//         backgroundColor: '#f2f2f2',
//         padding: 10,
//         alignItems: 'center',
//         borderRadius: 5,
//         marginTop: 20,
//         marginLeft: 21,
//     },
// });

// export default Filter;

// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import { RadioButton, Text, Button, TextInput } from 'react-native-paper';
// // import Icon from 'react-native-paper/lib/typescript/components/Icon';
// import Icon from 'react-native-vector-icons/FontAwesome';


// const Filter = () => {
//     const [selectedRange, setSelectedRange] = useState({});
//     const [selectedRadioButton, setSelectedRadioButton] = useState('option1');
//     const [isCalendarVisible, setIsCalendarVisible] = useState(false);

//     const handleDateSelect = (date) => {
//         if (Object.keys(selectedRange).length === 2) {
//             setSelectedRange({ [date.dateString]: { selected: true } });
//         } else if (Object.keys(selectedRange).length === 1) {
//             const [start, end] = Object.keys(selectedRange);
//             if (date.dateString < start) {
//                 setSelectedRange({ [date.dateString]: { selected: true, startingDay: true } });
//             } else {
//                 setSelectedRange({ ...selectedRange, [date.dateString]: { selected: true, endingDay: true } });
//             }
//         } else {
//             setSelectedRange({ [date.dateString]: { selected: true, startingDay: true } });
//         }
//     };

//     const handleRadioButtonChange = (value) => {
//         setSelectedRadioButton(value);
//     };

//     const handleDropdownPress = () => {
//         setIsCalendarVisible(!isCalendarVisible)
//     };

//     const handleCalendarDayPress = (day) => {
//         handleDateSelect({ dateString: day.dateString });
//         setIsCalendarVisible(false);
//     };

//     const handleSubmit = () => {
//         console.log(selectedRange);
//         console.log(selectedRadioButton);
//     };

//     return (
//         <View style={styles.container}>

//             <Text style={styles.header}>Filter</Text>
//             <View style={styles.imageStyle}>

//                 <Icon name="calendar" size={60} color="#ff80d5" />
//             </View>
//             <TextInput
//                 label="Created At Date"
//                 value={Object.keys(selectedRange).join(' - ')}
//                 onTouchStart={handleDropdownPress}
//             />
//             {isCalendarVisible && (
//                 <Calendar
//                     onDayPress={handleCalendarDayPress}
//                     markedDates={selectedRange}
//                     markingType="period"
//                     current={Date()}
//                 />
//             )}
//             <RadioButton.Group
//                 onValueChange={handleRadioButtonChange}
//                 value={selectedRadioButton}
//             >
//                 <RadioButton.Item label="Accepted" value="Accept" />
//                 <RadioButton.Item label="Deny" value="Deny" />
//             </RadioButton.Group>
//             <Button mode="contained" onPress={handleSubmit}>
//                 Submit
//             </Button>

//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         justifyContent: 'center',
//     },
//     header: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 16,
//     },
//     imageStyle: {
//         // padding: 10,
//         // margin: 5,
//         // height: 25,
//         // width: 25,
//         // resizeMode: 'stretch',
//         // alignItems: 'center',
//     },
//     sectionStyle: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//         borderWidth: 0.5,
//         borderColor: '#000',
//         height: 40,
//         borderRadius: 5,
//         margin: 10,
//     },
// });

// export default Filter;

import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';

const Filter = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const toggleModal = () => {
        if (!isModalVisible) {
            setSelectedStartDate(null);
            setSelectedEndDate(null);
        }
        setModalVisible(!isModalVisible);
    };

    const handleDateSelect = (day) => {
        if (!selectedStartDate) {
            setSelectedStartDate(day.dateString);
        } else if (!selectedEndDate) {
            setSelectedEndDate(day.dateString);
            toggleModal();
        }
    };

    const clearDateRange = () => {
        setSelectedStartDate(null);
        setSelectedEndDate(null);
    };

    const handleTimeChange = (event, selected) => {
        if (selected) {
            setSelectedDate(selected);
        }
        setShowTimePicker(false);
    };

    const renderSelectedDateTime = () => {
        if (selectedStartDate && selectedEndDate) {
            return (
                <View>
                    <Text>Selected Start Date: {selectedStartDate}</Text>
                    <Text>Selected End Date: {selectedEndDate}</Text>
                    <Text>Selected Time: {selectedDate.toLocaleTimeString()}</Text>
                </View>
            );
        } else {
            return (
                <Text>Please select a date range</Text>
            );
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Open Calendar" onPress={toggleModal} />

            <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Calendar
                        onDayPress={handleDateSelect}
                        markedDates={{
                            [selectedStartDate]: { startingDay: true, color: 'green' },
                            [selectedEndDate]: { endingDay: true, color: 'green' },
                        }}
                    />

                    {showTimePicker && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="time"
                            onChange={handleTimeChange}
                        />
                    )}

                    <Button title="Select Time" onPress={() => setShowTimePicker(true)} />
                    <Button title="Clear Date Range" onPress={clearDateRange} />
                    <Button title="Close" onPress={toggleModal} />
                </View>
            </Modal>

            {renderSelectedDateTime()}
        </View>
    );
};

export default Filter;



