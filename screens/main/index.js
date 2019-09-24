import React from "react";
import { StyleSheet, Text, View } from "react-native";

import firebase from "../../firebase/index";
import 'firebase/firestore';

import Messages from "./Messages";
import Input from "./Input";
import People_Select from "../people/People";

export default function App({ navigation }) {

  current = {
    userID: firebase.auth().currentUser.uid,
    chatID: "OICKPW4v48g7asNTCD3u",
  }

  const [ DATA, update ] = React.useState([])

  const DB = firebase.firestore()

  DB.collection("messages").doc(current.chatID)
    .collection("chat")
    .onSnapshot((snapshot) => {

      n = 0
      current_DATA = []

      snapshot.forEach((doc) => {

        data = doc.data();

        data.id = n;
        n++;

        if (data.from === current.userID) {
          data.from = true
        } else {
          data.from = false
        }

        current_DATA.push(data);

      });

    console.log(DATA.concat(current_DATA))

    update(DATA.concat(current_DATA))
  });



  return (
    <View style={styles.container}>
      <People_Select current={current} to={"People"} navigation={navigation} />
      <Messages DATA={DATA} />
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
