import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import config from "../config.json";
import DATA from "./people-test-data.json";

import time from "../../tools/time";

function Item({ item }) {
  return (
    <TouchableOpacity>
    <View style={styles.item}>
      
      <Text style={styles.name}>{item.name}  </Text>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.status}>{item.status}</Text>
      
    </View>
    </TouchableOpacity>
  );
}

export default function People() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
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
});
