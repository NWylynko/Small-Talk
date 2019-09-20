import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text } from "react-native";

import config from "../config.json";

const DATA = [
  {
    id: "1",
    user: true,
    msg:
      "ksldjfgh iouasdfh giuopadsfhgiouafdguiopahsdiogj baskodjf hiauhs dfpiua hsdfkjohasdjk lfahslk df",
    timestamp: 24356
  },
  {
    id: "2",
    user: false,
    msg: "Second Item",
    timestamp: 2435645
  },
  {
    id: "3",
    user: false,
    msg:
      "aiodugh ioausdf gakj sdfghioasdghiasdfg iohasdfghasid ofgaiosdf goiuas dfgioa sdfogiasiofdg aoihdf goia fsdgoia s",
    timestamp: 243565646
  },
  {
    id: "4",
    user: true,
    msg: "Forth Item",
    timestamp: 24356456745
  },
  {
    id: "5",
    user: true,
    msg: "Yeet Item",
    timestamp: 24356456456456
  }
];

function time(timestamp) {
  var today = new Date(timestamp);
  return today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
}

function Item({ msg, user, timestamp }) {
  return (
    <View style={UserStyle(user)}>
      <Text style={styles.msg}>{msg}</Text>
      <Text style={styles.time}>{time(timestamp)}</Text>
    </View>
  );
}

export default function Messages() {
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
    marginTop: 5,
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
