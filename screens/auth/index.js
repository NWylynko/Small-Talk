import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Constants from "expo-constants";

import firebase from "../../firebase/index";

import * as GoogleSignIn from 'expo-google-sign-in';
import * as AppAuth from 'expo-app-auth';

// This value should contain your REVERSE_CLIENT_ID
const { URLSchemes } = AppAuth;

export default function Login({ navigation }) {

    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        navigation.navigate('Loading');
      }
    });

  async function onPress() {

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
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>Login With Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: Constants.statusBarHeight,
    width: "100%"
  },
  button: {
    alignItems: "center",
    padding: 10,
    borderColor: "#333333",
    borderWidth: 4
  }
});
