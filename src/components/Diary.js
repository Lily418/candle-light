/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React from "react"
import moment from "moment"

import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity
} from "react-native"

import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'


export default class Diary extends React.Component {

  static navigationOptions = {
    headerTitle: "Diary",
    tabBarLabel: 'Diary',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="book" size={25} color={tintColor} />
    }
  };
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadFeelings()
  }

  getFeelingRecordStyle(feelingRecord) {
    const baseFeelingRecordStyle = {
      flex: 0.85,
      padding: 10
    }

    if(feelingRecord.sentiment === "Positive") {
      return {
        ...baseFeelingRecordStyle,
        "backgroundColor" : "#307e48"
      }
    } else {
      return {
        ...baseFeelingRecordStyle,
        "backgroundColor" : "#c33737"
      }
    }
  }

  getFeelingContainerStyle(feelingRecord) {
    const baseFeelingContainerStyle = {
        flexDirection: "row",
        marginBottom: 2,
        marginRight: 5
      }
    
    if(feelingRecord.isNewDate) {
      return {
        ...baseFeelingContainerStyle,
        marginTop: 20
      }
    } else {
      return {
        ...baseFeelingContainerStyle,
        marginTop: 2
      }
    }

  }

  getDayOfWeekStyle(created) {
    const baseStyle = {
      fontSize: 18
    }

    if(created.isSame(moment(), "day")) {
      return {
        ...baseStyle,
        color: '#1c6bd9'
      }
    } else {
        return baseStyle
    }
  }

  getDayOfMonthStyle(created) {
    const baseStyle = {
      fontSize: 16
    }

    if(created.isSame(moment(), "day")) {
      return {
        ...baseStyle,
        color: '#1c6bd9'
      }
    } else {
        return baseStyle
    }
  }

  openFeelingDetail(feelingRecord) {
    this.props.changeShowingFeeling(feelingRecord)
    this.props.navigation.navigate('DetailFeeling', { feelingRecord: feelingRecord })
  }

  renderRow(itemCount, feelingRecord, sectionID, rowID) {
  
    const created = moment(feelingRecord.created)

    console.log(feelingRecord.person)
    
    return (
      <TouchableOpacity onPress={this.openFeelingDetail.bind(this, feelingRecord)}>
        <View style={this.getFeelingContainerStyle(feelingRecord)}>
        <View accessibilityLabel={created.format("Do") + " " + created.format("dddd") + " " + created.format("hh:mma")}  style={styles.feelingDate}>
          {feelingRecord.isNewDate ? <Text style={this.getDayOfWeekStyle(created)}>{created.format("DD")}</Text> : null}
          {feelingRecord.isNewDate ? <Text style={this.getDayOfMonthStyle(created)}>{created.format("ddd")}</Text> : null}
        </View>
        <View style={this.getFeelingRecordStyle(feelingRecord)}>
          <Text accessibilityLabel={(feelingRecord.sentiment === "Positive" ? "Positive Feeling " : "Negative Feeling ") + feelingRecord.feelingWord} style={styles.feelingWordStyle}>
            {feelingRecord.feelingWord}
          </Text>
          {feelingRecord.person[0] && 
            <Text style={styles.personStyle}>
              {feelingRecord.person[0].name}
            </Text>}

          <Text importantForAccessibility='no' style={styles.feelingDescriptionStyle}>{created.format("hh:mma")}</Text>
          <Text accessibilityLabel={feelingRecord.description + ". item " + (parseInt(rowID) + 1) + " in list " + this.props.feelings.length + (this.props.feelings.length == 1 ? " item." : " items.")} style={styles.feelingDescriptionStyle}>
            {feelingRecord.description}
          </Text>
        </View>
        </View>
      </TouchableOpacity>
    )
  }
  
  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const feelingsDataSource = ds.cloneWithRows(this.props.feelings)
    
    return (
      <View accessibilityLabel={"Diary"}  style={styles.container}>
        {this.props.feelings.length > 0 ? <ListView
        dataSource={feelingsDataSource}
        renderRow={this.renderRow.bind(this, this.props.feelings.length)}
        style={styles.listViewStyle}
        /> : 
        <View style={{flex : 1}}> 
          <Text style={styles.emptyDiary}>Your diary is currently empty, after you record feelings using 'Add Feeling' you will find them here.</Text>
        </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navContainer: {
    flex: 0.1,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "stretch"
  },
  listViewStyle: {
    flex : 1
  },
  feelingDescriptionStyle: {
    color: "white",
    fontSize: 14
  },
  feelingWordStyle: {
    color: "white",
    fontWeight: "100",
    fontStyle: "italic",
    fontSize: 16
  },
  personStyle: {
    color: "white",
    fontSize: 16
  },
  feelingDate: {
    flex: 0.15,
    padding: 5
  },
  emptyDiary: {
    padding: 20,
    textAlign: 'center',
    fontSize: 24
  }
})
