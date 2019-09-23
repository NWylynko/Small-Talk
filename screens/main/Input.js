import React, { Component } from "react";
import { TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";

import config from "../config.json";

import firebase from "../../firebase/index";

const DB = firebase.database();

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
      />
    </KeyboardAvoidingView>
  );
}

function onSubmitEditing(data) {
  console.log(data.timeStamp);
  console.log(data.nativeEvent.text);

    // A post entry.
    var postData = {
      from: "users/" + firebase.auth().currentUser.uid,
      msg: data.nativeEvent.text,
      timestamp: data.timeStamp,
    };
  
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('messages').push().key;
    
    //var newPostKey = "iRWPfjFcVrpN012CjWAE"

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/messages/' + newPostKey] = postData;
  
    return firebase.database().ref().update(updates);
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
