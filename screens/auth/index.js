import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, View, TextInput, KeyboardAvoidingView } from "react-native";
import Constants from "expo-constants";

import firebase from "../../firebase/index";

import * as GoogleSignIn from 'expo-google-sign-in';
import * as AppAuth from 'expo-app-auth';

// This value should contain your REVERSE_CLIENT_ID
const { URLSchemes } = AppAuth;

export default function Login({ navigation }) {

  const [EMAIL_LOGIN, set_EMAIL_LOGIN] = useState();

  const [showOld, set_showOld] = useState(false)
  const [showEmail, set_showEmail] = useState(false)

  async function Google() {

    try {
      await GoogleSignIn.initAsync({ clientId: URLSchemes });
    } catch ({ message }) {
      console.error('GoogleSignIn.initAsync(): ' + message);
    }

    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        // Build Firebase credential with the Google access token.
        const credential = firebase.auth.GoogleAuthProvider.credential(token);

        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).catch((error) => {
          // Handle Errors here.
        })
      }
    }
    catch ({ message }) {
      console.error('login: Error:' + message);
    }
  }

  function Show_Old() {
    set_showOld(!showOld)

    if (showOld === true) {
      set_showEmail(false)
    }
  }

  function Email_Press() {
    console.log(EMAIL_LOGIN);
    set_showEmail(true)
  }

  function Submit_Email(email, password) {
    console.log("EMAIL_Login LoginPage: " + EMAIL_LOGIN)
    if (EMAIL_LOGIN === 'login') {
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        alert(errorMessage)
      })
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        alert(errorMessage)
      });
    }
  }


  function Old() {

    if (showOld) {
      return (
        <View style={styles.email}>
          <TouchableOpacity style={[{ marginRight: 5 }, styles.email_button, styles.button]} onPress={() => { set_EMAIL_LOGIN('login'); Email_Press(); }}>
            <Text>Let Me Talk</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[{ marginLeft: 5 }, styles.email_button, styles.button]} onPress={() => { set_EMAIL_LOGIN('Register'); Email_Press(); }}>
            <Text>New Around Here</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (null)
    }
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={5}
      style={styles.container}
      behavior="padding"
      enabled
    >
      <TouchableOpacity style={styles.button} onPress={Google}>
        <Text>Login With Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={Show_Old}>
        <Text>Old People Login</Text>
      </TouchableOpacity>
      <Old />
      <Email show={showEmail} EMAIL_LOGIN={EMAIL_LOGIN} Submit_Email={Submit_Email} />
    </KeyboardAvoidingView>
  );
}


function Email({ show, EMAIL_LOGIN, Submit_Email }) {

  const [email, set_email] = useState('')
  const [password, set_password] = useState('')

  if (show) {
    return (
      <View style={styles.oldcontainer}>
        <TextInput
          style={[styles.old, styles.button]}
          onChangeText={text => set_email(text)}
          value={email}
          placeholder={"Email"}
          padding={10}
          autoFocus={true}
        />
        <TextInput
          style={[styles.old, styles.button]}
          onChangeText={text => set_password(text)}
          value={password}
          placeholder={"Password"}
          padding={10}
          onSubmitEditing={() => Submit_Email(email, password)}
        />
        <TouchableOpacity style={[styles.old, styles.button]} onPress={() => { Submit_Email(email, password) }}>
          <Text>{EMAIL_LOGIN}</Text>
        </TouchableOpacity>
      </View>
    )
  } else {
    return (null)
  }
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
  email: {
    flexDirection: "row",
    justifyContent: "center",
  },
  email_button: {
    width: "45%",
  },
  old: {
    width: "90%",
  },
  oldcontainer: {
    alignItems: "center",
  }
});
