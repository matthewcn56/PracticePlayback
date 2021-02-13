import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <Text>This is our HomeScreen</Text>

        <Button
            onPress= {() => props.navigation.navigate("UploadSong")}
            title = "Upload A Song"
        />

        <Button
            onPress= {() => props.navigation.navigate("Profile")}
            title = "Go To Profile Screen"
        />

        <Button
            onPress= {() => props.navigation.navigate("PlaySong")}
            title = "Go To Play Song Screen"
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