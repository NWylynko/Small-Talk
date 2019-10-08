import React, { Component } from "react";
import { TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useGlobal } from 'reactn';
import Constants from "expo-constants";

import config from "../config.json";

import firebase from "../../firebase/index";
import "firebase/firestore";

const DB = firebase.firestore();

export default function Input() {
  const [FRIEND, set_FRIEND] = useGlobal('friend');
  const [value, onChangeText] = React.useState("");
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={5}
      style={styles.keyboard}
      behavior="padding"
      enabled
    >
      <TextInput
        blurOnSubmit={false}
        autoFocus={true}
        style={styles.input}
        onChangeText={text => onChangeText(text)}
        value={value}
        onSubmitEditing={data => onSubmitEditing(data, FRIEND, onChangeText)}
        placeholder="Chat..."
        padding={10}
      />
    </KeyboardAvoidingView>
  );
}

function onSubmitEditing(data, FRIEND, onChangeText) {
  onChangeText("");

  // A post entry.
  var postData = {
    from: firebase.auth().currentUser.uid,
    text: data.nativeEvent.text,
    timestamp: Date.now()
  };

  DB.collection("messages")
    .doc(FRIEND.chatID)
    .collection("chat")
    .add(postData)
    .then(function() {
      // success
    });
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    borderColor: config.style.colors.input.border,
    borderWidth: 3
  },
  keyboard: {
    width: "100%",
    padding: 5,
    marginBottom: Constants.statusBarHeight,
  }
});
