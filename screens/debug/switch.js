import React from "react";
import { Text } from "react-native";

export default function Switch({ navigation }) {
    if (__DEV__) {
        //navigation.navigate('Select_Page');
        navigation.navigate('Fake_Login')
    } else {
        navigation.navigate('Auth');
    }

    return (
        <Text>Loading...</Text>
    )
}
