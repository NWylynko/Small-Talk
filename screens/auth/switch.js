import React, { useEffect } from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import { useGlobal } from 'reactn';
import firebase from "../../firebase/index";
import "firebase/firestore";
const DB = firebase.firestore();

let user_data = {}

export default function Switch({ navigation }) {

  const [UNSUB_me, set_UNSUB_me] = useGlobal('unsub_me');
  const [DATA, set_DATA] = useGlobal('data');

  useEffect(() => {

    firebase.auth().onAuthStateChanged((user) => {
      console.log('auth state changed')
      console.log("user doesnt equal user_data")
      if (user != user_data) {
        user_data = user

        console.log(user)
        if (user != null) {
          console.log('user isnt null')
          set_UNSUB_me(DB.collection("users")
            .doc(user.uid)
            .onSnapshot(snapshot => {

              console.log("user snapshot data: ...")
              console.log(snapshot.data())

              console.log('setting data to null')
              set_DATA([]);

              if (snapshot.data() === undefined) {
                console.log('navigate Switch => NewUser')
                navigation.navigate('NewUser', { user });
              } else {
                console.log("navigate Switch => Loading")
                navigation.navigate('Loading', { snapshot });
              }
            }))

        } else {
          console.log("navigate Switch => Login")
          navigation.navigate('Login');
        }
      }
    });
  }, [false]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Authenticating...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
});


