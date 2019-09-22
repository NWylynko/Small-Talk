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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboard} behavior="padding" enabled>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    width: "100%",
    height: "100%",
  },
  keyboard: {
    width: "100%"
  },
})
