import React from "react";
import { StyleSheet, View } from "react-native";

import Messages from "./Messages";
import Input from "./Input";
import People_Select from "../people/People";

export default function App({ navigation }) {
  return (
    <View style={styles.container}>
      <People_Select to={"People"} navigation={navigation} />
      <Messages />
      <Input />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
