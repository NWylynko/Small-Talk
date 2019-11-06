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
const DB = firebase.firestore();

import Input from "../add/Input";

function Select({ user, ME, navigation, newGroupChatPeople }) {

  const [selected, set_selected] = useState(false)

  function onPress() {
    set_selected(!selected)
    
    if (!selected) {
      // if its not selected add it

      console.log(' not selected ')

      console.log("before: " + newGroupChatPeople)

      newGroupChatPeople.push(user.id)

      console.log("after: " + newGroupChatPeople)
    } else {

      console.log(' selected ')

      console.log("before: " + newGroupChatPeople)

      // if its selected but its pressed again, remove it
      newGroupChatPeople = newGroupChatPeople.filter((value, index, arr) => {
        return value != user.id;
      });

      console.log("after: " + newGroupChatPeople)

    }
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.user, {borderWidth: 3, borderColor: selected ? config.style.colors.people.button : "black"}]}
    >
      <Text style={styles.name}>{selected ? "✔" : null} {user.nickname}</Text>
    </TouchableOpacity>
  );
}

function Non_Select({ user, ME, navigation }) {

  function onPress() {

    DB.collection("users").doc(ME.userID).update({
      current_friend: user.id
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
      style={[styles.user, {borderWidth: 3}]}
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

function Item({ select, user, ME, navigation, newGroupChatPeople }) {

  console.log(user)

  if (select) {
    return (
      <Select user={user} ME={ME} navigation={navigation} newGroupChatPeople={newGroupChatPeople} />
    );
  } else {
    return (
      <Non_Select user={user} ME={ME} navigation={navigation} />
    );
  }

}

export default function People({ navigation }) {

  //const [global_FRIEND_DATA, global_set_FRIEND_DATA] = useGlobal('friend_data');
  const [FRIEND_DATA, set_FRIEND_DATA] = useGlobal('friend_data');
  const [ME, set_ME] = useGlobal('me');

  //console.log("sorted friends list...")
  FRIEND_DATA.sort((a, b) => (a.last_timestamp > b.last_timestamp) ? 1 : -1).reverse()

  //const [FRIEND_DATA, set_FRIEND_DATA] = useState(global_FRIEND_DATA);
  const [search, set_search] = useState('')

  let newGroupChatPeople = []

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
      <View>
        <People_Select
          to={"Home"}
          navigation={navigation}
        />
      </View>

      <FlatList
        style={styles.list}
        data={FRIEND_DATA}
        extraData={FRIEND_DATA}
        renderItem={({ item }) => (
          <Item select={false} user={item} ME={ME} navigation={navigation} newGroupChatPeople={newGroupChatPeople} />
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
