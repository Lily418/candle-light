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

  componentDidMount() {
    this.props.loadPeople()
  }

  addPressed(person) {
    this.props.personSelected(person)
    this.props.navigation.navigate('DescribeFeeling')
  }
  
  render() {
    return (
      <View accessibilityLabel={"People"} style={styles.container}>
        <Quote />

        <PersonSummary person={{name: "Add Person"}} addPressed={this.addPressed.bind(this, null)}/>
        { this.props.people.map(person => <PersonSummary key={person.id} person={person} addPressed={this.addPressed.bind(this, person)} />) }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10
  }
})
