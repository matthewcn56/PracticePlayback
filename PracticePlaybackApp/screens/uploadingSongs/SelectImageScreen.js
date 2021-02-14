import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, Platform, TouchableOpacity} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import styles from "../../styles";

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
    <View style={styles.imageScreenContainer}>

    <TouchableOpacity
        onPress= {pickImage}
        style ={styles.button}
      >
        <Text>{ selectedImage ? "Select A Different Picture" : "Choose A Picture"}</Text>
        </TouchableOpacity>
      {
        selectedImage && //conditionally render the image and the button to upload with the image
        <View>
          <View>
            <Image source = {{uri : selectedImage}} style = {styles.imageStyles}/>
          </View>
          <TouchableOpacity
          style ={styles.button}
          onPress= {() => props.navigation.navigate("UploadSong", {
            selectedImage: selectedImage
          })}
        >
          <Text> Upload Song with Selected Picture</Text>
          </TouchableOpacity>

        
        </View>
        

      }
    </View>

    

    
  );
}

