import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import firebase from "../../firebase/index";

import * as SecureStore from 'expo-secure-store';

export default function check({ navigation }) {

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      navigation.navigate('App');
    }
  });

  bootstrapAsync();

  async function bootstrapAsync() {
    const credential = await SecureStore.getItemAsync('credential')

    if(__DEV__) {
      navigation.navigate('App');
    }

    else if (credential) {
      firebase.auth().signInWithCredential(credential).catch((error) => {
        navigation.navigate('Login');
      })
    }

    else {
      navigation.navigate('Login');
    }
    
  };

  // Render any loading content that you like here
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
}