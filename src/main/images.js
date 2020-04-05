import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

import config from "../config.json";

export default function Images() {

  const navigation = useNavigation()

  async function onPressSelect() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }
    
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });

    if (!image.cancelled) {

      if (image.width === 0 && image.height === 0) {
        var img = new Image();
        
        img.onload = function() {
          image.width = this.width;
          image.height = this.height;
          console.log(image)
        }
        img.src = image.uri;
      }

      await navigation.navigate('Preview', { image })
    }

  }
  async function onPressTake() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
    } else {
      await navigation.navigate('Take');
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPressSelect}>
        <Text>Select Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressTake}>
        <Text>Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 10,
    width: "100%",
    flexDirection: "row"
  },
  button: {
    alignItems: "center",
    backgroundColor: config.style.colors.people.button,
    padding: 10,
    flex: 1,
    margin: 2
  }
});