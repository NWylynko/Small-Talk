import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator
} from "react-native";
import Constants from "expo-constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useGlobal } from 'reactn';

import config from "../config.json";
import time from "../../tools/time";

import firebase from "../../firebase/index";
import "firebase/firestore";
const DB = firebase.firestore();

export default function Contact({ navigation }) {

  const [CONTACT, set_CONTACT] = useState(navigation.state.params.user);
  const [nickname, onChangenickname] = useState(CONTACT.nickname);
  const [loading, set_loading] = useState(false)

  const [ME, set_ME] = useGlobal('me')

  console.log(CONTACT)

  useEffect(() => {
    set_loading(true)
    DB.collection("users")
      .doc(CONTACT.uid)
      .onSnapshot(snapshot => {
        const data = snapshot.data()
        new_contact = CONTACT
        new_contact.username = data.username
        new_contact.realname = data.realname
        console.log(new_contact)
        set_CONTACT(new_contact)
        set_loading(false)
      });
  }, [false]);


  function onPress_Apply() {
    console.log(nickname)

    DB.collection('users').doc(ME.userID)
      .collection('friends').doc(CONTACT.uid)
      .update({ nickname })

    navigation.goBack();
  }

  function onPress_Cancel() {
    navigation.goBack();
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Contact...</Text>
      </View>
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.keyboard} behavior="padding" enabled>
          <Text style={styles.name}>{CONTACT.realname}</Text>
          <Text style={styles.username}>{CONTACT.username}</Text>
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <Text>Nickname: </Text>
            <TextInput
              style={styles.nickname}
              onChangeText={text => onChangenickname(text)}
              value={nickname}
              paddingLeft={10}
            />
          </View>
          <View style={styles.buttons_view}>
            <TouchableOpacity style={styles.buttons} onPress={onPress_Cancel}>
              <Text style={styles.button}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={onPress_Apply}>
              <Text style={styles.button}>Apply</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    width: "100%",
    height: "100%"
  },
  keyboard: {
    width: "100%"
  },
  name: {
    fontSize: 50,
    textAlign: "center"
  },
  username: {
    fontSize: 30,
    color: "lightgrey",
    textAlign: "center"
  },
  nickname: {
    borderWidth: 2,
    width: "75%"
  },
  buttons_view: {
    flexDirection: "row",
    alignSelf: "center"
  },
  button: {
    fontSize: 25,
    padding: 5
  },
  buttons: {
    marginVertical: 10,
    marginHorizontal: 5,
    borderWidth: 3
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
