import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from "./screens/main/index";
import People from "./screens/people/index";

const Main = createStackNavigator({
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
});
//const AuthStack = createStackNavigator({ SignIn: SignIn, SignIn2: SignIn2, SignUp: SignUp });

export default createAppContainer(
  createSwitchNavigator(
    {
      //AuthLoading: AuthLoadingScreen,
      App: Main
      //Auth: AuthStack,
    },
    {
      initialRouteName: "App"
    }
  )
);
