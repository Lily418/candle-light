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
  TouchableOpacity
} from "react-native"

import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'


export default class PersonSummary extends React.Component {

  getFeelingWordStyle(feelingRecord) {
    const baseFeelingRecordStyle = {
      fontSize: 24

    }

    if(feelingRecord.sentiment === "Positive") {
      return {
        ...baseFeelingRecordStyle,
        "color" : "#307e48"
      }
    } else if(feelingRecord.sentiment === "Negative") {
      return {
        ...baseFeelingRecordStyle,
        "color" : "#c33737"
      }
    }
  }

  render() {
  const listItemAccessiblityLabel = this.props.index ? `${this.props.person.name}. item ${parseInt(this.props.index) + 1} in list ${this.props.listLength} ${this.props.listLength == 1 ? " item." : " items."}` : this.props.person.name

const personSummary = (
    
  <View style={styles.personSummary} accessibilityLabel={listItemAccessiblityLabel}>
  <View style={styles.personSummaryContainer}>
  <Text accessibilityLabel={this.props.person.name} style={styles.personName}>{this.props.person.name}</Text>
  
  { // If this is an add person element we will wrap it in TouchableOpacity later so we don't need to wrap it in a button
  this.props.isAddPerson ?       <View style={styles.plusButton}><Text style={styles.plusButtonText}>{"\uf067"/* Font awesome plus icon */}</Text></View>
: <Button containerStyle={styles.plusButton} onPress={this.props.addPressed} accessibilityLabel={this.props.isAddPerson ? "Add Person" : `Add feeling about ${this.props.person.name}`}>
    <Text style={styles.plusButtonText}>{"\uf067"/* Font awesome plus icon */}</Text>
  </Button>}
</View>
{
  this.props.person.feelings && <View style={styles.feelingWordList}>
      {
        this.props.person.feelings.map((feeling, index) => {
          return (<View key={`${this.props.person.id}-${feeling.id}-view`} accessible={true} accessibilityLabel={`${feeling.feelingWord} ${feeling.description}`}>
            <Text style={this.getFeelingWordStyle(feeling)}>{feeling.feelingWord}</Text>
            <Text style={styles.feelingDescription}>{feeling.description}</Text>
          </View>)
        })
      }
    </View>
}
</View>)

    if(this.props.isAddPerson) {
      return (
        <TouchableOpacity onPress={this.props.addPressed} accessibilityLabel={"Add Person"} accessibilityTraits="button" accessibilityComponentType="button">
          { personSummary }
        </TouchableOpacity>
      )
    } else {
      return personSummary
    }

  }
}

const styles = StyleSheet.create({
  personSummary: {
    padding: 10
  },
  personName: {
    color: "black",
    fontSize: 26,
    flex: 1,
    fontWeight: "bold"
  },
  personSummaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  plusButton: {
    backgroundColor: "#1A8299",
    borderRadius: 45,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2
  },
  plusButtonText: {
    fontFamily: "FontAwesome",
    fontSize: 32,
    color: "white"  
  },
 feelingWordList: {
    flexDirection: "column",
    flex: 2
  },
  feelingDescription: {
    fontSize: 16,
    color: "black"
  }
})
