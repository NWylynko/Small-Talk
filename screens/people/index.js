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
import difference from '../../tools/search';

import firebase from "../../firebase/index";
import "firebase/firestore";
const DB = firebase.firestore();

import Input from "../add/Input";

function Item({ user, ME, navigation }) {

  console.log(user)

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
      <SeenText style={styles.last} seen={user.seen} last_msg={user.last_msg} />
      <Text style={styles.time}>{time(user.last_timestamp)}</Text>
    </TouchableOpacity>
  );
}

function SeenText({ style, seen, last_msg }) {
  if (!(seen)) {
    return (
      <Text style={[style, { fontWeight: 'bold' }]}>{last_msg}</Text>
    )
  } else {
    return (
      <Text style={style}>{last_msg}</Text>
    )
  }
} 

export default function People({ navigation }) {

  //const [global_FRIEND_DATA, global_set_FRIEND_DATA] = useGlobal('friend_data');
  const [FRIEND_DATA, set_FRIEND_DATA] = useGlobal('friend_data');
  const [ME, set_ME] = useGlobal('me');

  //const [FRIEND_DATA, set_FRIEND_DATA] = useState(global_FRIEND_DATA);
  const [search, set_search] = useState('')

  function onpress_add() {
    console.log("navigate People => Add")
    navigation.navigate("Add");
  }

  function onpress_config() {
    console.log("navigate People => Config")
    navigation.navigate("Config");
  }

  function onSearch(text) {

    data = FRIEND_DATA

    data.forEach((item) => {
      item.search = difference(text, item.nickname)
    })

    data.sort((a, b) => (a.search > b.search) ? 1 : -1)

    set_FRIEND_DATA(data)
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

//<Input inputValue={search} set_inputValue={set_search} onSubmit={onSearch} />

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
  },
  last: {
    paddingLeft: 10
  }
});
