/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React from "react"
import {
  StyleSheet,
  Text,
} from "react-native"

export default class Quote extends React.Component {
  render() {
    return (
      <Text style={styles.quoteText}>"In a healthy relationship you should feel encouraged to be yourself"</Text>
    )
  }
}

const styles = StyleSheet.create({
  quoteText: {
    fontSize: 20,
    fontWeight: "100",
    fontStyle: "italic",
    textAlign: "center",
    padding: 20
  }
})
