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
import Joi from "react-native-joi"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default class DescribeFeeling extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight:  (<VanillaButton title="Save" onPress={ params.savePressed ? params.savePressed : () => null } />),
      headerTitle: "Describe Feeling"
    }
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.navigation.setParams({ savePressed: this.savePressed.bind(this) })

    this.props.personNameUpdated("")
    this.props.changeFeelingSentiment(null)
    this.props.feelingWordUpdated("")

    if(this.props.selectedPerson) {
      this.props.personNameUpdated(this.props.selectedPerson.name)
    }
  }

  showError(errorKey, errorValue) {
    this.setState({[errorKey]: errorValue})
  }
  
  savePressed() {
    const selectedPerson = this.props.selectedPerson
    const description = this.props.questionAnswer
    const sentiment = this.props.selectedSentiment
    const feelingWord = this.props.feelingWord
    const personName = this.props.personName

    let feelingSchema = Joi.object().keys({
      sentiment: Joi.any().valid("Positive", "Negative"),
      feelingWord: Joi.string().min(1).max(20).required().label("Feeling Word"),
      personName: Joi.string().min(1).max(28).label("Name")
    })

    const result = Joi.validate({sentiment, feelingWord, personName}, feelingSchema, {abortEarly: false})
    this.setState({"nameError": ""})
    this.setState({"sentimentError": ""})
    this.setState({"feelingWordError": ""})

    if(result.error) {
      console.log(result.error)
      result.error.details.forEach((error) => {
        if(error.context.key === "sentiment") {
          this.showError("sentimentError", "Please select a sentiment for this feeling")
        }

        if(error.context.key === "Feeling Word") {
          if(error.type == "string.min" || error.type == "any.required") {
            this.showError("feelingWordError", "Please add a word to describe this feeling")
          } else {
            this.showError("feelingWordError",  error.message)
          }
        }

        if(error.context.key === "Name") {
          if(error.type == "string.min") {
            this.showError("nameError", "Please add a name to use for this new person")
          } else {
            this.showError("nameError",  error.message)
          }
        }
      })

      return
    }

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

formatQuestion(personName, feelingWord, selectedSentiment, rawString) {

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
    return (rawString ? "What has made you feel this way?" : <Text>What has made you feel this way?</Text>)
  }

  if(emptyString(personName)) {
    return (rawString ? `What has made you feel ${feelingWord}` : <Text>What has made you feel {formattedFeelingWord()}?</Text>)
  }

  if(emptyString(feelingWord)) {
    return (rawString ? `What has ${personName} done which made you feel this way?` : <Text>What has {formattedPersonName()} done which made you feel this way?</Text>)
  }

  return(rawString ? `What has ${personName} done which made you feel ${feelingWord}?` : <Text>What has {formattedPersonName()} done which made you feel {formattedFeelingWord()}?</Text>)
}

  render() {
    return (
      <View style={{
        backgroundColor: "white",
      }}>
      <KeyboardAwareScrollView extraScrollHeight={50} enableOnAndroid={true}> 
        <View style={{
          backgroundColor: "white",
          padding: 10
        }}>
          { this.props.selectedPerson ? null : <View><Text style={styles.questionText} importantForAccessibility={"no"}>
                      Who is this feeling about?
                    </Text>
                    <TextInput accessibilityLabel="Who is this feeling about?" style={styles.questionAnswerInput} onChangeText={this.props.personNameUpdated} value={this.props.personName} underlineColorAndroid="#1a8299"/>
                    <Text style={styles.errorStyle}>{this.state.nameError ? this.state.nameError : " "}</Text>
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
              paddingRight: 40
            }} onPress={this.feelingSentimentUpdated.bind(this)}/>
            <Text style={styles.errorStyle}>{this.state.sentimentError ? this.state.sentimentError : " "}</Text>
          <Text style={styles.questionText} importantForAccessibility={"no"}>
            What Word Describes This Feeling?
          </Text>
          <TextInput accessibilityLabel="What Word Describes This Feeling?" style={styles.questionAnswerInput} onChangeText={this.props.feelingWordUpdated.bind(this)} value={this.props.feelingWord} underlineColorAndroid="#1a8299"/>
          <Text style={styles.exampleFeelingWord}>{!this.props.selectedSentiment || this.props.selectedSentiment === "Positive" ? "Examples: Secure, Uplifited, Respected" : "Examples: Humiliated, Inadequate, Pressured"}</Text>
          <Text style={styles.errorStyle}>{this.state.feelingWordError ? this.state.feelingWordError : " "}</Text>
          <Text style={styles.questionText} importantForAccessibility={"no"}>
            {this.formatQuestion(this.props.personName, this.props.feelingWord, this.props.selectedSentiment, false)}
          </Text>
          <TextInput accessibilityLabel={this.formatQuestion(this.props.personName, this.props.feelingWord, this.props.selectedSentiment, true)} style={styles.questionAnswerMultilineInput} onChangeText={this.props.questionAnswerUpdated.bind(this)} underlineColorAndroid="transparent" multiline={true} value={this.props.questionAnswer}/>
          <Button style={styles.saveButton} onPress={this.savePressed.bind(this)}>
            Save
          </Button>
      </View>
      </KeyboardAwareScrollView>
      </View>
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
  },
  questionText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold"
  },
  questionAnswerInput: {
    fontSize: 18
  },
  questionAnswerMultilineInput: {
    borderWidth: 1,
    borderColor: "black",
    textAlignVertical: 'top'
  },
  personNameStyle: {
    color: "#1A8299"
  },
  exampleFeelingWord: {
    paddingLeft: 5,
    paddingBottom: 10
  },
  errorStyle: {
    color: "#c33737"
  }
})
