import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, View, TextInput, KeyboardAvoidingView } from "react-native";

import firebase from "../firebase";

import Loadpage from "../loading/index"

export default function Login({ navigation }) {

  const [EMAIL_LOGIN, set_EMAIL_LOGIN] = useState();

  const [showOld, set_showOld] = useState(false)
  const [showEmail, set_showEmail] = useState(false)

  const [loading, set_loading] = useState(false)

  function Show_Old() {
    set_showOld(!showOld)

    if (showOld === true) {
      set_showEmail(false)
    }
  }

  function Submit_Email(email, password) {
    set_loading(true)
    console.log("EMAIL_Login LoginPage: " + EMAIL_LOGIN)
    if (EMAIL_LOGIN === 'Login') {
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        set_loading(false)
        alert(errorMessage)
      })
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        set_loading(false)
        alert(errorMessage)
      });
    }
  }


  function Old() {

    if (showOld) {
      return (
        <View style={styles.email}>
          <TouchableOpacity style={[{ marginRight: 5 }, styles.email_button, styles.button]} onPress={() => { set_EMAIL_LOGIN('Login'); set_showEmail(true); }}>
            <Text>Let Me Talk</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[{ marginLeft: 5 }, styles.email_button, styles.button]} onPress={() => { set_EMAIL_LOGIN('Register'); set_showEmail(true); }}>
            <Text>New Around Here</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (null)
    }
  }

  if (loading) {
    return (
      <Loadpage text={"Authenticating..."} />
    )
  } else {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={5}
        style={styles.container}
        behavior="padding"
        enabled
      >
        <TouchableOpacity style={styles.button} disabled>
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
          autoCapitalize={'none'}
          autoCorrect={false}
          autoCompleteType={'email'}
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
        />
        <TextInput
          style={[styles.old, styles.button]}
          onChangeText={text => set_password(text)}
          value={password}
          placeholder={"Password"}
          padding={10}
          onSubmitEditing={() => Submit_Email(email, password)}
          autoCapitalize={'none'}
          autoCorrect={false}
          autoCompleteType={'password'}
          keyboardType={'default'}
          secureTextEntry={true}
          textContentType={'password'}
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
    width: "100%",
    padding: 5,
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
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
