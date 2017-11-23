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
  Dimensions,
  Platform
} from "react-native"

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome'

import Quote from '../containers/QuoteContainer'
import PersonSummary from './PersonSummary'


export default class People extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'People',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="users" size={20} color={tintColor} />
    }
  };

  addPressed(personId) {
    this.props.personSelected(personId)
    this.props.navigation.navigate('DescribeFeeling')
  }
  
  render() {
    return (
      <View accessibilityLabel={"People"} style={styles.container}>
        <Quote />
        <PersonSummary personName={"Add Person"} addPressed={this.addPressed.bind(this, 0)}/>
        <PersonSummary personName={"Liam"} addPressed={this.addPressed.bind(this, 1)} />
        <PersonSummary personName={"Andrea"} addPressed={this.addPressed.bind(this, 2)}/>
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
