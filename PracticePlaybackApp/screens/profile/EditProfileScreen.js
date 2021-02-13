import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function EditProfileScreen(props) {
  return (
    <View style={styles.container}>
      <Text>This is our EditProfileScreen</Text>

      <Button
            onPress= {() => props.navigation.navigate("Profile")}
            title = "Back To Your Profile"
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});