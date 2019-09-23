import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default function check({ navigation }) {
  bootstrapAsync();

  // Fetch the token from storage then navigate to our appropriate place
  async function bootstrapAsync() {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigation.navigate(userToken ? 'App' : 'Login');
  };

  // Render any loading content that you like here
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
}