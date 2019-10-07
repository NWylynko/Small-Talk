import React, { Component } from "react";
import { TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";
import Constants from "expo-constants";
import config from "../config.json";

export default function Input({ inputValue, set_inputValue, set_loading, onSubmit }) {
  return (
    <KeyboardAvoidingView style={styles.keyboard} behavior="padding" enabled>
      <TextInput
        style={styles.input}
        onChangeText={text => {set_inputValue(text); onSubmit(text);}}
        value={inputValue}
        placeholder="Search..."
        paddingLeft={10}
      />
    </KeyboardAvoidingView>
  );
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
