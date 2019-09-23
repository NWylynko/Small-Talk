import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from "./screens/main/index";
import People from "./screens/people/index";
import Contact from "./screens/contact/index";
import Add from "./screens/add/index";
import Config from "./screens/config/index"

import Login from "./screens/auth/index";

import Select_Page from "./screens/debug/index";
import Switch from "./screens/debug/switch";
import Fake_Login from "./screens/debug/login";

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
  },
  Config: {
    screen: Config,
    navigationOptions: {
      header: null
    }
  }
});

const Auth = createStackNavigator({ 
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  }
 })

const Loading = createStackNavigator({
  Switch,
  Select_Page,
  Fake_Login
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth,
      App,
      Loading,
    },
    {
      initialRouteName: "Loading"
    }
  )
);

console.ignoredYellowBox = [
  'Setting a timer'
]
