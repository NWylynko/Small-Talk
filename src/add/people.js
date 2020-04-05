import React, { useContext } from "react";
import { StoreContext } from '../store';
import { SafeAreaView, View, FlatList, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from "react-native";
//import { TouchableOpacity } from "react-native-gesture-handler";

import config from "../config.json";
//import DATA from "./people-test-data.json";

import time from "../tools/time";

import firebase from "../firebase";
const DB = firebase.firestore();
const realDB = firebase.database();

function Item({ item }) {

  const { user, userSnapshot } = useContext(StoreContext);

  function press(uid) {

    DB.collection('users').doc(user.uid)
      .collection('friends').doc(uid).get()
      .then(doc => {
        if (!doc.exists) {

          const ref = realDB.ref("msg").push({});

          const chatID = ref.key

          DB.collection('users').doc(user.uid)
            .collection('friends').doc(uid)
            .set({
              chatID,
              nickname: item.realname,
              status: "friend"
            })

          DB.collection('users').doc(uid)
            .collection('friends').doc(user.uid)
            .set({
              chatID,
              nickname: userSnapshot.realname,
              status: "friend"
            })


        }

        DB.collection('users').doc(user.uid)
          .update({ current_friend: uid })
      })
      .catch(err => {
        console.log('Error getting document', err);
        alert("soz something didnt work xx")
      });


  }

  return (
    <TouchableOpacity onPress={() => { press(item.id) }}>
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
