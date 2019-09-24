import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, Button } from "react-native";

import config from "../config.json";
//import DATA from "./Messages-test-data.json";

import firebase from "../../firebase/index";
import 'firebase/firestore'

//const DB = firebase.database();

import time from "../../tools/time";

function Item({ item }) {

  //console.log(item)

  return (
    <View style={UserStyle(item.from)}>
      <Text style={styles.msg}>{item.text}</Text>
      <Text style={styles.time}>{time(item.timestamp)}</Text>
    </View>
  );
}

export default function Messages({ DATA }) {

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

function UserStyle(from) {
  if (!(from)) {
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
