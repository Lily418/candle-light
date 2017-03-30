/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React from "react"
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
    if(feelingRecord.sentiment === "Positive") {
      return {
        "backgroundColor" : "#8dc73f"
      }
    } else {
      return {
        "backgroundColor" : "#c74c3f"
      }
    }
  }
  
  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const feelingsDataSource = ds.cloneWithRows(this.props.feelings)
        
    return (
      <View style={styles.container}>
        {this.props.feelings.values ? <ListView
        dataSource={feelingsDataSource}
        renderRow={(feelingRecord) =>
          <View>
          <View>
            
          </View>
          <View style={this.getFeelingRecordStyle(feelingRecord)}>
            <Text style={styles.feelingDescriptionStyle}>{feelingRecord.description}</Text>
          </View>
          </View>
          }
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
  feelingDescriptionStyle: {
    color: "white"
  }
})
