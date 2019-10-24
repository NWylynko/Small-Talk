import React from "react";
//import { useGlobal } from 'reactn';
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

import config from "../config.json";

export default function Images({ navigation, to}) {

  //const [ME, set_ME] = useGlobal('me');
  //const [FRIEND, set_FRIEND] = useGlobal('friend');

  function onPressSelect() {
    console.log("brahhh moment")
  }
  function onPressTake() {
    console.log("brahhh moment")
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPressSelect}>
        <Text>Select Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressTake}>
        <Text>Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 10,
    width: "100%",
    flexDirection: "row"
  },
  button: {
    alignItems: "center",
    backgroundColor: config.style.colors.people.button,
    padding: 10,
    flex: 1,
    margin: 2
  }
});