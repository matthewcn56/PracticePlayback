import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

export default function ProfileScreen(props) {
  return (
    <View style={styles.container}>
      <Text>This is our ProfileScreen</Text>

      <Button
            onPress= {() => props.navigation.navigate("EditProfile")}
            title = "Edit Your Profile"
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