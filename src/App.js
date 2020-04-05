import './firebase'; // need to initialise as soon as possible
import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigator';

import StoreProvider from './store';

export default function App() {
  return (
    <NavigationContainer>
      <StoreProvider>
          <Navigator />
      </StoreProvider>
    </NavigationContainer>
  )
}
