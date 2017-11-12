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
  ScrollView,
  Platform
} from "react-native"

import Button from 'react-native-button';

export default class AddFeeling extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle:  params.feelingRecord.feelingWord,
      headerTintColor: "#FFF",
      headerTitleStyle: {
        color: "#FFF"
      },
      headerStyle: {
        backgroundColor: params.feelingRecord.sentiment === "Positive" ?  "#307e48" : "#c33737"
      }
    }
  }

  getHeaderViewStyle(feelingRecord) {
    const baseHeaderViewStyle = {
      padding: 20
    }

    if(feelingRecord.sentiment === "Positive") {
      return {
        ...baseHeaderViewStyle,
        "backgroundColor" :  Platform.OS === "android" ? "#307e48" : "#FFF"
      }
    } else {
      return {
        ...baseHeaderViewStyle,
        "backgroundColor" : Platform.OS === "android" ? "#c33737" : "#FFF"
      }
    }
  }

  render() {
    const feelingRecord = this.props.showingFeeling
    const created = moment(feelingRecord.created)
  
    return (
      <View style={styles.container}>
        <View style={this.getHeaderViewStyle(feelingRecord)}>
          {
            Platform.OS === "android" ? <Text style={styles.feelingWord}>{feelingRecord.feelingWord}</Text> : null
          }
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
    color: Platform.OS === "android" ? 'white' : 'black'
  },
  description: {
    padding: 20,
    fontSize: 18
  }
})
