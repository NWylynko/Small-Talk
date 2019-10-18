import React, { useState, useEffect } from "react";
import { useGlobal } from 'reactn';
import { Platform, View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
//import { TouchableOpacity } from "react-native-gesture-handler";
import Constants from "expo-constants";
import expo from "../../app.json";

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import firebase from "../../firebase/index";
import "firebase/firestore";
const DB = firebase.firestore();

import generateSearch from "../../tools/generatesearch";

export default function Config({ navigation }) {

  const [UNSUB_me, set_UNSUB_me] = useGlobal('unsub_me');
  const [UNSUB_data, set_UNSUB_data] = useGlobal('unsub_data');
  const [UNSUB_friend, set_UNSUB_friend] = useGlobal('unsub_friend');
  const [UNSUB_friends, set_UNSUB_friends] = useGlobal('unsub_friends');
  const [ME, set_ME] = useGlobal('me');

  const [loading, set_loading] = useState(false)

  const [realname, set_realname] = useState(ME.realname)
  const [username, set_username] = useState(ME.username)

  const [notif_off_on, set_notif_off_on] = useState(ME.notification_token ? "On" : "Off")

  function done() {

    var username_search;

    if (realname.toLowerCase() != username.toLowerCase()) {
      username_search = generateSearch(username).concat(generateSearch(realname))
    } else {
      username_search = generateSearch(username)
    }

    DB.collection('users').doc(ME.userID)
      .update({
        realname,
        username,
        username_search
      })

    navigation.goBack();
  }

  function logout() {

    if (UNSUB_me) { UNSUB_me() }
    if (UNSUB_data) { UNSUB_data.off() }
    if (UNSUB_friend) { UNSUB_friend() }
    if (UNSUB_friends) { UNSUB_friends() }

    firebase.auth().signOut().then(function () {

      console.log("navigate Config => Login")
      navigation.navigate("Login");
    }).catch(function (error) {
      alert(error)
    });
  }

  async function notif_switch() {
    if (Platform.OS === 'web') {
      notif_desktop();
    } else {
      notif_mobile();
    }
  }

  async function notif_mobile() {
    set_notif_off_on("Loading...")
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    console.log(existingStatus)

    if (existingStatus === 'granted') {
      console.log("turning off notifications")
    } else {
      console.log("turning on notifications")

      const { status: finalStatus } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      if (finalStatus === 'granted') {
        console.log("granteddd")
        let token = await Notifications.getExpoPushTokenAsync();

        DB.collection("users").doc(ME.userID)
          .update({
            notification_device: Platform.OS,
            notification_token: token
          })
      }
    }
  }

  function notif_desktop() {
    set_notif_off_on("Loading...")

    const messaging = firebase.messaging();
    messaging.usePublicVapidKey(expo.expo.notification.vapidPublicKey);

    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');


        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging.getToken().then((currentToken) => {
          if (currentToken) {
            console.log(currentToken)

            //sendTokenToServer(currentToken);
            //updateUIForPushEnabled(currentToken);

            DB.collection("users").doc(ME.userID)
              .update({
                notification_device: 'desktop',
                notification_token: currentToken
              })

            set_notif_off_on('On');
          } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');
            // Show permission UI.
            //updateUIForPushPermissionRequired();
            //setTokenSentToServer(false);
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          //showToken('Error retrieving Instance ID token. ', err);
          //setTokenSentToServer(false);
        });



      } else {
        console.log('Unable to get permission to notify.');
      }
    });
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>

        <View style={{ paddingBottom: 50 }} >
          <Text style={{ textAlign: "center", fontSize: 32 }} >Me</Text>

          <Line text={'Real Name'} option={realname} set={set_realname} />
          <Line text={' Username'} option={username} set={set_username} />

          <TouchableOpacity style={[styles.button, { margin: 5, width: "50%" }]} onPress={done}>
            <Text>Done</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ textAlign: "center", fontSize: 32 }} >Notifications</Text>

        <View style={{ flexDirection: "row", justifyContent: "center", paddingBottom: 50 }}>
          <TouchableOpacity style={[styles.button, { margin: 5, width: "50%" }]} onPress={notif_switch}>
            <Text>{notif_off_on}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.button, styles.logout]} onPress={logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function Line({ text, option, set }) {
  return (
    <View style={{ flexDirection: "row", alignSelf: "center" }}>
      <Text>{text}: </Text>
      <TextInput
        style={[styles.button, styles.line]}
        onChangeText={text => set(text)}
        value={option}
        paddingLeft={10}
      />
    </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: Constants.statusBarHeight,
    marginBottom: Constants.statusBarHeight,
    width: "100%",
    height: "100%"
  },
  button: {
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    textAlign: "center",
    padding: 10,
    borderColor: "#333333",
    borderWidth: 4,
    width: "100%",
    alignSelf: "center",
    position: "relative",
    //left: 10
  },
  logout: {
    borderColor: "#b32727",
    borderWidth: 6,
    position: "absolute",
    bottom: 3,
    padding: 5,
    left: 0,

  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  line: {
    borderWidth: 2,
    width: "75%",
    marginTop: 5
  },
});

