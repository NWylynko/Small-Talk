import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import Constants from "expo-constants";
import Loadpage from "../loading"
import firebase from "../firebase";
const storageRef = firebase.storage().ref();


export default function ViewImage({ route, navigation }) {

  let { item } = route.params;

  const [loading, set_loading] = useState(true)
  const [image, set_image] = useState(null)

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
  }, [item])

  useEffect(() => {
    console.log(image)
  }, [image])

  return (

    <>

      { loading ? 
        <Loadpage text={'loading image'} showicon={false} /> : null
      }

      <View style={[styles.container, loading ? {flex: 0} : { flex: 1 }]}>

        <Image
          style={{flex: 1}}
          source={{ uri: image }}
          onLoad={() => {
            set_loading(false)
          }}
          onError={console.error}
          
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
    // marginTop: Constants.statusBarHeight,
    // flex: 1,
    // resizeMode: 'cover',
    height: "100%",
    backgroundColor: "black"
  }
});
