import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Messages from './components/main/Messages';
import Input from './components/main/Input';
import People from './components/main/People';

import config from './components/config.json';

export default function App() {
  return (
    <View style={styles.container}>
      <People user={"Mum"} />
      <Messages />
      <Input />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
