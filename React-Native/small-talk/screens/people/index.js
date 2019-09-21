import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text } from "react-native";

import People_Select from "./People";

import config from "../config.json";

import DATA from "./index-test-data.json";

function time(timestamp) {
  var today = new Date(timestamp);
  return today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
}

function Item({ user, last }) {
  return (
    <View style={styles.user}>
      <Text style={styles.name}>{user.nickname}</Text>
      <Text style={styles.last}>{last.msg}</Text>
      <Text style={styles.time}>{time(last.timestamp)}</Text>
    </View>
  );
}

export default function People(props) {
  return (
    <SafeAreaView style={styles.container}>
      <People_Select style={styles.button} user={"Person"} to={"Home"} navigation={props.navigation} />
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item user={item.user} last={item.last} />
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
    height: "100%",
    marginTop: 5,
    position: 'absolute',
    bottom:0,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 20,
  },
  user: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  time: {
    textAlign: "right",
  },
  button: {
    position: 'absolute',
    top:0
  }
});
