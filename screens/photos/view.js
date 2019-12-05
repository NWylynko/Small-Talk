import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import Constants from "expo-constants";
import Loadpage from "../loading"
import firebase from "../../firebase/index";
const storageRef = firebase.storage().ref();


export default function ViewImage({ navigation }) {

  let smallimage = navigation.state.params.image
  let item = navigation.state.params.item

  const [loading, set_loading] = useState(true)
  const [image, set_image] = useState(null)
  const [image_flex, set_image_flex] = useState(0)
  const [smallimage_flex, set_smallimage_flex] = useState(1)

  console.log('showing view of image')

  console.log(item)

  useEffect(() => {
    if (item.res) {

      // Create a reference to the file we want to download
      var thumbnailRef = storageRef.child('images/' + item.id + '.jpeg');

      // Get the download URL
      thumbnailRef.getDownloadURL().then(function (url) {
        set_image(url)

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

    <>

      <Loadpage loading={loading} text={'loading image'} showicon={false} />

      <View style={styles.container}>

        <Image
          style={{ flex: image_flex }}
          source={{ uri: image }}
          onLoad={() => {
            set_image_flex(1)
            set_smallimage_flex(0)
            set_loading(false)
            console.log("showing big image")
          }}
        />

        <Image
          style={{ flex: smallimage_flex }}
          source={{ uri: smallimage }}
          onLoad={() => {
            set_loading(false)
            console.log("showing small image")
          }}
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

    </>
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
