import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text } from "react-native";

import config from "../config.json";
import DATA from "./Messages-test-data.json";

//import firebase from "../../firebase/index";

//const DB = firebase.database();

import time from "../../tools/time";

function Item({ msg, user, timestamp }) {
  return (
    <View style={UserStyle(user)}>
      <Text style={styles.msg}>{msg}</Text>
      <Text style={styles.time}>{time(timestamp)}</Text>
    </View>
  );
}

export default function Messages() {

  //DATA = {}

  //var messages = DB.ref('messages/' + firebase.auth().currentUser.uid);
  //messages.on('value', function(snapshot) {
  //  console.log(snapshot)
  //});

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item msg={item.msg} user={item.user} timestamp={item.timestamp} />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 5
  },
  time: {
    textAlign: "right"
  },
  msg: {
    fontSize: 16
  }
});

function UserStyle(user) {
  if (user) {
    return {
      backgroundColor: config.style.colors.messages.message.me,
      padding: 10,
      marginLeft: 50,
      marginVertical: 5,
      marginHorizontal: 10
    };
  } else {
    return {
      backgroundColor: config.style.colors.messages.message.them,
      padding: 10,
      marginRight: 50,
      marginVertical: 5,
      marginHorizontal: 10
    };
  }
}
