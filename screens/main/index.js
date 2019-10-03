import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useGlobal } from 'reactn';

import firebase from "../../firebase/index";
import "firebase/firestore";
const DB = firebase.firestore();

import Messages from "./Messages";
import Input from "./Input";
import People_Select from "../people/People";

export default function App({ navigation }) {
  const [DATA, set_DATA] = useGlobal('global_data');
  const [ME, set_ME] = useGlobal('global_me');
  const [FRIEND, set_FRIEND] = useGlobal('global_friend');

  let userID = firebase.auth().currentUser.uid;
  DBs = [];

  useEffect(() => {
    DB.collection("users")
      .doc(userID)
      .onSnapshot(snapshot => {

        new_me = snapshot.data()
        new_me.userID = userID

        set_ME(new_me);

        DB.collection("users")
          .doc(userID)
          .collection("friends")
          .doc(snapshot.data().current_friend)
          .onSnapshot(snapshot => {
            set_FRIEND(snapshot.data());

            DB.collection("messages")
              .doc(snapshot.data().chatID)
              .collection("chat")
              .orderBy("timestamp", "desc")
              .onSnapshot(snapshot => {
                var n = DATA.length;
                var new_DATA = [];

                snapshot.forEach(doc => {
                  let data = doc.data();

                  data.id = n;
                  n++;

                  if (data.from === userID) {
                    data.from = true;
                  } else {
                    data.from = false;
                  }

                  new_DATA.push(data);
                });

                set_DATA(DATA.concat(new_DATA));
              });
          });
      });
  }, [false]);

  return (
    <View style={styles.container}>
      <People_Select to={"People"} navigation={navigation} />
      <Messages/>
      <Input/>
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
