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
  TextInput,
  Platform,
  Button as VanillaButton
} from "react-native"

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome'


export default class DescribeFeeling extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight:  (<VanillaButton title="Save" onPress={ params.savePressed ? params.savePressed : () => null } />),
      headerTitle: "Describe Feeling"
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ savePressed: this.savePressed.bind(this) })
  }

  savePressed() {
    const description = this.props.questionAnswer
    const sentiment = this.props.selectedSentiment
    const feelingWord = this.props.selectedWord
    this.props.saveFeeling(description, sentiment, feelingWord, () => {
      this.props.questionAnswerUpdated("")
      this.props.changeFeelingSection(null)
      this.props.navigation.goBack()
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <Text style={styles.questionText} importantForAccessibility={"no"}>What has made you feel {this.props.selectedWord.toLowerCase()}?</Text>
          {
            Platform.OS === "android" ? 
              <Button containerStyle={styles.saveButtonContainer} style={styles.saveButton} onPress={this.savePressed.bind(this)}>SAVE</Button> 
              : null
          }
        </View>
      <TextInput
        accessibilityLabel={"What has made you feel" + this.props.selectedWord.toLowerCase() + "?"}
        style={styles.questionAnswerInput}
        onChangeText={this.props.questionAnswerUpdated}
        underlineColorAndroid='transparent'
        multiline={true}
        value={this.props.questionAnswer}
        autoFocus={true}
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    padding: 10,
    backgroundColor: "white"
  },
  headerStyle: {
    flexDirection: "row"
  },
  saveButton: {
    color: "#1a8299",
    fontSize: 24
  },
  saveButtonContainer: {
    flex: 0.3
  },
  questionText: {
    flex: 0.8,
    fontSize: 24
  },
  questionAnswerInput: {
    fontSize: 18,
    flex: 0.9,
    textAlignVertical: 'top'
  }
})
