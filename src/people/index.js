import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { useNavigation } from '@react-navigation/native';
//import { TouchableOpacity } from "react-native-gesture-handler";
import { StoreContext } from '../store';
import Constants from "expo-constants";
import People_Select from "./People";

import config from "../config.json";
import time from "../tools/time";
import difference from '../tools/search';

import firebase from "../firebase";
const DB = firebase.firestore();

import Input from "../add/Input";

function SeenText({ style, seen, last_msg }) {
  if (!seen) {
    return (
      <Text style={[style, { fontWeight: 'bold' }]}>{last_msg}</Text>
    )
  } else {
    return (
      <Text style={style}>{last_msg}</Text>
    )
  }
}

function Item({ person }) {

  const { user } = useContext(StoreContext);
  const navigation = useNavigation();

  function onPress() {

    DB.collection("users").doc(user.uid).update({
      current_friend: person.id
    });

    console.log("People => Home")
    navigation.navigate("Home");
  }

  function onLongPress() {
    console.log("People => Contact")
    navigation.navigate("Contact", { person });
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.user, {borderWidth: 3}]}
    >
      <Text style={styles.name}>{person.nickname}</Text>
      <SeenText style={styles.last} seen={person.seen} last_msg={person.last_msg} />
      <Text style={styles.time}>{time(person.last_timestamp)}</Text>
    </TouchableOpacity>
  );

}

export default function People() {

  const { friendsSnapshot } = useContext(StoreContext);
  const navigation = useNavigation();

  function onpress_add() {
    console.log("People => Add")
    navigation.navigate("Add");
  }

  function onpress_config() {
    console.log("People => Config")
    navigation.navigate("Config");
  }

  return (
    <View style={styles.container}>
      <View>
        <People_Select
          to={"Home"}
        />
      </View>

      <FlatList
        style={styles.list}
        data={friendsSnapshot}
        extraData={friendsSnapshot}
        renderItem={({ item }) => (
          <Item person={item} />
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
