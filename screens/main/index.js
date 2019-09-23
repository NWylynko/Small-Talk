import React from "react";
import { StyleSheet, Text, View } from "react-native";

import firebase from "../../firebase/index";
const DB = firebase.database();

import Messages from "./Messages";
import Input from "./Input";
import People_Select from "../people/People";

export default function App({ navigation }) {

  const userID = firebase.auth().currentUser.uid;

  console.log("users/" + userID)

  firebase.database().ref('users/' + userID).set({
    nickname: "L"
  });

  firebase.database().ref('users/' + userID).on('value', (snapshot) => {
    console.log(snapshot)
    alert(snapshot)
  });

  return (
    <View style={styles.container}>
      <People_Select user={"Person"} to={"People"} navigation={navigation} />
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
