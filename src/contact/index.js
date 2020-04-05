import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
//import { TouchableOpacity } from "react-native-gesture-handler";
import { StoreContext } from '../store';

import firebase from "../firebase";
const DB = firebase.firestore();

export default function Contact({ route, navigation }) {

  const [CONTACT, set_CONTACT] = useState(route.params.person);
  const [nickname, onChangenickname] = useState(CONTACT.nickname);
  const [loading, set_loading] = useState(false)

  const { user } = useContext(StoreContext);

  useEffect(() => {
    set_loading(true)
    DB.collection("users")
      .doc(CONTACT.id)
      .onSnapshot(snapshot => {
        const data = snapshot.data()
        let new_contact = CONTACT
        new_contact.username = data.username
        new_contact.realname = data.realname
        console.log(new_contact)
        set_CONTACT(new_contact)
        set_loading(false)
      });
  }, [CONTACT, user]);


  function onPress_Apply() {

    DB.collection('users').doc(user.uid)
      .collection('friends').doc(CONTACT.id)
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
    width: "75%",
    padding: 10,
    margin: 5,
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
