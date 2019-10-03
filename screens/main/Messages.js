import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, Button } from "react-native";
import { useGlobal } from 'reactn';

import config from "../config.json";

import time from "../../tools/time";

function Item({ item }) {

  return (
    <View style={UserStyle(item.from)}>
      <Text style={styles.msg}>{item.text}</Text>
      <Text style={styles.time}>{time(item.timestamp)}</Text>
    </View>
  );
}

export default function Messages() {

  const [DATA, set_DATA] = useGlobal('global_data');

  return (
    <SafeAreaView style={styles.container}>
      
      <FlatList
        data={DATA}
        extraData={DATA}
        renderItem={({ item }) => (
          <Item item={item} />
        )}
        keyExtractor={item => item.id}
        inverted
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
  if (from) {
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
