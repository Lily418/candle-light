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
  Dimensions,
  SegmentedControlIOS
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
    //On iOS segment control has at least one preselected value
    this.props.changeFeelingSentiment(Platform.OS === "android" ? null : "Positive")
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

  exampleFeelingWords() {
    return !this.props.selectedSentiment || this.props.selectedSentiment === "Positive" ? "Examples: Secure, Uplifted, Respected" : "Examples: Humiliated, Inadequate, Pressured"
  }

  render() {
    return (
      <View style={{
        backgroundColor: "white",
        flex:1
      }}>
      <KeyboardAwareScrollView extraScrollHeight={50} enableOnAndroid={true}> 
        <View style={{
          backgroundColor: "white",
          padding: 10
        }}>
          { this.props.selectedPerson ? null : <View><Text accessible={false} style={styles.questionText}>
                      Who is this feeling about?
                    </Text>
                    <TextInput accessibilityLabel="Who is this feeling about?" style={styles.questionAnswerInput} onChangeText={this.props.personNameUpdated} value={this.props.personName} underlineColorAndroid="transparent"/>
                    { this.state.nameError ? <Text style={styles.errorStyle}>{this.state.nameError}</Text> : null }
                    </View>}
          <View>
          <Text style={styles.questionText}>
              How do you feel?
          </Text>
          {Platform.OS === "android" ?           <RadioForm radio_props={[
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
                      }} 
                      onPress={this.feelingSentimentUpdated.bind(this)}/> :              
                      <SegmentedControlIOS values={["Positive", "Negative"]} 
                                            selectedIndex={this.props.selectedSentiment == "Negative" ? 1 : 0}
                                            onChange={(event) => { this.feelingSentimentUpdated.bind(this)(event.nativeEvent.selectedSegmentIndex)}} 
                                            style={{marginTop: 10, marginBottom: 20}}
                                            />
                      
      }

          </View>
            { this.state.sentimentError ? <Text style={styles.errorStyle}>{this.state.sentimentError}</Text> : null}
          <Text style={styles.questionText} accessible={false}>
            What Word Describes This Feeling?
          </Text>
          <TextInput accessibilityLabel={`What Word Describes This Feeling? ${this.exampleFeelingWords.bind(this)()}`} style={styles.questionAnswerInput} onChangeText={this.props.feelingWordUpdated.bind(this)} value={this.props.feelingWord} underlineColorAndroid="transparent"/>
          <Text accessible={false} style={styles.exampleFeelingWord}>{this.exampleFeelingWords.bind(this)()}</Text>
          { this.state.feelingWordError ? <Text style={styles.errorStyle}>{this.state.feelingWordError}</Text> : null}
          <Text style={styles.questionText} accessible={false}>
            {this.formatQuestion(this.props.personName, this.props.feelingWord, this.props.selectedSentiment, false)}
          </Text>
          <TextInput accessibilityLabel={this.formatQuestion(this.props.personName, this.props.feelingWord, this.props.selectedSentiment, true)} style={styles.questionAnswerMultilineInput} onChangeText={this.props.questionAnswerUpdated.bind(this)} underlineColorAndroid="transparent" multiline={true} value={this.props.questionAnswer}/>
          {Platform.OS === "android" ? 
                    <Button style={styles.saveButton} onPress={this.savePressed.bind(this)}>
                      Save
                    </Button> : null}

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
    marginTop:10
  },
  questionText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold"
  },
  questionAnswerInput: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  questionAnswerMultilineInput: {
    borderWidth: 1,
    borderColor: "black",
    textAlignVertical: 'top',
    minHeight: 100,
    marginTop: 5,
    padding: 5
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
