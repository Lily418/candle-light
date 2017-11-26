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
return (<View style={styles.personSummaryContainer}>
  <Text style={styles.personName}>{this.props.person.name}</Text>
  {
    this.props.person.feelings && <View style={styles.feelingWordList}>
        {
          this.props.person.feelings.map((feeling, index) => {
            return (<View key={`${this.props.person.id}-${feeling.id}-view`}>
              <Text style={this.getFeelingWordStyle(feeling)}>{feeling.feelingWord}</Text>
              <Text style={styles.feelingDescription}>{feeling.description}</Text>
            </View>)
          })
        }
      </View>
  }

  <Button containerStyle={styles.plusButton} onPress={this.props.addPressed}>
    <Text style={styles.plusButtonText}>{"\uf067"/* Font awesome plus icon */}</Text>
  </Button>

</View>)
}
}

const styles = StyleSheet.create({
  personName: {
    color: "black",
    fontSize: 26,
    flex: 1,
    fontWeight: "bold"
  },
  personSummaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
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
