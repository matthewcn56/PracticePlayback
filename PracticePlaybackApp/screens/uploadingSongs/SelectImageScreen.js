import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, Platform} from 'react-native';
import * as ImagePicker from "expo-image-picker";

export default function SelectImageScreen(props) {
  const [selectedImage, setSelectedImage]= useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("image selected is " +result.uri);
    if (!result.cancelled){
      setSelectedImage(result.uri);
    }
  }
  //ask for camera roll permissions when screen gets mounted
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web'){
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted'){
          alert("Camera roll permissions required to upload sheet music!");
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>This is our SelectImageScreen</Text>

    <Button
        onPress= {pickImage}
        title = { selectedImage ? "Select A Different Picture" : "Choose A Picture"}
      />
      {
        selectedImage && //conditionally render the image and the button to upload with the image
        <View>
          <Image source = {{uri : selectedImage}} style = {styles.imageStyles}/>
          <Button
          onPress= {() => props.navigation.navigate("UploadSong", {
            selectedImage: selectedImage
          })}
          title = "Upload Song with Selected Picture"
        />
        </View>
        

      }
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