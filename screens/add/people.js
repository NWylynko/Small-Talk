import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import config from "../config.json";
//import DATA from "./people-test-data.json";

import time from "../../tools/time";

import firebase from "../../firebase/index";
import "firebase/firestore";
const DB = firebase.firestore();

function Item({ item }) {

  function press(uid) {

    const userID = firebase.auth().currentUser.uid

    console.log("friend id: " + uid)

    DB.collection('users').doc(userID)
      .collection('friends').doc(uid).get()
      .then(doc => {
        if (!doc.exists) {
          DB.collection('messages').add({})
            .then(ref => {
              console.log("messages id: " + ref.id)
              console.log("user id: " + userID)

              DB.collection('users').doc(userID)
                .collection('friends').doc(uid)
                .set({
                  chatID: ref.id,
                  nickname: item.realname,
                  status: "friend"
                })

              DB.collection('users').doc(uid)
                .collection('friends').doc(userID)
                .set({
                  chatID: ref.id,
                  nickname: item.realname,
                  status: "friend"
                })


            });
        }

        DB.collection('users').doc(userID)
          .update({ current_friend: uid })
      })
      .catch(err => {
        console.log('Error getting document', err);
        alert(err)
      });


  }

  return (
    <TouchableOpacity onPress={() => { press(item.uid) }}>
      <View style={styles.item}>

        <Text style={styles.name}>{item.realname}</Text>
        <Text style={styles.username}>{item.username}</Text>

      </View>
    </TouchableOpacity>
  );
}

export default function People({ DATA, loading }) {

  if (loading) {

    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading People...</Text>
      </View>
    );

  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          extraData={DATA}
          renderItem={({ item }) => (
            <Item item={item} />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  item: {
    marginVertical: 2.5,
    marginHorizontal: 5,
    borderWidth: 3,
    borderColor: config.style.colors.input.border,
    flexDirection: "row",
    padding: 10
  },
  name: {
    fontSize: 25
  },
  username: {
    fontSize: 15,
    position: "absolute",
    bottom: 0,
    right: 25,
    color: "lightgrey"
  },
  status: {
    fontSize: 20,
    position: "absolute",
    right: 5,
  },
  loading_container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
