import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from "./screens/main/index";
import People from "./screens/people/index";
import Contact from "./screens/contact/index";
import Add from "./screens/add/index";

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
});
//const AuthStack = createStackNavigator({ SignIn: SignIn, SignIn2: SignIn2, SignUp: SignUp })

export default createAppContainer(
  createSwitchNavigator(
    {
      //AuthLoading: AuthLoadingScreen,
      App,
      //Auth: AuthStack,
    },
    {
      initialRouteName: "App"
    }
  )
)
