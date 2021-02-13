import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default function UploadSongScreen(props) {
  const {selectedImage} = props.route.params;
  return (
    <View style={styles.container}>
      <Text>This is our UploadSongScreen</Text>
      {
        selectedImage && 
        <View>
          <Image source = {{uri : selectedImage}} style = {styles.imageStyles}/>
        </View>
      }
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

  imageStyles: {
    width: 300,
    height: 200
  }
});