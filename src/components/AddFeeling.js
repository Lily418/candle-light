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

export default class AddFeeling extends React.Component {

  static navigationOptions = {
    headerTitle: 'How Do You Feel?',
    tabBarLabel: 'Add Feeling',
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="plus" size={25} color={tintColor} />
    }
  };
  
  sentimentButtonPressed(newSection) {
    this.props.changeFeelingSection(newSection)
  }

  feelingButtonPressed(feelingName, sentiment) {
    this.props.wordSelected(feelingName, sentiment)
    this.props.navigation.navigate('DescribeFeeling')
  }

  maxWidthOfButton(minWidth) {
    const { width } = Dimensions.get('window')
    return (width / 2) - 20
  }

  getButtonStyle() {

    const minWidth = 150

    const baseStyle = { 
        padding: 10,
        height: 60, 
        overflow: 'hidden', 
        backgroundColor: 'white',
        margin: 4,
        elevation: 2,
        justifyContent: 'center',
      }

    console.log(this.maxWidthOfButton())

    return { ...baseStyle, width: this.maxWidthOfButton(minWidth) }
  }
  
  render() {

    const wordsToDisplay = this.props["feelingWords" + this.props.showingSection]

    return (
      <View accessibilityLabel={"Add Feeling"} style={styles.container}>
      { // On iOS this title is in the header
        Platform.OS === "android" ? 
        <Text style={styles.title}>
          How Do You Feel?
        </Text> : null
      }

      <View style={styles.sentimentButtonContainer}>
      
      <Button
        containerStyle={styles.positiveButtonContainerStyle}
        style={styles.sentimentButtonTextStyle}
        onPress={this.sentimentButtonPressed.bind(this, 'Positive')}>
        Positive
      </Button>
      <Button
        containerStyle={styles.negativeButtonContainerStyle}
        style={styles.sentimentButtonTextStyle}
        onPress={this.sentimentButtonPressed.bind(this, 'Negative')}>
        Negative
      </Button>
      </View>
      
      { wordsToDisplay && wordsToDisplay.length > 0 ? 
            <ScrollView style={styles.feelingButtonsScrollView}>
              <View style={styles.feelingButtonsContainer}>
              {
                wordsToDisplay.map((word, index) => 
                  <Button key={`feeling-button-${index}`} containerStyle={this.getButtonStyle.bind(this)()}
                          style={styles.feelingButtonTextStyle}
                          onPress={this.feelingButtonPressed.bind(this, word, this.props.showingSection)}>{word}</Button>
                )
              }
            </View>
            </ScrollView> : null
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  navContainer: {
    flex: 0.2
  },
  positiveButtonContainerStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    overflow:'hidden', 
    borderRadius:60, 
    backgroundColor: '#307e48',
    flex: 0.5,
    margin: 10,
    justifyContent: 'center'
  },
  negativeButtonContainerStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    overflow:'hidden', 
    borderRadius:60, 
    backgroundColor: '#c33737',
    flex: 0.5,
    margin: 10,
    justifyContent: 'center'
  },
  feelingButtonTextStyle: {
    fontSize: 22 , 
    fontWeight: 'normal',
    color: '#5f5963'
  },
  sentimentButtonTextStyle: {
    fontSize: 28, 
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
  },
  feelingButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    margin: 10
  },
  feelingButtonsScrollView: {
    flex: 0.7
  }
})
