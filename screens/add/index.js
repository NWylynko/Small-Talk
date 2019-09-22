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
import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";

import config from "../config.json";
import time from "../../tools/time";

import Input from "./Input";
import People from "./people";
import Back from "./back";


export default function Add({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Back navigation={navigation} />
      <People />
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior="padding"
        enabled
      >
        <Input />
        
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
