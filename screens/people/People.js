import React from "react";
import { useGlobal } from 'reactn';
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Constants from "expo-constants";

import config from "../config.json";

export default function People_Select({ navigation, to}) {

  const [ME, set_ME] = useGlobal('me');
  const [FRIEND, set_FRIEND] = useGlobal('friend');

  function onPress() {
    console.log("navigate People_Select => "+ to)
    navigation.navigate(to, { FRIEND, ME });
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
