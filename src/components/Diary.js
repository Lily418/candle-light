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
  ListView
} from "react-native"

import Button from 'react-native-button';
import Navigation from './Navigation'


export default class Diary extends React.Component {
  
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
        "backgroundColor" : "#8dc73f"
      }
    } else {
      return {
        ...baseFeelingRecordStyle,
        "backgroundColor" : "#c74c3f"
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

  renderRow(feelingRecord) {
  
    const created = moment(feelingRecord.created)
    
    return (
      <View style={this.getFeelingContainerStyle(feelingRecord)}>
      <View style={styles.feelingDate}>
        {feelingRecord.isNewDate ? <Text>{created.format("DD")}</Text> : null}
        {feelingRecord.isNewDate ? <Text>{created.format("ddd")}</Text> : null}
      </View>
      <View style={this.getFeelingRecordStyle(feelingRecord)}>
        <Text style={styles.feelingWordStyle}>{feelingRecord.feelingWord}</Text>
        <Text style={styles.feelingDescriptionStyle}>{created.format("hh:mma")}</Text>
        <Text style={styles.feelingDescriptionStyle}>{feelingRecord.description}</Text>
      </View>
      </View>
    )
  }
  
  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const feelingsDataSource = ds.cloneWithRows(this.props.feelings)
    
    return (
      <View style={styles.container}>
        {this.props.feelings.length > 0 ? <ListView
        dataSource={feelingsDataSource}
        renderRow={this.renderRow.bind(this)}
        style={styles.listViewStyle}
        /> : null}
        <View style={styles.navContainer}>
        <Navigation currentRoute={this.props.route}  navigator={this.props.navigator} />
        </View>
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
    fontSize: 16
  },
  feelingDate: {
    flex: 0.15,
    padding: 5
  }
})
