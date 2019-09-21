import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image
} from "react-native";

import People_Select from "./People";

import config from "../config.json";
import time from "../../tools/time";

import DATA from "./index-test-data.json";
import { TouchableOpacity } from "react-native-gesture-handler";



function Item({ user, last, navigation }) {

  function onPress(){
    console.log(user.id)
  }

  function onLongPress(){
    navigation.navigate("Contact")
  }

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={styles.user}>
      <Text style={styles.name}>{user.nickname}</Text>
      <Text style={styles.last}>{last.msg}</Text>
      <Text style={styles.time}>{time(last.timestamp)}</Text>
    </TouchableOpacity>
  );
}

export default function People(props) {
  function onpress() {
    console.log("yeet");
  }

  return (
    <SafeAreaView style={styles.container}>

      <People_Select
        style={styles.button}
        user={"Person"}
        to={"Home"}
        navigation={props.navigation}
      />

      <FlatList
        style={styles.list}
        data={DATA}
        renderItem={({ item }) => <Item user={item.user} last={item.last} navigation={props.navigation} />}
        keyExtractor={item => item.id}
      />

      <View style={styles.icons}>
        <TouchableOpacity onPress={onpress}>
          <Text style={styles.icon} >♕ Config  </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onpress}>
          <Text style={styles.icon} >  Add ♔</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff"
  },
  list: {
    marginTop: 5,
  },
  name: {
    fontSize: 20
  },
  user: {
    borderWidth: 3,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 10
  },
  time: {
    textAlign: "right"
  },
  button: {
    position: "absolute",
    top: 0
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    height: 50,
  },
  icon: {
    fontSize: 50,
  }
});
