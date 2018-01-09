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
  Dimensions,
  FlatList,
  Platform
} from "react-native"

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome'

import Quote from '../containers/QuoteContainer'
import PersonSummary from './PersonSummary'


export default class People extends React.Component {

  static navigationOptions = {
    headerTitle: "People",
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

  renderItem(person, index) {
    return (<PersonSummary index={index} listLength={this.props.people.length} key={person.item.id} person={person.item} addPressed={this.addPressed.bind(this, person.item)} />)
  }
  
  render() {
    return (
      <View accessibilityLabel={"People"} style={styles.container}>
        <FlatList
          data={this.props.people}
          ListHeaderComponent={() => 
            <View>
              <Quote /> 
              <PersonSummary isAddPerson={true} person={{name: "Add Person"}} addPressed={this.addPressed.bind(this, null)}/> 
          </View>}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  }
})
