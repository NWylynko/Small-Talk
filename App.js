import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from "./screens/main/index";
import People from "./screens/people/index";
import Contact from "./screens/contact/index";
import Add from "./screens/add/index";

import Login from "./screens/auth/index";
import Check from "./screens/auth/check";

import Select_Page from "./screens/debug/index";
import Switch from "./screens/debug/switch";

const App = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  People: {
    screen: People,
    navigationOptions: {
      header: null
    }
  },
  Contact: {
    screen: Contact,
    navigationOptions: {
      header: null
    }
  },
  Add: {
    screen: Add,
    navigationOptions: {
      header: null
    }
  }
});

const Auth = createStackNavigator({ 
  Check: {
    screen: Check,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  }
 })

const Debug = createStackNavigator({
  Switch,
  Select_Page
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth,
      App,
      Debug,
    },
    {
      initialRouteName: "Debug"
    }
  )
);
