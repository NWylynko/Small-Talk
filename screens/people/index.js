import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useGlobal } from "reactn";

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

    navigation.navigate("Home");
  }

  function onLongPress() {
    friendID = user.id;
    navigation.navigate("Contact", { friendID });
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
    navigation.navigate("Add");
  }

  function onpress_config() {
    navigation.navigate("Config");
  }

  return (
    <SafeAreaView style={styles.container}>
      <People_Select
        style={styles.button}
        user={"Person"}
        to={"Home"}
        navigation={navigation}
        FRIEND={navigation.state.params.FRIEND}
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
  button: {
    position: "absolute",
    top: 0
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    height: 50
  },
  icon: {
    fontSize: 50
  }
});
