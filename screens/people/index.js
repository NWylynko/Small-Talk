import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
//import { TouchableOpacity } from "react-native-gesture-handler";
import { useGlobal } from "reactn";
import Constants from "expo-constants";
import People_Select from "./People";

import config from "../config.json";
import time from "../../tools/time";

import firebase from "../../firebase/index";
import "firebase/firestore";
const DB = firebase.firestore();

function Item({ user, ME, navigation }) {
  function onPress() {

    DB.collection("users").doc(ME.userID).update({
      current_friend: user.uid
    });

    console.log("navigate People => Home")
    navigation.navigate("Home");
  }

  function onLongPress() {
    console.log("navigate People => Contact")
    navigation.navigate("Contact", { user });
  }

   return (
     <TouchableOpacity
       onPress={onPress}
       onLongPress={onLongPress}
       style={styles.user}
     >
       <Text style={styles.name}>{user.nickname}</Text>
       
     </TouchableOpacity>
   );
    //
   //<Text style={styles.last}>{last.msg}</Text>
   //<Text style={styles.time}>{time(last.timestamp)}</Text>
}

export default function People({ navigation }) {

  const [FRIEND_DATA, set_FRIEND_DATA] = useGlobal('friend_data');
  const [ME, set_ME] = useGlobal('me');

  function onpress_add() {
    console.log("navigate People => Add")
    navigation.navigate("Add");
  }

  function onpress_config() {
    console.log("navigate People => Config")
    navigation.navigate("Config");
  }

  return (
    <View style={styles.container}>
      <People_Select
        to={"Home"}
        navigation={navigation}
      />

      <FlatList
        style={styles.list}
        data={FRIEND_DATA}
        extraData={FRIEND_DATA}
        renderItem={({ item }) => (
          <Item user={item} ME={ME} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
      />

      <View style={styles.icons}>
        <TouchableOpacity onPress={onpress_config}>
          <Text style={styles.icon}>♕ Config </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onpress_add}>
          <Text style={styles.icon}> Add ♔</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginTop: 5
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
  icons: {
    marginBottom: Constants.statusBarHeight,
    flexDirection: "row",
    justifyContent: "center",
    height: 50
  },
  icon: {
    fontSize: 50
  }
});
