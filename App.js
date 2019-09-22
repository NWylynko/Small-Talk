import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from "./screens/main/index";
import People from "./screens/people/index";
import Contact from "./screens/contact/index";
import Add from "./screens/add/index";

import Login from "./screens/auth/index";
import Check from "./screens/auth/check";

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

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth,
      App,
    },
    {
      initialRouteName: "Auth"
    }
  )
);
