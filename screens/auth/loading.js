import React, {
  useEffect
} from "react";
import Constants from "expo-constants";
import {
  useGlobal
} from "reactn";

import Loadpage from "../loading/index"
import time from "../../tools/time";

import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';

import firebase from "../../firebase/index";

const DB = firebase.firestore();
const realDB = firebase.database();

export default function Loading({
  navigation
}) {
  console.log("globals")
  const [DATA, set_DATA] = useGlobal('data');
  const [ME, set_ME] = useGlobal('me');
  const [FRIEND, set_FRIEND] = useGlobal('friend');
  const [FRIEND_DATA, set_FRIEND_DATA] = useGlobal('friend_data');
  const [UNSUB, set_UNSUB] = useGlobal('unsub');

  const [UNSUB_data, set_UNSUB_data] = useGlobal('unsub_data');
  const [UNSUB_friend, set_UNSUB_friend] = useGlobal('unsub_friend');
  const [UNSUB_friends, set_UNSUB_friends] = useGlobal('unsub_friends');

  useEffect(() => {
    console.log("effect")

    let userID = firebase.auth().currentUser.uid;
    console.log("userID: " + userID)

    try {
      DB.collection('users').doc(userID)
        .update({
          providerData: firebase.auth().currentUser.providerData
        })
    } catch (err) {
      console.log("couldnt update providerData...")
      console.log(err)
    }

    let snapshot = navigation.state.params.snapshot

    let new_me = snapshot.data()

    if (new_me) {
      console.log(new_me)

      new_me.userID = userID
      set_ME(new_me);

      if (new_me.current_friend === '0') {
        console.log("is new user")

        set_FRIEND({
          nickname: "Small Talk"
        })
        set_DATA([{
          id: "0",
          type: "msg",
          from: false,
          timestamp: Date.now(),
          text: "Welcome to Small Talk, " + new_me.realname + ", to get started press the button at the top, then click Add at the bottom and search for your friends"
        }])

        console.log("navigate loading => App")
        navigation.navigate('App');

      } else {

        DB.collection('users').doc(new_me.userID)
          .collection('friends').doc(new_me.current_friend)
          .update({
            seen: true
          })

        console.log("getting friend data")

        if (UNSUB_friend) {
          UNSUB_friend();
          console.log("unsubbing friend")
        }

        set_UNSUB_friend(DB.collection("users")
          .doc(userID)
          .collection("friends")
          .doc(new_me.current_friend)
          .onSnapshot(snapshot => {
            console.log("set_FRIEND")

            let friend = snapshot.data()
            if (friend) {
              console.log("snapshot id: " + snapshot.id)

              friend.userID = snapshot.id

              console.log(friend)

              if (UNSUB_data) {
                UNSUB_data.off();
                console.log("unsubbing messages")
              }

              const messages = realDB.ref("msg/" + friend.chatID)
                .orderByChild('timestamp')
                .limitToLast(50)

              messages.on("value", function (snapshot) {

                var n = 0;

                var new_DATA = [];

                snapshot.forEach(data => {
                  data = data.val()

                  //console.log(data)

                  data.id = n.toString();
                  n++;

                  if (data.text) {
                    data.type = 'msg'
                  }

                  if (data.from === userID) {
                    data.from = true;
                  } else {
                    data.from = false;
                  }

                  //do funky things to make messages more interconnected

                  let last = new_DATA[new_DATA.length - 1]

                  if (last) {

                    //add a space between change in person speaking

                    if (last.from !== data.from) {
                      new_DATA.push({
                        type: 'space',
                        id: n.toString()
                      })
                      n++


                      // show the time for the last message before other client replyed
                      last.show_timestamp = true

                    } else {

                      // show the time if the message before was a while ago
                      if (time(last.timestamp) !== time(data.timestamp)) {
                        last.show_timestamp = true
                      }
                    }


                  }



                  new_DATA.push(data);


                });

                // the list gets reversed twice, once here and once on the flatlist
                new_DATA.reverse()

                //the latest message needs show_timestamp set to true for some reason
                new_DATA[0].show_timestamp = true

                

                set_DATA(new_DATA);

                console.log("navigate loading => App")
                navigation.navigate('App');


              }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
              });

              set_FRIEND(friend);
              set_UNSUB_data(messages)

              console.log("friend chatID: " + friend.chatID)
              console.log("friend uid: " + snapshot.id)


            } else {
              console.log("no friend data")
            }

          }));
      }

      if (UNSUB_friends) {
        UNSUB_friends();
        console.log("unsubbed friends")
      }

      set_UNSUB_friends(DB.collection("users")
        .doc(userID)
        .collection("friends")
        .onSnapshot(snapshot => {

          var n;

          if (!(FRIEND_DATA)) {
            n = 0
          } else {
            n = FRIEND_DATA.length;
          }

          var new_DATA = [];

          snapshot.forEach(doc => {
            let data = doc.data();

            data.id = n.toString();
            n++;

            data.uid = doc.id

            //if new message, display a notification
            console.log(data.seen)
            if (Date.now() - data.last_timestamp < 2500 && data.seen === false) {
              sendNotification(data.nickname, data.last_msg.substring(0, 20))
            }

            new_DATA.push(data);
          });

         

          

          set_FRIEND_DATA(new_DATA);

        }));

    }

  }, [false]);

  return (<
    Loadpage text={
      "Loading..."
    }
  />
  );
}

async function sendNotification(title, body) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );

  if (existingStatus === 'granted') {
    await Notifications.presentLocalNotificationAsync({
      title,
      body,
    })
  }
}