import React from "react";
import { TextInput } from "react-native";

export default function Input() {
  const [value_username, onchange_username] = React.useState("");
  const [value_password, onchange_password] = React.useState("");

  function onSubmit() {
    console.log(value_username);
    console.log(value_password)
  }

  return (
    <View>
      <TextInput
        onChangeText={onchange_username => onChangeText(onchange_username)}
        value={value_username}
      />
      <TextInput
        onChangeText={onchange_password => onChangeText(onchange_password)}
        value={value_password}
        onSubmitEditing={onSubmit}
      />
    </View>
  )
}

