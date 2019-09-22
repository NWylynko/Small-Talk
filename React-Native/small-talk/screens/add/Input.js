import React, { Component } from "react";
import { TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";
import Constants from "expo-constants";
import config from "../config.json";

export default function Input() {
  const [value, onChange_userSearch] = React.useState("");

  return (
    <KeyboardAvoidingView style={styles.keyboard} behavior="padding" enabled>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeText(text)}
        value={value}
        onSubmitEditing={data => onSubmitEditing(data)}
        placeholder="Search..."
        paddingLeft={10}
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
    borderColor: config.style.colors.add.input.border,
    borderWidth: 3
  },
  keyboard: {
    width: "100%",
    padding: 5,
    marginBottom: Constants.statusBarHeight + 5,
  }
});
