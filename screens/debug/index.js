import React, { Component } from "react";
import { StyleSheet, Button, View } from "react-native";
import Constants from "expo-constants";

export default function Debug({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title={"Home"} onPress={() => navigation.navigate("Home")} />
      <Button title={"People"} onPress={() => navigation.navigate("People")} />
      <Button title={"Contact"} onPress={() => navigation.navigate("Contact")} />
      <Button title={"Add"} onPress={() => navigation.navigate("Add")} />

      <Button title={"Check"} onPress={() => navigation.navigate("Check")} />
      <Button title={"Login"} onPress={() => navigation.navigate("Login")} />
      <Button title={"Fake Login"} onPress={() => navigation.navigate("Fake_Login")} />

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
