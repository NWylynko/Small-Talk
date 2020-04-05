import React from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "./main/index";
import People from "./people/index";
import Contact from "./contact/index";
import Add from "./add/index";
import Config from "./config/index"

import Loading from "./auth/loading";
import Switch from "./auth/switch";

import Login from "./auth/index";
import NewUser from "./auth/newuser";

import Take from "./photos/take";
import Preview from "./photos/preview";
import ViewImage from "./photos/view";

const Stack = createStackNavigator();

export default function Navigator() {
  return (
      <Stack.Navigator
        initialRouteName="Switch"
        screenOptions={{
          headerShown: false
        }}>

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="People" component={People} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="Config" component={Config} />

        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Switch" component={Switch} />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="NewUser" component={NewUser} />

        <Stack.Screen name="Take" component={Take} />
        <Stack.Screen name="Preview" component={Preview} />
        <Stack.Screen name="ViewImage" component={ViewImage} />
      </Stack.Navigator>
  );
}