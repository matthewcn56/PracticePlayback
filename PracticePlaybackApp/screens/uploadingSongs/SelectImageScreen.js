import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function SelectImageScreen(props) {
  return (
    <View style={styles.container}>
      <Text>This is our SelectImageScreen</Text>

      <Button
        onPress= {() => props.navigation.navigate("UploadSong")}
        title = "Upload A Song"
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