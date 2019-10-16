import React, { useEffect } from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import { useGlobal } from "reactn";

import firebase from "../../firebase/index";
import "firebase/firestore";
const DB = firebase.firestore();

export default function Loading({ navigation }) {
  console.log("globals")
  const [DATA, set_DATA] = useGlobal('data');
  const [ME, set_ME] = useGlobal('me');
  const [FRIEND, set_FRIEND] = useGlobal('friend');
  const [FRIEND_DATA, set_FRIEND_DATA] = useGlobal('friend_data');
  const [UNSUB, set_UNSUB] = useGlobal('unsub');

  const [UNSUB_data, set_UNSUB_data] = useGlobal('unsub_data');
  const [UNSUB_friend, set_UNSUB_friend] = useGlobal('unsub_friend');
  const [UNSUB_friends, set_UNSUB_friends] = useGlobal('unsub_friends');



  useEffect(() => {
    console.log("effect")

    let userID = firebase.auth().currentUser.uid;
    console.log("userID: " + userID)

    try {
      DB.collection('users').doc(userID)
      .update({
        providerData: firebase.auth().currentUser.providerData
      })
    } catch(err) {
      console.log("couldnt update providerData...")
      console.log(err)
    }

    let snapshot = navigation.state.params.snapshot

    let new_me = snapshot.data()
    console.log(new_me)

    new_me.userID = userID
    set_ME(new_me);

    if (new_me.current_friend === '0') {
      console.log("is new user")

      set_FRIEND({
        nickname: "Small Talk"
      })
      set_DATA([{
        id: "0",
        from: false,
        timestamp: Date.now(),
        text: "Welcome to Small Talk, " + new_me.realname + ", to get started press the button at the top, then click Add at the bottom and search for your friends"
      }])

      console.log("navigate loading => App")
      navigation.navigate('App');

    } else {

      if (UNSUB_friend) { UNSUB_friend() }

      set_UNSUB_friend(DB.collection("users")
        .doc(userID)
        .collection("friends")
        .doc(new_me.current_friend)
        .onSnapshot(snapshot => {
          console.log("set_FRIEND")

          let friend = snapshot.data()
          console.log("snapshot id: " + snapshot.id)
          friend.userID = snapshot.id
          console.log(friend)

          set_FRIEND(friend);

          if (UNSUB_data) { UNSUB_data() }

          set_UNSUB_data(DB.collection("messages")
            .doc(friend.chatID)
            .collection("chat")
            .orderBy("timestamp", "desc")
            .onSnapshot(snapshot => {

              var n;

              if (!(DATA)) {
                n = 0
              } else {
                n = DATA.length;
              }

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
              console.log("SET_DATA")

              if (!(DATA)) {
                set_DATA(new_DATA);
              } else {
                set_DATA(DATA.concat(new_DATA));
              }

              console.log("navigate loading => App")
              navigation.navigate('App');

            }));

          console.log("friend chatID: " + friend.chatID)
          console.log("friend uid: " + snapshot.id)
          DB.collection('users').doc(new_me.userID)
            .collection('friends').doc(snapshot.id)
            .update({
              seen: true
            })

        }));
    }

    if (UNSUB_friends) { UNSUB_friends() }

    set_UNSUB_friends(DB.collection("users")
      .doc(userID)
      .collection("friends")
      .onSnapshot(snapshot => {

        var n;

        if (!(FRIEND_DATA)) {
          n = 0
        } else {
          n = FRIEND_DATA.length;
        }

        var new_DATA = [];

        snapshot.forEach(doc => {
          let data = doc.data();

          data.id = n.toString();
          n++;

          data.uid = doc.id

          new_DATA.push(data);
        });

        set_FRIEND_DATA(new_DATA);

      }));

  }, [false]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading Data...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
