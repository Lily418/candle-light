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


const activeRouteColor =  "#1a8299"
const inactiveRouteColor = "black"

export default class Navigation extends React.Component {


  getColor(routeKey, currentRoute) {
    if(routeKey === currentRoute.key) {
      return activeRouteColor
    } else {
      return inactiveRouteColor
    }
  }

  render() {
  
    const addFeelingColor = this.getColor("AddFeeling", this.props.currentRoute)
    const diaryColor = this.getColor("Diary", this.props.currentRoute)

    return (
      <View style={styles.container}>
        <View style={styles.navItemContainer}>
          <Icon name="plus" size={30} color={addFeelingColor} />
          <Text style={{color: addFeelingColor}}>Add</Text>
        </View>
        <View style={styles.navItemContainer}>
          <Icon name="book" size={30} color={diaryColor} />
          <Text style={{color: diaryColor}}>Diary</Text>
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
