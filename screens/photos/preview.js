import React from "react";
import { useGlobal } from "reactn";
import { StyleSheet, View, ImageBackground, TouchableOpacity, Button, Text } from "react-native";
import Constants from "expo-constants";

import firebase from "../../firebase/index";
const storageRef = firebase.storage().ref();
const realDB = firebase.database()
const storeDB = firebase.firestore()


export default function Preview({ navigation }) {

  const [FRIEND, set_FRIEND] = useGlobal('friend');
  const [ME, set_ME] = useGlobal('me')

  console.log('showing Preview')

  let image = navigation.state.params.image

  console.log(image)

  const goback = () => {
    navigation.goback()
  };

  const send = () => {

    navigation.navigate('Home')

    // A post entry.
    var postData = {
      from: firebase.auth().currentUser.uid,
      image: true,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    };

    let post = realDB.ref("msg/" + FRIEND.chatID).push(postData);

    console.log("FRIEND userID: " + FRIEND.userID)
    console.log("ME userID: " + ME.userID)

    storeDB.collection('users').doc(FRIEND.userID)
      .collection('friends').doc(ME.userID)
      .update({
        last_msg: "image",
        last_timestamp: Date.now(),
        seen: false
      })

    storeDB.collection('users').doc(ME.userID)
      .collection('friends').doc(FRIEND.userID)
      .update({
        last_msg: "image",
        last_timestamp: Date.now(),
        seen: true
      })

    var imageName = post.key.concat(".jpeg");

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('images/' + imageName).putString(image.uri, 'data_url');

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function (error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;


          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, function () {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {

          console.log('File available at', downloadURL);
          realDB.ref("msg/" + FRIEND.chatID + "/" + post.key).update({
            res: {
              height: image.height,
              width: image.width
            }
          })
        });
      });
  }

  return (
    <ImageBackground source={image.uri} style={styles.container}>


      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              padding: 25,
              position: "absolute",
              top: 0,
              width: "100%"
            }}
            onPress={() => {navigation.goBack()}}>
            <Text style={{ fontSize: 18, margin: 10, color: 'white' }}> Back </Text>
          </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            flex: 1,
            position: "absolute",
            bottom: 0,
            width: "100%"
          }}
          onPress={send}>
          <Text style={{ fontSize: 32, margin: 50, color: 'white', flex: 1 }}> Send </Text>
        </TouchableOpacity>
      </View >

    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    resizeMode: 'cover',
    height: "100%",

  }
});
