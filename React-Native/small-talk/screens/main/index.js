import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Messages from "./Messages";
import Input from "./Input";
import People_Select from "../people/People";

export default function App(props) {

  return (
    <View style={styles.container}>
      <People_Select user={"Person"} to={"People"} navigation={props.navigation} />
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
