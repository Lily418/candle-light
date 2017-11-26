/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Button as VanillaButton,
  KeyboardAvoidingView,
  Dimensions
} from "react-native"

import Button from "react-native-button";
import Icon from "react-native-vector-icons/FontAwesome"
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button";

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

    if(this.props.selectedPerson) {
      this.props.personNameUpdated(this.props.selectedPerson.name)
    }
  }

  savePressed() {
    const selectedPerson = this.props.selectedPerson
    const description = this.props.questionAnswer
    const sentiment = this.props.selectedSentiment
    const feelingWord = this.props.feelingWord
    const personName = this.props.personName

    const onComplete = () => {
      this.props.questionAnswerUpdated("")
      this.props.navigation.goBack()
    }
    
    if(!selectedPerson) {
      this.props.createPerson(personName, description, sentiment, feelingWord, onComplete)
    } else {
      this.props.addFeelingToPerson(selectedPerson, description, sentiment, feelingWord, onComplete)
    }
  }

feelingSentimentUpdated(value) {
  if(value === 0) {
    this.props.changeFeelingSentiment("Positive")
  } else if(value === 1) {
    this.props.changeFeelingSentiment("Negative")
  }
}

formatQuestion(personName, feelingWord, selectedSentiment) {

  const getFeelingWordStyle = (selectedSentiment) => {
    if(selectedSentiment === "Positive") {
      return {
        "color" : "#307e48"
      }
    } else if(selectedSentiment === "Negative") {
      return {
        "color" : "#c33737"
      }
    } else {
      return {
        "color" : "#1A8299"
      }
    }
  }


  const emptyString = (str) => {
    return !str || !str.trim().length
  }

  const formattedFeelingWord = () => {
    return (<Text style={getFeelingWordStyle(selectedSentiment)}>{feelingWord}</Text>)
  }

  const formattedPersonName = () => {
    return (<Text style={styles.personNameStyle}>{personName}</Text>)
  }

  if(emptyString(personName) && emptyString(feelingWord)) {
    return (<Text>What has made you feel this way?</Text>)
  }

  if(emptyString(personName)) {
    return (<Text>What has made you feel {formattedFeelingWord()}?</Text>)
  }

  if(emptyString(feelingWord)) {
    return (<Text>What has {formattedPersonName()} done which made you feel this way?</Text>)
  }

  return(<Text>What has {formattedPersonName()} done which made you feel {formattedFeelingWord()}?</Text>)
}

  render() {
    const {height, width} = Dimensions.get('window');
    return (
      <ScrollView > 
        <View style={{
          backgroundColor: "white",
          padding: 10,
          height: height - 30
        }}>
          { this.props.selectedPerson ? null : <View><Text style={styles.questionText} importantForAccessibility={"no"}>
                      Who is this feeling about?
                    </Text>
                    <TextInput accessibilityLabel="Who is this feeling about?" style={styles.questionAnswerInput} onChangeText={this.props.personNameUpdated} value={this.props.personName} underlineColorAndroid="#1a8299"/>
                    </View>}

          <Text style={styles.questionText}>
              How do you feel?
          </Text>

          <RadioForm radio_props={[
              {
                label: "Positive",
                value: 0
              }, {
                label: "Negative",
                value: 1
              }
            ]} formHorizontal={true} buttonColor={"#6D6D6D"} selectedButtonColor={"#1a8299"} labelColor={"black"} animation={false} initial={-1} labelStyle={{
              height: 22,
              fontSize: 18,
              color: "black"
            }} style={{
              justifyContent: "space-between",
              paddingTop: 20,
              paddingBottom: 20,
              paddingRight: 40
            }} onPress={this.feelingSentimentUpdated.bind(this)}/>
          <Text style={styles.questionText} importantForAccessibility={"no"}>
            What Word Describes This Feeling?
          </Text>
          <TextInput accessibilityLabel="What Word Describes This Feeling?" style={styles.questionAnswerInput} onChangeText={this.props.feelingWordUpdated.bind(this)} value={this.props.feelingWord} underlineColorAndroid="#1a8299"/>
          <Text style={styles.questionText} importantForAccessibility={"no"}>
            {this.formatQuestion(this.props.personName, this.props.feelingWord, this.props.selectedSentiment)}
          </Text>
          <TextInput accessibilityLabel={"What has Liam done which made you feel encouraged?"} style={styles.questionAnswerMultilineInput} onChangeText={this.props.questionAnswerUpdated.bind(this)} underlineColorAndroid="transparent" multiline={true} numberOfLines={10} value={undefined}/>
          <Button style={styles.saveButton} onPress={this.savePressed.bind(this)}>
            Save
          </Button>
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  innerContainer: {
    padding: 10
  },
  headerStyle: {
    flexDirection: "row"
  },
  saveButton: {
    backgroundColor: "#1a8299",
    color: "white",
    fontSize: 24,
    padding: 20,
    margin: 20
  },
  questionText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    margin: 2
  },
  questionAnswerInput: {
    fontSize: 18
  },
  questionAnswerMultilineInput: {
    paddingTop: 10,
    borderWidth: 1,
    borderColor: "black",
    textAlignVertical: 'top'
  },
  personNameStyle: {
    color: "#1A8299"
  }
})
