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
} from "react-native"

import Icon from 'react-native-vector-icons/FontAwesome'


export default class Navigation extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navItemContainer}>
          <Icon name="plus" size={30} color="black" />
          <Text>Add</Text>
        </View>
        <View style={styles.navItemContainer}>
          <Icon name="book" size={30} color="black" />
          <Text>Diary</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1
  },
  navItemContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
