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

import Button from 'react-native-button';


export default class CandleLight extends React.Component {
  
  feelingButtonPressed(newSection) {
    this.props.changeFeelingSection(newSection)
  }
  
  render() {

    const wordsToDisplay = this.props["feelingWords" + this.props.showingSection]

    return (
      <View style={styles.container}>
      <Text style={styles.title}>
      How Do You Feel?
      </Text>
      <View style={styles.sentimentButtonContainer}>
      
      <Button
        containerStyle={styles.positiveButtonContainerStyle}
        style={styles.sentimentButtonTextStyle}
        onPress={this.feelingButtonPressed.bind(this, 'Positive')}>
        Positive
      </Button>
      <Button
        containerStyle={styles.negativeButtonContainerStyle}
        style={styles.sentimentButtonTextStyle}
        onPress={this.feelingButtonPressed.bind(this, 'Negative')}>
        Negative
      </Button>
      </View>

      <View style={styles.feelingButtonsContainer}>
      { wordsToDisplay ? 
        wordsToDisplay.map((word) => 
          <Button containerStyle={styles.feelingButtonContainerStyle}
                  style={styles.feelingButtonTextStyle}>{word}</Button>
        )
        : null
      }
      </View>
      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  positiveButtonContainerStyle: {
    padding:10,
    height:45, 
    overflow:'hidden', 
    borderRadius:30, 
    backgroundColor: '#8dc73f',
    flex: 0.5,
    margin: 10
  },
  negativeButtonContainerStyle: {
    padding:10,
    height:45, 
    overflow:'hidden', 
    borderRadius:30, 
    backgroundColor: '#c74c3f',
    flex: 0.5,
    margin: 10
  },
  feelingButtonContainerStyle: {
    padding:10,
    height:45, 
    overflow:'hidden', 
    backgroundColor: 'white',
    margin: 10,
    width: 100
  },
  feelingButtonTextStyle: {
    fontSize: 12, 
    fontWeight: 'normal',
    color: '#5f5963'
  },
  sentimentButtonTextStyle: {
    fontSize: 20, 
    fontWeight: 'normal',
    color: 'white'
  },
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    alignItems: "center"
  },
  sentimentButtonContainer: {
    flexDirection: 'row'
  },
  feelingButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  title: {
    padding: 10,
    paddingTop: 20,
    fontSize: 30,
    textAlign: "center",
    margin: 10,
  }
})
