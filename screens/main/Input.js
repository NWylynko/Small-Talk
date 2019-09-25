import React, { Component } from "react";
import { TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";

import config from "../config.json";

import firebase from "../../firebase/index";
import 'firebase/firestore';

const DB = firebase.firestore();

export default function Input({ current }) {
  const [value, onChangeText] = React.useState("");
  return (
    <KeyboardAvoidingView keyboardVerticalOffset = {5} style={styles.keyboard} behavior="padding" enabled>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeText(text)}
        value={value}
        onSubmitEditing={data => onSubmitEditing(data, current, onChangeText)}
        placeholder="Chat..."
        padding={10}
      />
    </KeyboardAvoidingView>
  );
}

function onSubmitEditing(data, current, onChangeText) {

  onChangeText("")

  console.log(data.timeStamp);
  console.log(data.nativeEvent.text);

    // A post entry.
    var postData = {
      from: firebase.auth().currentUser.uid,
      text: data.nativeEvent.text,
      timestamp: data.timeStamp,
    };
  
    DB.collection("messages").doc(current.chatID)
      .collection("chat")
      .add(postData).then(function() {
        console.log("Document successfully written!");
    });
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
