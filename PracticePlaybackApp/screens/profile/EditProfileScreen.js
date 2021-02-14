import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import styles from "../../styles";

export default function EditProfileScreen(props) {
  return (
    <View style={styles.container}>
      <Text>This is our EditProfileScreen</Text>

      <TouchableOpacity
            style = {styles.button}
            onPress= {() => props.navigation.navigate("Profile")}
        >
          <Text>Back To Your Profile</Text>
          </TouchableOpacity>
    </View>
  );
}

