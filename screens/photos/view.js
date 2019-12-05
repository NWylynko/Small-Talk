import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import Constants from "expo-constants";

import firebase from "../../firebase/index";
const storageRef = firebase.storage().ref();


export default function ViewImage({ navigation }) {

  let smallimage = navigation.state.params.image
  let item = navigation.state.params.item

  const [image, set_image] = useState(smallimage)

  console.log('showing view of image')

  console.log(item)

  useEffect(() => {
    if (item.res) {

      // Create a reference to the file we want to download
      var thumbnailRef = storageRef.child('images/' + item.id + '.jpeg');

      // Get the download URL
      thumbnailRef.getDownloadURL().then(function (url) {
        set_image(url)
        set_Loading(false)

      }).catch(function (error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            alert("File doesn't exist or is processing")
            break;

          case 'storage/unauthorized':
            alert("User doesn't have permission to access the object")
            break;

          case 'storage/canceled':
            alert("User canceled the upload")
            break;

          case 'storage/unknown':
            alert("Unknown error occurred, inspect the server response")
            break;
        }
      });
    }
  })

  return (

    <View style={styles.container}>
      <Image
        style={{ flex: 1 }}
        source={{ uri: image }}
      />

      <TouchableOpacity
        style={{
          flex: 0.1,
          padding: 25,
          position: "absolute",
          top: 10,
          left: 10,
          width: "100%"
        }}
        onPress={() => { navigation.goBack() }}>
        <Text style={{ fontSize: 18, margin: 10, color: 'white' }}> Back </Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    resizeMode: 'cover',
    height: "100%",
    backgroundColor: "black"
  }
});
