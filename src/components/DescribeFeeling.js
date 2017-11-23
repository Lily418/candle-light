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
    const {height, width} = Dimensions.get('window');
    return (
      <ScrollView > 
        <View style={{
          backgroundColor: "white",
          padding: 10,
          height: height - 30
        }}>
          <Text style={styles.questionText} importantForAccessibility={"no"}>
            Who is this feeling about?
          </Text>
          <TextInput accessibilityLabel="Who is this feeling about?" style={styles.questionAnswerInput} onChangeText={undefined} value={undefined} underlineColorAndroid="#1a8299"/>
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
            ]} formHorizontal={true} buttonColor={"#6D6D6D"} selectedButtonColor={"#1a8299"} labelColor={"black"} animation={false} initial={0} labelStyle={{
              height: 22,
              fontSize: 18,
              color: "black"
            }} style={{
              justifyContent: "space-between",
              paddingTop: 20,
              paddingBottom: 20,
              paddingRight: 40
            }} onPress={(value) => {
              this.setState({value: value})
            }}/>
          <Text style={styles.questionText} importantForAccessibility={"no"}>
            What Word Describes This Feeling?
          </Text>
          <TextInput accessibilityLabel="What Word Describes This Feeling?" style={styles.questionAnswerInput} onChangeText={undefined} value={undefined} underlineColorAndroid="#1a8299"/>
          <Text style={styles.questionText} importantForAccessibility={"no"}>
            What has Liam done which made you feel encouraged?
          </Text>
          <TextInput accessibilityLabel={"What has Liam done which made you feel encouraged?"} style={styles.questionAnswerMultilineInput} onChangeText={undefined} underlineColorAndroid="transparent" multiline={true} numberOfLines={10} value={undefined}/>
          <Button style={styles.saveButton}>
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
  }
})
