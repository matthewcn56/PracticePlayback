import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function UploadSongScreen(props) {
  return (
    <View style={styles.container}>
      <Text>This is our UploadSongScreen</Text>

      <Button
        onPress= {() => props.navigation.navigate("SelectImage")}
        title = "Select a Different Image"
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