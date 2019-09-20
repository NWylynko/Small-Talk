import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Messages from "./components/main/Messages";
import Input from "./components/main/Input";
import People_Select from "./components/main/People";

export default function App() {
  return (
    <View style={styles.container}>
      <People_Select user={"Person"} />
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
