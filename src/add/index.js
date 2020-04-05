import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import Constants from "expo-constants";

import Input from "./Input";
import People from "./people";
import Back from "./back";

import firebase from "../firebase";
const DB = firebase.firestore();

var search_unsub;

export default function Add({ navigation }) {

  const [inputValue, set_inputValue] = useState("");
  const [DATA, set_DATA] = useState([]);
  const [loading, set_loading] = useState(false);

  function onSubmit(data) {

    data = data.toLowerCase()

    if (search_unsub) { search_unsub(); }

    if (data != '') {
      set_loading(true);

      const search = data;

      search_unsub = DB.collection('users')
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

            data.id = doc.id

            new_DATA.push(data);
          });
          console.log("SET_DATA")

          console.log(new_DATA)
          
          set_DATA(new_DATA);
          set_loading(false)


        })
    } else {
      set_DATA([])
      set_loading(false)
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <Back navigation={navigation} search_unsub={search_unsub} />
      <People DATA={DATA} loading={loading} />
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior="padding"
        enabled>
        <Input inputValue={inputValue} set_inputValue={set_inputValue} onSubmit={onSubmit} style={{marginBottom: Constants.statusBarHeight + 5}} />
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
