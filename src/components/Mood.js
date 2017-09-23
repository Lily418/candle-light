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
  ScrollView,
  Dimensions
} from "react-native"

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class AddFeeling extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Mood',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="line-chart" size={20} color={tintColor} />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  }
})
