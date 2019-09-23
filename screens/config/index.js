import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";
import firebase from "../../firebase/index";

export default function Config({ navigation }) {

  function logout() {
    firebase.auth().signOut().then(function() {
      navigation.navigate("Loading");
    }).catch(function(error) {
      alert(error)
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: Constants.statusBarHeight,
    width: "100%"
  },
  button: {
    alignItems: "center",
    padding: 10,
    borderColor: "#333333",
    borderWidth: 4
  }
});

