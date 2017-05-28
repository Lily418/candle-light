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
  ScrollView
} from "react-native"

import Button from 'react-native-button';

export default class AddFeeling extends React.Component {

  getHeaderViewStyle(feelingRecord) {
    const baseHeaderViewStyle = {
      padding: 20
    }

    if(feelingRecord.sentiment === "Positive") {
      return {
        ...baseHeaderViewStyle,
        "backgroundColor" : "#307e48"
      }
    } else {
      return {
        ...baseHeaderViewStyle,
        "backgroundColor" : "#c33737"
      }
    }
  }

  render() {
    const feelingRecord = this.props.showingFeeling
    const created = moment(feelingRecord.created)
  
    return (
      <View style={styles.container}>
        <View style={this.getHeaderViewStyle(feelingRecord)}>
          <Text style={styles.feelingWord}>{feelingRecord.feelingWord}</Text>
          <Text style={styles.created}>{created.format("dddd, M MMMM YYYY")}</Text>
        </View>
        <ScrollView>
          <Text style={styles.description}>
            {feelingRecord.description}
          </Text>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  description: {
    
  },
  feelingWord: {
    fontSize: 20,
    color: 'white'
  },
  created: {
    fontSize: 16,
    color: 'white'
  },
  description: {
    padding: 20,
    fontSize: 18
  }
})
