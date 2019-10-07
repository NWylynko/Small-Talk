import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, TextInput, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import Constants from "expo-constants";

import firebase from "../../firebase/index";
import "firebase/firestore";
const DB = firebase.firestore();

export default function NewUser({ navigation }) {

  const [realname, set_realname] = useState(false)
  const [username, set_showEmail] = useState(false)

  const [loading, set_loading] = useState(false)

  userID = firebase.auth().currentUser.uid;

  function submit() {

    console.log("submit newuser")

    if (!(loading)) {
      set_loading(true)
    }
    
    let user_data = {
      realname,
      username,
      current_friend: "0",
      username_search: generateSearch(username).concat(generateSearch(realname))
    };
    
    DB.collection('users').doc(userID).set(user_data);

    console.log("done?")

  }

  if (loading) {
    return (
      <View style={styles.loading_container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Creating New User...</Text>
      </View>
    )
  } else {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={5}
        style={styles.container}
        behavior="padding"
        enabled
      >
        <TextInput
          style={styles.button}
          onChangeText={text => set_realname(text)}
          value={realname}
          placeholder={"Name"}
          padding={10}
          autoFocus={true}
        />
        <TextInput
          style={styles.button}
          onChangeText={text => set_showEmail(text)}
          value={username}
          placeholder={"Username"}
          padding={10}
        />
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}


function generateSearch(name) {
  name = name.toLowerCase()
  const arr = []
  let short = ''
  name.split('').forEach((character) => {
    short += character
    arr.push(short)
  })
  return arr
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: Constants.statusBarHeight,
    width: "100%",
    padding: 5,
    marginBottom: Constants.statusBarHeight,
  },
  button: {
    alignItems: "center",
    padding: 10,
    borderColor: "#333333",
    borderWidth: 4,
    marginBottom: 10,
  },
  loading_container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  }
});
