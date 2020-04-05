import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import Messages from "./Messages";
import Input from "./Input";
import People_Select from "../people/People";
import Images from "./images";

export default function App({ navigation }) {

  return (
    <View style={styles.container}>
      <People_Select to={"People"} />
      <Messages />
      <Input />
      <Images />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: Constants.statusBarHeight + 5
  }
});
