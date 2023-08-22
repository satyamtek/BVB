import { StyleSheet, } from 'react-native';

export const ScheduleVisitStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#aacaee',
    },
    listItem: {
        margin: 5, marginLeft:20,marginRight:20,marginTop:10,
        borderBottomWidth: 1, borderRadius: 40,
        borderColor: 'gray', padding: 5,
        backgroundColor: '#d4e4f7'
    },
    commentText: {
        fontSize: 20,textAlign:'center',
        fontWeight: 'bold',padding:5,marginBottom:2,
    },
    card:{justifyContent:'space-between', alignItems:'justify',},
    txtHeading: {
        fontSize: 18, padding:5, color:'#333333', marginLeft:11,
        fontWeight:'600',textAlign:'left',justifyContent:'flex-start' 
    },
    txt: {
        fontSize: 15, padding:3, display:'flex',
         justifyContent:'flex-end',textAlign:'right',
        color:'#333333',
    },

    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#00b3b3',
        padding: 17,
        borderRadius: 11,
        borderBottomRightRadius: 31,
        borderTopRightRadius: 30,
        margin: 4,
        marginRight: 8,
        // flex: 0.8,
        elevation: 5,
        gap: 30,
        justifyContent: 'space-between'
    },
    noDataText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContainer:{
        justifyContent:'center',
        alignItems:'center',
    }
})