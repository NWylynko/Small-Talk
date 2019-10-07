import React from "react";
import { useGlobal } from 'reactn';
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";
import firebase from "../../firebase/index";

export default function Config({ navigation }) {

  const [UNSUB_me, set_UNSUB_me] = useGlobal('unsub_me');
  const [UNSUB_data, set_UNSUB_data] = useGlobal('unsub_data');
  const [UNSUB_friend, set_UNSUB_friend] = useGlobal('unsub_friend');
  const [UNSUB_friends, set_UNSUB_friends] = useGlobal('unsub_friends');


  function logout() {

    if (UNSUB_me) { UNSUB_me() }
    if (UNSUB_data) { UNSUB_data() }
    if (UNSUB_friend) { UNSUB_friend() }
    if (UNSUB_friends) { UNSUB_friends() }

    firebase.auth().signOut().then(function() {

      console.log("navigate Config => Login")
      navigation.navigate("Login");
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

