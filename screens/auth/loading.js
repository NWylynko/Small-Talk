import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { useGlobal } from "reactn";

import firebase from "../../firebase/index";
import "firebase/firestore";
const DB = firebase.firestore();

export default function Loading({ navigation }) {
  const [DATA, set_DATA] = useGlobal('data');
  const [ME, set_ME] = useGlobal('me');
  const [FRIEND, set_FRIEND] = useGlobal('friend');
  const [FRIEND_DATA, set_FRIEND_DATA] = useGlobal('friend_data');

  let userID = firebase.auth().currentUser.uid;


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

                  data.id = n.toString();
                  n++;

                  if (data.from === userID) {
                    data.from = true;
                  } else {
                    data.from = false;
                  }

                  new_DATA.push(data);
                });

                set_DATA(DATA.concat(new_DATA));
                navigation.navigate('App');
              });
          });
      });

    DB.collection("users")
      .doc(userID)
      .collection("friends")
      .onSnapshot(snapshot => {
        var n = FRIEND_DATA.length;
        var new_DATA = [];

        snapshot.forEach(doc => {
          let data = doc.data();
          data.id = n;
          n++;

          new_DATA.push(data);
        });

        set_FRIEND_DATA(FRIEND_DATA.concat(new_DATA));
      });
  }, [false]);

  return (
    <View style={styles.container}>
      <Text>Loading Data...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: Constants.statusBarHeight,
    width: "100%"
  },
});
