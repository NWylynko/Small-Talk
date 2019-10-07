import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import config from "../config.json";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Back({ navigation, search_unsub }) {

  function unsub() {
    navigation.goBack();
    if (search_unsub) {
      search_unsub();
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={unsub} >
      <Text style={styles.back}>Back</Text>
    </TouchableOpacity >
  );
}

const styles = StyleSheet.create({
  container: {
    width: "20%",
    height: 50,
    borderColor: config.style.colors.add.input.border,
    borderWidth: 3,
    marginLeft: 5,
  },
  back: {
    fontSize: 32,
    padding: 5
  }
});
