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

function Item({ user, navigation }) {
  function onPress() {
    navigation.navigate("Home", { user });
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
  const [FRIEND, set_FRIEND] = useGlobal('friend');

  useEffect(() => {
    DB.collection("users")
      .doc(ME.userID)
      .collection("friends")
      .onSnapshot(snapshot => {
        var n = FRIEND_DATA.length;
        var new_DATA = [];

        snapshot.forEach(doc => {
          let data = doc.data();
          console.log(data)
          data.id = n;
          n++;

          new_DATA.push(data);
        });

        console.log(FRIEND_DATA.concat(new_DATA));

        set_FRIEND_DATA(FRIEND_DATA.concat(new_DATA));
      });
  }, [false]);

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
          <Item user={item} navigation={navigation} />
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
