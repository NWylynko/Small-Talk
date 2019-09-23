import React, { Component } from "react";
import { StyleSheet, button, View } from "react-native";
import Constants from "expo-constants";

export default function Debug({ navigation }) {
  return (
    <View style={styles.container}>
      <button title={"Home"} onPress={() => navigation.navigate("Home")} />
      <button title={"People"} onPress={() => navigation.navigate("People")} />
      <button title={"Contact"} onPress={() => navigation.navigate("Contact")} />
      <button title={"Add"} onPress={() => navigation.navigate("Add")} />

      <button title={"Check"} onPress={() => navigation.navigate("Check")} />
      <button title={"Login"} onPress={() => navigation.navigate("Login")} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: Constants.statusBarHeight + 10,
    width: "100%",
    height: "100%",
  },
});
