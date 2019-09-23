import React from "react";
import { Text } from "react-native";

export default function Switch({ navigation }) {
    if (__DEV__) {
        console.log('dev')
        navigation.navigate('Select_Page');
    } else {
        console.log('pro')
        navigation.navigate('Auth');
    }

    return (
        <Text>Loading...</Text>
    )
}
