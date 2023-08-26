
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, RefreshControl, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { ScheduleVisitStyle } from '../scheduleVisitStyle';

export default function ScheduleVisitBody({ data, refreshing, loading, onRefresh, navigation }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({ visitStatus: null, });
  const [openItemId, setOpenItemId] = useState(null);

  const handleHeaderPress = (item) => {setSelectedItem(item.propertyCode === selectedItem?.propertyCode ? null : item);};
  
  const toggleItem = (itemId) => {
    if (openItemId === itemId) {
      setOpenItemId(null);
    } else { setOpenItemId(itemId); }
  };

  const EVisitStatus = {
    Created: 12,
    Pending: 1,
    'Follow Up': 2,
    'Visit in Progress': 3,
    Rescheduled: 4,
    'Not Interested': 5,
    Done: 6,
    'Owner denied': 9,
    'Tenant denied': 10,
    'CP denied': 11,
    Close: 13,
    Other:0
  }
  const scheduleVisit = { 'run-time': 1, pending: 2 }

  function getKeyByValue(enumObject, value) { return Object.keys(enumObject).find((key) => enumObject[key] === value) }

  return (
    <View style={ScheduleVisitStyle.container} >
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 36, fontWeight: '600', margin: 16, textAlign: 'center' }}>Schedule Visit</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Filter")}>
          <Icon name="filter" size={60} color="#ff80d5" />
        </TouchableOpacity>
      </View> */}
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {loading ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#000" style={{ marginTop: 55, }} />
            <Text style={{ textAlign: 'center', fontSize: 21, fontWeight: '400' }} >Loading ....</Text>
          </View>
        ) : data && data.data && data.data.length > 0 ? (
          data.data.map(item => (
            <View key={item.id} style={ScheduleVisitStyle.listItem}>
              <TouchableOpacity onPress={() => toggleItem(item.id)}>
                <Text style={ScheduleVisitStyle.commentText}>Property Code: <Text>{item.propertyCode}  </Text>
                  {openItemId === item.id ? (
                    <MaterialCommunityIcons name="arrow-down-right-bold" size={18} />
                  ) : (<MaterialCommunityIcons name="arrow-right-bold" size={18} />
                  )} </Text>
              </TouchableOpacity>
              {openItemId === item.id && (
                <View style={ScheduleVisitStyle.card}>
                  <Text style={ScheduleVisitStyle.txtHeading}>ID: {item.id}</Text>
                  <Text style={ScheduleVisitStyle.txtHeading}>Schedule Type <Text style={ScheduleVisitStyle.txt}>{getKeyByValue(EVisitStatus, item.scheduleType)}</Text></Text>
                  <Text style={ScheduleVisitStyle.txtHeading}>Visit Type <Text style={ScheduleVisitStyle.txt}>{getKeyByValue(EVisitStatus,item.leadVisitType)}</Text></Text>
                  <Text style={ScheduleVisitStyle.txtHeading}>Visitor<Text style={ScheduleVisitStyle.txt}>{item.contact}</Text></Text>
                  <Text style={ScheduleVisitStyle.txtHeading}>Status:<Text style={ScheduleVisitStyle.txt}>{getKeyByValue(EVisitStatus, item.status)}</Text> </Text>
                  <Text style={ScheduleVisitStyle.txtHeading}>Field Officer <Text>{item.assignedTo}</Text></Text>
                  {/* <Text style={ScheduleVisitStyle.txtHeading}>Created By :<Text style={ScheduleVisitStyle.txt}>{item.assigned.fullName}</Text> </Text> */}
                  <Text style={ScheduleVisitStyle.txtHeading}>Created At:<Text style={ScheduleVisitStyle.txt}>{moment(item.createdAt).format('DD/MM/YYYY, h:mm a')}</Text> </Text>
                </View>
              )}
            </View>
          ))
        ) : (<Text style={{ textAlign: 'center', marginTop: '51%', fontSize: 25, fontWeight: '500' }}> No Visit Assigned Today</Text>
        )}
      </ScrollView>
    </View>
  )
}


