import React, { useContext, useState } from "react";
import { TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";
import { StoreContext } from '../store';
import Constants from "expo-constants";

import config from "../config.json";

import firebase from "../firebase";

const firestore = firebase.firestore();
const database = firebase.database();

export default function Input() {

  const { user, userSnapshot, friendSnapshot } = useContext(StoreContext);
  const [value, setValue] = useState("")

  function submit() {

    if (value != "") {

      // A post entry.
      var postData = {
        from: user.uid,
        text: value,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };

      database.ref("msg/" + friendSnapshot.chatID).push(postData);

      firestore
        .collection('users').doc(friendSnapshot.uid)
        .collection('friends').doc(user.uid)
        .update({
          last_msg: value,
          last_timestamp: Date.now(),
          seen: false
        })

      firestore
        .collection('users').doc(user.uid)
        .collection('friends').doc(friendSnapshot.uid)
        .update({
          last_msg: value,
          last_timestamp: Date.now(),
          seen: true
        })

      setValue("")

    }
  }

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
        onChangeText={text => setValue(text)}
        value={value}
        onSubmitEditing={submit}
        placeholder="Chat..."
        padding={10}
      />
    </KeyboardAvoidingView>
  );
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
    marginBottom: 3,
  }
});
