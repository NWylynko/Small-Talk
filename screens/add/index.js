import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";

import config from "../config.json";
import time from "../../tools/time";

import Input from "./Input";
import People from "./people";
import Back from "./back";

import firebase from "../../firebase/index";
import "firebase/firestore";
const DB = firebase.firestore();

export default function Add({ navigation }) {

  const [inputValue, set_inputValue] = useState("");
  const [DATA, set_DATA] = useState([]);
  const [loading, set_loading] = useState(false);

  function onSubmit(data) {

    if (data != '') {
      set_loading(true);

      const search = data;

      DB.collection('users')
        .where('username_search', 'array-contains', search)
        .limit(15)
        .onSnapshot((snapshot) => {

          var n;

          if (!(DATA)) {
            n = 0
          } else {
            n = DATA.length;
          }

          var new_DATA = [];

          snapshot.forEach(doc => {
            let data = doc.data();

            data.id = n.toString();
            n++;

            new_DATA.push(data);
          });
          console.log("SET_DATA")

          console.log(new_DATA)
          
          set_DATA(new_DATA);
          set_loading(false)


        })
    } else {
      set_DATA([])
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <Back navigation={navigation} />
      <People DATA={DATA} loading={loading} />
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior="padding"
        enabled>
        <Input inputValue={inputValue} set_inputValue={set_inputValue} set_loading={DATA} onSubmit={onSubmit} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    width: "100%",
    height: "100%"
  },
  keyboard: {
    width: "100%"
  }
});
