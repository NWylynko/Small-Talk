import React, { useContext } from "react";
import { StoreContext } from '../store';
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Constants from "expo-constants";
import { useNavigation } from '@react-navigation/native';

import config from "../config.json";

export default function People_Select({to}) {

  const { friendSnapshot } = useContext(StoreContext);
  const navigation = useNavigation()

  function onPress() {
    console.log("People_Select => "+ to)
    navigation.navigate(to);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>{friendSnapshot.nickname}</Text>
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
