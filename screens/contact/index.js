import React from "react";
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
import Constants from "expo-constants";

import config from "../config.json";
import time from "../../tools/time";

import DATA from "./index-test-data.json";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Contact({ navigation }) {
  const [nickname, onChangenickname] = React.useState(DATA.nickname);

  const user_id = navigation.state.params.friendID;

  console.log(user_id);

  function onPress_Apply() {
    navigation.goBack();
  }

  function onPress_Cancel() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboard} behavior="padding" enabled>
        <Text style={styles.name}>{DATA.name}</Text>
        <Text style={styles.username}>{DATA.username}</Text>
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
  }
});
