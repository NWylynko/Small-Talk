import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Constants from "expo-constants";

import config from '../config.json';

export default function People_Select({ user, navigation, to}) {

  onPress = () => {
    navigation.navigate(to)
  }
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Text>{ user }</Text>
        </TouchableOpacity>
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: Constants.statusBarHeight,
    width: "100%"
  },
  button: {
    alignItems: 'center',
    backgroundColor: config.style.colors.people.button,
    padding: 10,
  },
});