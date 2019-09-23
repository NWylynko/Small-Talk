import React from "react";
import { TextInput, View } from "react-native";

import firebase from "../../firebase/index";

export default function Input({ navigation }) {
  const [value_username, onchange_username] = React.useState("");
  const [value_password, onchange_password] = React.useState("");

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      navigation.navigate('App');
    }
  });

  function onSubmit() {

    firebase.auth().signInWithEmailAndPassword(value_username, value_password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
    })
  }

  return (
    <View>
      <TextInput
        style={{ borderWidth: 2 }}
        onChangeText={text => onchange_username(text)}
        value={value_username}
      />
      <TextInput
        style={{ borderWidth: 2 }}
        onChangeText={text => onchange_password(text)}
        value={value_password}
        onSubmitEditing={onSubmit}
      />
    </View>
  )
}

