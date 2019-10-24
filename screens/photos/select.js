import React from "react";
import { useGlobal } from "reactn";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";


export default function Select({ navigation }) {

  console.log('showing Select')

  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Constants.statusBarHeight + 5,
    marginTop: Constants.statusBarHeight + 5
  }
});
