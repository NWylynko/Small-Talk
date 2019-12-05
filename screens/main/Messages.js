import React, { useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import { useGlobal } from 'reactn';

import config from "../config.json";

import time from "../../tools/time";

import firebase from "../../firebase/index";
const storageRef = firebase.storage().ref()

function Item({ item, navigation }) {

  const [error, set_error] = useState(null)
  const [image, set_image] = useState(null)

  if (item.type === 'msg') {
    if (item.show_timestamp) {
      return (
        <View style={UserStyle(item.me)}>
          <Text style={styles.msg}>{item.text}</Text>
          <Text style={styles.time}>{time(item.timestamp)}</Text>
        </View>
      );
    } else {
      return (
        <View style={UserStyle(item.me)}>
          <Text style={styles.msg}>{item.text}</Text>
        </View>
      )
    }

  } else if (item.type === 'space') {
    return (
      <Text> </Text>
    )
  } else if (item.type === 'image') {
    if (item.res) {

      // Create a reference to the file we want to download
      var thumbnailRef = storageRef.child('images/thumbnails/' + item.id + '_500x500.jpeg');

      // Get the download URL
      thumbnailRef.getDownloadURL().then(function (url) {

        set_image(url)
        set_error(null)
      }).catch(function (error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            set_error("File doesn't exist or is processing")
            break;

          case 'storage/unauthorized':
            set_error("User doesn't have permission to access the object")
            break;

          case 'storage/canceled':
            set_error("User canceled the upload")
            break;

          case 'storage/unknown':
            set_error("Unknown error occurred, inspect the server response")
            break;
        }
      });


      // resize image to fit while keeping aspect ratio

      let screenWidth = Math.round(Dimensions.get('window').width);

      let imageWidth = screenWidth - 50 - 30

      let finalWidth;

      if (imageWidth > 500) {
        finalWidth = 500
      } else {
        finalWidth = imageWidth
      }

      let height;
      let width;

      if (item.res.width > finalWidth) {
        height = (finalWidth / item.res.width) * item.res.height
        width = finalWidth
      }

      return (
        <View style={UserStyle(item.me)}>
          <TouchableOpacity
            onPress={() => {navigation.navigate('ViewImage', { item, image })}}
          >
            <Image
              style={{ width, height }}
              source={{ uri: image }}
            />
          </TouchableOpacity>

          <Text style={styles.msg}>{error}</Text>
          <Text style={styles.time}>{time(item.timestamp)}</Text>
        </View>
      )
    } else {
      return (
        <View style={UserStyle(item.me)}>
          <Text style={styles.msg}>Loading...</Text>
          <Text style={styles.time}>{time(item.timestamp)}</Text>
        </View>
      )
    }
  } else {
    return (
      <View />
    )
  }

}

export default function Messages({ navigation }) {

  const [DATA, set_DATA] = useGlobal('data');

  console.log(DATA)

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={DATA}
        extraData={DATA}
        renderItem={({ item }) => (
          <Item item={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
        initialNumToRender={15}
        inverted
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 5
  },
  time: {
    textAlign: "right"
  },
  msg: {
    fontSize: 16
  }
});

function UserStyle(from) {
  if (from) {
    return {
      backgroundColor: config.style.colors.messages.message.me,
      padding: 10,
      marginTop: -10,
      marginLeft: 50,
      marginHorizontal: 10
    };
  } else {
    return {
      backgroundColor: config.style.colors.messages.message.them,
      padding: 10,
      marginTop: -10,
      marginRight: 50,
      marginHorizontal: 10
    };
  }
}
