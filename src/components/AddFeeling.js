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

import Navigation from './Navigation'


export default class AddFeeling extends React.Component {
  
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
        wordsToDisplay.map((word, index) => 
          <Button key={`feeling-button-${index}`} containerStyle={styles.feelingButtonContainerStyle}
                  style={styles.feelingButtonTextStyle}>{word}</Button>
        )
        : null
      }
      </View>
      
      <View style={styles.navContainer}>
        <Navigation />
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navContainer: {
    flex: 0.1,
  },
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
    margin: 4,
    width: 120,
    elevation: 2
  },
  feelingButtonTextStyle: {
    fontSize: 16 , 
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
    backgroundColor: "white",
    alignItems: "stretch"
  },
  sentimentButtonContainer: {
    flexDirection: 'row',
    flex: 0.2
  },
  feelingButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    flex: 0.7
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    flex: 0.1
  }
})
