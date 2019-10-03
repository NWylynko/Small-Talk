import React from "react";
import { useGlobal } from "reactn";
import { Text } from "react-native";

export default function Switch({ navigation }) {

    const [DATA, set_DATA] = useGlobal('global_data');
    const [ME, set_ME] = useGlobal('global_me');
    const [FRIEND, set_FRIEND] = useGlobal('global_friend');

    set_DATA([])
    set_ME({})
    set_FRIEND({
        nickname: "..."
    })

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
