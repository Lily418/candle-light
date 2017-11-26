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
  ListView,
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

  renderRow(person, sectionID, rowID) {
    return (<PersonSummary key={person.id} person={person} addPressed={this.addPressed.bind(this, person)} />)
  }
  
  render() {
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const peopleDataSource = ds.cloneWithRows(this.props.people)

    return (
      <View accessibilityLabel={"People"} style={styles.container}>
        <ListView
          enableEmptySections={true}
          dataSource={peopleDataSource}
          renderHeader={() => 
            <View>
              <Quote /> 
              <PersonSummary person={{name: "Add Person"}} addPressed={this.addPressed.bind(this, null)}/> 
          </View>}
          renderRow={this.renderRow.bind(this)}
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
