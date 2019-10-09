import React, { useState, useEffect } from "react";
import { useGlobal } from 'reactn';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
//import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";

import firebase from "../../firebase/index";
import "firebase/firestore";
const DB = firebase.firestore();

export default function Config({ navigation }) {

  const [UNSUB_me, set_UNSUB_me] = useGlobal('unsub_me');
  const [UNSUB_data, set_UNSUB_data] = useGlobal('unsub_data');
  const [UNSUB_friend, set_UNSUB_friend] = useGlobal('unsub_friend');
  const [UNSUB_friends, set_UNSUB_friends] = useGlobal('unsub_friends');
  const [ME, set_ME] = useGlobal('me');

  const [loading, set_loading] = useState(false)

  const [realname, set_realname] = useState(ME.realname)
  const [username, set_username] = useState(ME.username)

  function done() {
    DB.collection('users').doc(ME.userID)
    .update({
      realname,
      username
    })
  }

  function logout() {

    if (UNSUB_me) { UNSUB_me() }
    if (UNSUB_data) { UNSUB_data() }
    if (UNSUB_friend) { UNSUB_friend() }
    if (UNSUB_friends) { UNSUB_friends() }

    firebase.auth().signOut().then(function () {

      console.log("navigate Config => Login")
      navigation.navigate("Login");
    }).catch(function (error) {
      alert(error)
    });
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>

        <Line text={'Real Name'} option={realname} set={set_realname} />
        <Line text={' Username'} option={username} set={set_username} />

        <TouchableOpacity style={[styles.button, {margin: 5, width: "50%"}]} onPress={done}>
          <Text>Done</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logout]} onPress={logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function Line({ text, option, set }) {
  return (
  <View style={{ flexDirection: "row", alignSelf: "center" }}>
    <Text>{text}: </Text>
    <TextInput
      style={[styles.button, styles.line]}
      onChangeText={text => set(text)}
      value={option}
      paddingLeft={10}
    />
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: Constants.statusBarHeight,
    marginBottom: Constants.statusBarHeight,
    width: "100%",
    height: "100%"
  },
  button: {
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    textAlign: "center",
    padding: 10,
    borderColor: "#333333",
    borderWidth: 4,
    width: "100%",
    alignSelf: "center",
    position: "relative",
    left: 10
  },
  logout: {
    borderColor: "#b32727",
    borderWidth: 6,
    position: "absolute",
    bottom: 0,
    padding: 5,

  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  line: {
    borderWidth: 2,
    width: "75%",
    marginTop: 5
  },
});

