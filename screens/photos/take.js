import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
//import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default function Take({ navigation }) {

  const [type, set_type] = useState(Camera.Constants.Type.front)

  let CameraStatus = navigation.state.params.snapshot

  console.log(CameraStatus)

  let camera;

  const snap = async () => {
    if (camera) {
      let image = await camera.takePictureAsync();
      await navigation.navigate('Preview', { image })
    }
  };

  const back = () => {
    navigation.goBack()
  };

  const flip = () => {
    set_type(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    );
  }

  if (CameraStatus === null) {
    return <Text>No access to camera: null</Text>;
  } else if (CameraStatus === false) {
    return <Text>No access to camera: false</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={type}
          ref={ref => {
            camera = ref;
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
            }}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  padding: 25,
                  position: "absolute", 
                  left: 0
                }}
                onPress={back}>
                <Text style={{ fontSize: 18, margin: 10, color: 'white' }}> Back </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  padding: 25, 
                  position: "absolute", 
                  right: 0
                }}
                onPress={flip}>
                <Text style={{ fontSize: 18, margin: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                flex: 1,
                position: "absolute",
                bottom: 0,
                width: "100%"
              }}
              onPress={snap}>
              <Text style={{ fontSize: 32, margin: 50, color: 'white', flex: 1 }}> Shoot </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}