import React, { useEffect, useContext } from "react";
import { StoreContext } from '../store';

// tools
import Loadpage from "../loading/index"
import time from "../tools/time";

// for notifications
// import { Notifications } from "expo";
// import * as Permissions from 'expo-permissions';

// access firebase
import firebase from "../firebase"
const DB = firebase.firestore();
const realDB = firebase.database();

export default function Loading({ navigation }) {

  const {
    user, setUser,
    newUser, setNewUser,

    userSnapshot, setUserSnapshot,
    unsubUser, setUnsubUser,

    messages, setMessages,
    unsubMessages, setUnsubMessages,

    friendSnapshot, setFriendSnapshot,
    unsubFriend, setUnSubFriend,

    friendsSnapshot, setFriendsSnapshot,
    unsubFriends, setUnsubFriends,

  } = useContext(StoreContext);

  useEffect(() => {

    // a new user will have the current_friend set to 0 so this gets triggered
    if (userSnapshot.current_friend === '0') {

      setFriend({
        nickname: "Small Talk"
      })

      setMessages([{
        id: "0",
        type: "msg",
        from: false,
        timestamp: Date.now(),
        text: "Welcome to Small Talk, " + userSnapshot.realname + ", to get started press the button at the top, then click Add at the bottom and search for your friends"
      }])

      console.log("Loading => Home")
      navigation.navigate('Home');

    } else {
      // update to mark latest message to seen
      DB.collection('users').doc(user.uid)
        .collection('friends').doc(userSnapshot.current_friend)
        .update({
          seen: true
        })

      // get friend data
      let unsub = DB.collection("users")
        .doc(user.uid)
        .collection("friends")
        .doc(userSnapshot.current_friend);

      unsub.onSnapshot(s => { let f = s.data(); f.uid = s.id; setFriendSnapshot(f); })

      setUnSubFriend(unsub)
    }

  }, [userSnapshot, user]);

  useEffect(() => {
    if (friendSnapshot) {

      // when changing friends we must stop recieveing messages from the old chat
      if (unsubMessages) {
        unsubMessages.off();
      }

      // get the last 50 messages sent // start listening for messages
      let unsub = realDB.ref("msg/" + friendSnapshot.chatID)
        .orderByChild('timestamp')
        .limitToLast(50);
        
      unsub.on("value", snapshot => {

          var newMessages = [];

          snapshot.forEach(pre_data => {
            let data = pre_data.val() // gets the data from the list of data
            data.id = pre_data.key // get the uid of the js

            if (data.text) { // if there is a text we can assume its a msg
              data.type = 'msg'
            } else if (data.image) {
              data.type = 'image'
            }

            if (data.from === user.uid) { // if the message from id is the clients id then the message has been sent by them
              data.me = true;
            } else {
              data.me = false;
            }

            //do funky things to make messages more interconnected

            let last = newMessages[newMessages.length - 1]

            if (last) {

              //add a space between change in person speaking

              if (last.from !== data.from) {
                newMessages.push({
                  type: 'space',
                  id: data.id + '4'
                })


                // show the time for the last message before other client replyed
                last.show_timestamp = true

              } else {

                // show the time if the message before was a while ago
                if (time(last.timestamp) !== time(data.timestamp)) {
                  last.show_timestamp = true
                }
              }
            }

            newMessages.push(data);

          });

          // the list gets reversed twice, once here and once on the flatlist
          newMessages.reverse()

          //the latest message needs show_timestamp set to true for some reason
          if (newMessages[0]) {
            newMessages[0].show_timestamp = true
          }


          setMessages(newMessages);

          console.log("Loading => Home")
          navigation.navigate('Home');


        })
      
      setUnsubMessages(unsub)
    }
  }, [friendSnapshot, user])

  useEffect(() => {
    let unsub = DB.collection("users")
      .doc(user.uid)
      .collection("friends")
      
    unsub.onSnapshot(snapshot => {

        var newFriends = [];

        snapshot.forEach(doc => {
          let data = doc.data();

          data.id = doc.id

          //if new message, display a notification
          // console.log(data.seen)
          // if (Date.now() - data.last_timestamp < 2500 && data.seen === false) {
          //   sendNotification(data.nickname, data.last_msg.substring(0, 50))
          // }

          newFriends.push(data);
        });

        newFriends.sort((a, b) => (a.last_timestamp < b.last_timestamp) ? 1 : -1)

        setFriendsSnapshot(newFriends);

      })

    setUnsubFriends(unsub)

  }, [user])

  return (<
    Loadpage text={
      "Loading..."
    }
  />
  );
}

// need to check this uses latest api

// async function sendNotification(title, body) {
//   const {
//     status: existingStatus
//   } = await Permissions.getAsync(
//     Permissions.NOTIFICATIONS
//   );

//   if (existingStatus === 'granted') {
//     await Notifications.presentLocalNotificationAsync({
//       title,
//       body,
//     })
//   }
// }