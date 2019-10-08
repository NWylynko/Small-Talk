import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, TextInput, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import Constants from "expo-constants";

import firebase from "../../firebase/index";
import "firebase/firestore";
const DB = firebase.firestore();

export default function NewUser({ navigation }) {

  const [realname, set_realname] = useState("")
  const [username, set_username] = useState("")
  const [unavailabile, set_unavailabile] = useState(false)
  const [Submit, set_submit] = useState('Submit')

  const [loading, set_loading] = useState(false)

  userID = firebase.auth().currentUser.uid;

  function submit() {

    name = username.toLowerCase()

    console.log("submit newuser")

    if (!(loading)) {
      set_loading(true)
    }

    let user_data = {
      realname,
      username: name,
      current_friend: "0",
      username_search: generateSearch(name).concat(generateSearch(name))
    };

    DB.collection('users').doc(userID).set(user_data);

    console.log("done?")

  }

  function tryUsername(name) {
    name = name.toLowerCase()

    if (!(username && realname)) {
      set_submit('Please fill out both fields')
      set_unavailabile(true)
    } else {
      DB.collection('users').where('username', '==', name).get()
      .then(snapshot => {
        if (!(snapshot.empty)) {
          set_submit('That Username is taken, try something different')
          set_unavailabile(true)
        } else {
          set_submit('Submit')
          set_unavailabile(false)
        }
      })
      .catch(error => {
        console.log("error: " + error)
      })
    }

    
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
          onChangeText={text => { set_realname(text); tryUsername(text); }}
          value={realname}
          placeholder={"Name"}
          padding={10}
          autoFocus={true}
          autoCompleteType={'name'}
          textContentType={'name'}
          autoCapitalize={'words'}
        />
        <TextInput
          style={styles.button}
          onChangeText={text => { set_username(text.toLowerCase()); tryUsername(text); }}
          value={username}
          placeholder={"Username"}
          padding={10}
          autoCapitalize={false}
          autoCorrect={false}
          autoCompleteType={username}
          
        />
        <TouchableOpacity style={styles.button} onPress={submit} disabled={unavailabile}>
          <Text>{Submit}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

function generateSearch(name) {
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
