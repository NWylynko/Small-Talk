import React, { Component } from "react";
import { TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";
import Constants from "expo-constants";
import config from "../config.json";

export default function Input({ inputValue, set_inputValue, onSubmit, style }) {
  return (
    <KeyboardAvoidingView style={[styles.keyboard, style]} behavior="padding" enabled>
      <TextInput
        style={styles.input}
        onChangeText={text => {set_inputValue(text); onSubmit(text);}}
        value={inputValue}
        placeholder="Search..."
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    borderColor: config.style.colors.add.input.border,
    borderWidth: 3,
    padding: 10,
  },
  keyboard: {
    width: "100%",
    padding: 5,
    marginBottom: 5
  }
});
