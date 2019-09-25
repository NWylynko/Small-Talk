import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import firebase from "../../firebase/index";
import "firebase/firestore";
const DB = firebase.firestore();

import Messages from "./Messages";
import Input from "./Input";
import People_Select from "../people/People";

export default function App({ navigation }) {
  current = {
    userID: firebase.auth().currentUser.uid,
    chatID: "OICKPW4v48g7asNTCD3u",
  };

  const [DATA, set_DATA] = useState([]);
  const [FRIEND, set_FRIEND] = useState({});

  useEffect(() => {

    DB.collection("users")
      .doc(current.userID)
      .collection("friends")
      .doc("TIeAxlxDwiUi7QK8bBh4teC4OmJ2")
      .onSnapshot(snapshot => {
        set_FRIEND(snapshot.data())
        console.log(snapshot.data())
      })

    DB.collection("messages")
      .doc(current.chatID)
      .collection("chat")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        n = DATA.length;
        new_DATA = [];

        snapshot.forEach(doc => {
          data = doc.data();

          data.id = n;
          n++;

          if (data.from === current.userID) {
            data.from = true;
          } else {
            data.from = false;
          }

          new_DATA.push(data);
        });

        set_DATA(DATA.concat(new_DATA));

      });
  }, [false]);

  return (
    <View style={styles.container}>
      <People_Select current={current} to={"People"} navigation={navigation} FRIEND={FRIEND} />
      <Messages current={current} DATA={DATA} />
      <Input current={current} />
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
