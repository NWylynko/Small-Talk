import React, { Component } from 'react';
import { TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';

import config from '../config.json';

export default function Input() {
  const [value, onChangeText] = React.useState('');

  return (
    <KeyboardAvoidingView style={styles.keyboard} behavior="padding" enabled>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeText(text)}
        value={value}
        onSubmitEditing={data => onSubmitEditing(data)}
        placeholder="Chat..."
        paddingLeft={10}
      />
    </KeyboardAvoidingView>
  );
}

function onSubmitEditing(data) {

  console.log(data.timeStamp)
  console.log(data.nativeEvent.text)

}

const styles = StyleSheet.create({
  input: { 
    width: "100%",
    height: 40, 
    borderColor: config.style.colors.input.border, 
    borderWidth: 3
  },
  keyboard: {
    width: "100%"
  },
});
