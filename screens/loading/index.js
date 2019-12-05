import React from "react";
import { Text, StyleSheet, View, ActivityIndicator, Image, Dimensions } from "react-native";

export default function Loadpage({ text, showicon=true }) {
  return (
    <View style={styles.container}>
      <ShowIcon show={showicon} />
      <ActivityIndicator size="large" color="#b9e3f9" />
      <Text style={{ fontSize: 32, color: "#b9e3f9" }} >{text}</Text>
    </View>
  )
}

function ShowIcon({show}) {
  if (show) {
    return (
      <Icon />
    )
  } else {
    return (null)
  }
}

function Icon() {

  const screenWidth = Math.round(Dimensions.get('window').width);
  const screenHeight = Math.round(Dimensions.get('window').height);

  if (screenHeight >= screenWidth) {
    return (
      <Image
        style={{
          width: screenWidth * 0.95,
          height: screenWidth * 0.95,
          }}
        source={require('../../assets/main.png')}
      />
    )
  } else {
    return (
      <Image
        style={{
          width: screenHeight * 0.5,
          height: screenHeight * 0.5,
          }}
        source={require('../../assets/main.png')}
      />
    )
  }


  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "#f95858"
  },
});
