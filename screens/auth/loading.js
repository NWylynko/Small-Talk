import React, {
  useEffect
} from "react";
import {
  useGlobal
} from "reactn";

// tools
import Loadpage from "../loading/index"
import time from "../../tools/time";

// for notifications
import {
  Notifications
} from "expo";
import * as Permissions from 'expo-permissions';

// access firebase
import firebase from "../../firebase/index"
const DB = firebase.firestore();
const realDB = firebase.database();

export default function Loading({
  navigation
}) {
  console.log("globals")
  const [DATA, set_DATA] = useGlobal('data'); // messages
  const [ME, set_ME] = useGlobal('me'); // current user
  const [FRIEND, set_FRIEND] = useGlobal('friend'); // current friend
  const [FRIEND_DATA, set_FRIEND_DATA] = useGlobal('friend_data'); // friends

  const [UNSUB_data, set_UNSUB_data] = useGlobal('unsub_data');
  const [UNSUB_friend, set_UNSUB_friend] = useGlobal('unsub_friend');
  const [UNSUB_friends, set_UNSUB_friends] = useGlobal('unsub_friends');

  useEffect(() => {
    console.log("effect")

    let userID = firebase.auth().currentUser.uid; // uid of current user
    console.log("userID: " + userID)

    try {
      // this fails the first time to user signs in so putting it in a try works
      // provider data is data that is passed through from the authentication
      // this could contain email, phone number or other data from google or facebook
      DB.collection('users').doc(userID)
        .update({
          providerData: firebase.auth().currentUser.providerData
        })
    } catch (err) {
      console.log("couldnt update providerData...")
      console.log(err)
    }

    // on the switch page it gets the user data so it is passed through to here
    let snapshot = navigation.state.params.snapshot

    // data() holds the data that has been retrieved from firestore
    let new_me = snapshot.data()

    console.log(new_me)

    // store userID in new_me cuz UserID isnt global 
    new_me.userID = userID
    set_ME(new_me);

    // a new user will have the current_friend set to 0 so this gets triggered
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
      // update to mark latest message to seen
      DB.collection('users').doc(new_me.userID)
        .collection('friends').doc(new_me.current_friend)
        .update({
          seen: true
        })

      console.log("getting friend data")

      // this will be true if the user is changing current friend
      if (UNSUB_friend) {
        UNSUB_friend();
        console.log("unsubbing friend")
      }

      // get friend data
      set_UNSUB_friend(DB.collection("users")
        .doc(userID)
        .collection("friends")
        .doc(new_me.current_friend)
        .onSnapshot(snapshot => {
          console.log("set_FRIEND")

          let friend = snapshot.data()
          if (friend) {
            console.log("snapshot id: " + snapshot.id)

            // the id of a snapshot is the uid of the user in friends list
            friend.userID = snapshot.id

            console.log(friend)

            // like the current friend, when changing friends we must stop recieveing messages from the old chat
            if (UNSUB_data) {
              UNSUB_data.off();
              console.log("unsubbing messages")
            }

            // get the last 50 messages sent
            const messages = realDB.ref("msg/" + friend.chatID)
              .orderByChild('timestamp')
              .limitToLast(50)

            // start listening for messages
            messages.on("value", function (snapshot) {

              var new_DATA = []; 

              snapshot.forEach(pre_data => {
                let data = pre_data.val() // gets the data from the list of data
                data.id = pre_data.key // get the uid of the js

                if (data.text) { // if there is a text we can assume its a msg
                  data.type = 'msg'
                } else if (data.image) {
                  data.type = 'image'
                }

                if (data.from === userID) { // if the message from id is the clients id then the message has been sent by them
                  data.me = true;
                } else {
                  data.me = false;
                }

                //do funky things to make messages more interconnected

                let last = new_DATA[new_DATA.length - 1]

                if (last) {

                  //add a space between change in person speaking

                  if (last.from !== data.from) {
                    new_DATA.push({
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

                new_DATA.push(data);

              });

              // the list gets reversed twice, once here and once on the flatlist
              new_DATA.reverse()

              //the latest message needs show_timestamp set to true for some reason
              if (new_DATA[0]) {
                new_DATA[0].show_timestamp = true
              }


              set_DATA(new_DATA);

              // got all the infomation so now can move to main screen
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

    // 
    if (UNSUB_friends) {
      UNSUB_friends();
      console.log("unsubbed friends")
    }

    set_UNSUB_friends(DB.collection("users")
      .doc(userID)
      .collection("friends")
      .onSnapshot(snapshot => {

        var new_DATA = [];

        snapshot.forEach(doc => {
          let data = doc.data();

          data.id = doc.id

          //if new message, display a notification
          console.log(data.seen)
          if (Date.now() - data.last_timestamp < 2500 && data.seen === false) {
            sendNotification(data.nickname, data.last_msg.substring(0, 50))
          }

          new_DATA.push(data);
        });

        set_FRIEND_DATA(new_DATA);

      }));

  }, [false]);

  return ( <
    Loadpage text = {
      "Loading..."
    }
    />
  );
}

async function sendNotification(title, body) {
  const {
    status: existingStatus
  } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );

  if (existingStatus === 'granted') {
    await Notifications.presentLocalNotificationAsync({
      title,
      body,
    })
  }
}