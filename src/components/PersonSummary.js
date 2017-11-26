/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React from "react"
import {
  StyleSheet,
  Text,
  View
} from "react-native"

import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'


export default class PersonSummary extends React.Component {
  render() {
    return (
      <View style={styles.personSummaryContainer}>
        <Text style={styles.personName}>{this.props.person.name}</Text>
        {  this.props.person && this.props.person.feelings.map((feeling, index) => {
          return (<Text key={this.props.person.id + "-" + feeling.id}>{feeling.feelingWord}</Text>)
        })

          }
        <Button containerStyle={styles.plusButton} onPress={this.props.addPressed}>
          <Text style={styles.plusButtonText}>{"\uf067"/* Font awesome plus icon */}</Text>
        </Button> 
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  personName: {
    color: "black",
    fontSize: 26,
    fontWeight: "bold"
  },
  personSummaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center"
  },
  plusButton: {
    backgroundColor: "#1A8299",
    borderRadius: 45,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center"
  },
  plusButtonText: {
    fontFamily: "FontAwesome",
    fontSize: 32,
    color: "white"  }
})
