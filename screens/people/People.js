import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Constants from "expo-constants";

import config from "../config.json";

export default function People_Select({ current, navigation, to, FRIEND }) {

  function onPress() {
    navigation.navigate(to, { FRIEND });
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>{FRIEND.nickname}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: Constants.statusBarHeight + 2,
    width: "100%"
  },
  button: {
    alignItems: "center",
    backgroundColor: config.style.colors.people.button,
    padding: 10
  }
});
