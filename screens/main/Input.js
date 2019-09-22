import React, { Component } from "react";
import { TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";

import config from "../config.json";

export default function Input() {
  const [value, onChangeText] = React.useState("");
  return (
    <KeyboardAvoidingView keyboardVerticalOffset = {5} style={styles.keyboard} behavior="padding" enabled>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeText(text)}
        value={value}
        onSubmitEditing={data => onSubmitEditing(data)}
        placeholder="Chat..."
        padding={10}
        multiline
      />
    </KeyboardAvoidingView>
  );
}

function onSubmitEditing(data) {
  console.log(data.timeStamp);
  console.log(data.nativeEvent.text);
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    borderColor: config.style.colors.input.border,
    borderWidth: 3,
    
  },
  keyboard: {
    width: "100%",
    padding: 5,
    marginBottom: 5,
  }
});
