import React from "react";
import { useGlobal } from "reactn";
import { Text } from "react-native";

export default function Switch({ navigation }) {

  const [DATA, set_DATA] = useGlobal('data');
  const [ME, set_ME] = useGlobal('me');
  const [FRIEND, set_FRIEND] = useGlobal('friend');
  const [FRIEND_DATA, set_FRIEND_DATA] = useGlobal('friend_data');

  set_DATA([])
  set_ME({})
  set_FRIEND({
    nickname: "..."
  })
  set_FRIEND_DATA([])

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
