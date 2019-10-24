import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from "./screens/main/index";
import People from "./screens/people/index";
import Contact from "./screens/contact/index";
import Add from "./screens/add/index";
import Config from "./screens/config/index"

import Loading from "./screens/auth/loading";
import Switch from "./screens/auth/switch";

import Login from "./screens/auth/index";
import NewUser from "./screens/auth/newuser";

import Take from "./screens/photos/take";
import Preview from "./screens/photos/preview";

const screenOptions = {
  navigationOptions: {
    header: null
  }
}

const App = createStackNavigator({
  Home: {
    screen: Home,
    ...screenOptions
  },
  People: {
    screen: People,
    ...screenOptions
  },
  Contact: {
    screen: Contact,
    ...screenOptions
  },
  Add: {
    screen: Add,
    ...screenOptions
  },
  Config: {
    screen: Config,
    ...screenOptions
  },
  Take: {
    screen: Take,
    ...screenOptions
  },
  Preview: {
    screen: Preview,
    ...screenOptions
  },
});

const Auth = createStackNavigator({
  Login: {
    screen: Login,
    ...screenOptions
  },
  NewUser: {
    screen: NewUser,
    ...screenOptions
  }

})

const Start = createStackNavigator({
  Switch: {
    screen: Switch,
    ...screenOptions
  },
  Loading: {
    screen: Loading,
    ...screenOptions
  },

})

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth,
      App,
      Start,
    },
    {
      initialRouteName: "Start"
    }
  )
);
