import React, {useState} from 'react';
import {db} from "../../config/Firebase";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput } from 'react-native';
import Slider from "@react-native-community/slider";
import styles from "../../styles";
import {Picker} from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import icon from "../../assets/icon.png";

export default function UploadSongScreen(props) {
  const [songTitle, setSongTitle] = React.useState("Name This Piece");
  const {selectedImage} = props.route.params;
  const [tempo, setTempo] = useState(120);
  const [pitch, setPitch] = useState("Select Concert Pitch");

  function handleUploadSong(){
    /* hardcoded, can get values from moonlight API call, unable to set up in timeframe */
      const odeToJoy = {
    "concertPitch": "C",
    "tempo": 80,
    "note1": [54, 0.0, 0.5],
    "note2": [54, 0.5, 1.0],
    "note3": [55, 1.0, 1.5],
    "note4": [57, 1.5, 2.0],
    "note5": [57, 2.0, 2.5],
    "note6": [55, 2.5, 3.0],
    "note7": [54, 3.0, 3.5],
    "note8": [52, 3.5, 4.0],
    "note9": [50, 4.0, 4.5],
    "note10": [50, 4.5, 5.0],
    "note11": [52, 5.0, 5.5],
    "note12": [54, 5.5, 6.0],
    "note13": [54, 6.0, 6.75],
    "note14": [52, 6.75, 7.0],
    "note15": [52, 7.0, 8.0]
};

  const twinkle ={
    "concertPitch": "Bb",
    "tempo": 60,
    "note1": [60, 0.0, 0.5],
    "note2": [60, 0.5, 1.0],
    "note3": [67, 1.0, 1.5],
    "note4": [67, 1.5, 2.0],
    "note5": [69, 2.0, 2.5],
    "note6": [69, 2.5, 3.0],
    "note7": [67, 3.0, 4.0],
    "note8": [65, 4.0, 4.5],
    "note9": [65, 4.5, 5.0],
    "note10": [64, 5.0, 5.5],
    "note11": [64, 5.5, 6.0],
    "note12": [62, 6.0, 6.5],
    "note13": [62, 6.5, 7.0],
    "note14": [60, 7.0, 8.0]
};

  const hotCrossBuns = {
    "concertPitch": "Eb",
    "tempo": 90,
    "note1": [71, 0.0, 1.0],
    "note2": [69, 1.0, 2.0],
    "note3": [67, 2.0, 3.0],
    "note4": [71, 4.0, 5.0],
    "note5": [69, 5.0, 6.0],
    "note6": [67, 6.0, 7.0],
    "note7": [67, 8.0, 8.5],
    "note8": [67, 8.5, 9.0],
    "note9": [67, 9.0, 9.5],
    "note10": [67, 9.5, 10.0],
    "note11": [69, 10.0, 10.5],
    "note12": [69, 10.5, 11.0],
    "note13": [69, 11.0, 11.5],
    "note14": [69, 11.5, 12.0],
    "note15": [71, 12.0, 13.0],
    "note16": [69, 13.0, 14.0],
    "note17": [67, 14.0, 15.0]
}
;


    //test for invalid arguments
    if(pitch ==="Select Concert Pitch" || songTitle==="Name This Piece")
      alert("Give piece proper arguments!");
    else {
      let newSong;
      if (songTitle==="Ode To Joy")
        newSong = odeToJoy;
      else if (songTitle ==="Hot Cross Buns")
        newSong = hotCrossBuns;
      else newSong = twinkle;
      let image =selectedImage;
      let updates = {};
      updates['/songs/'+songTitle] = newSong;
      updates['/songImages/'+songTitle] = image;
      db.ref().update(updates);
      props.navigation.navigate("Home")
      

    }
  }

  function decrementTempo() {
    setTempo((prevValue) => {return (prevValue -1)})
  }

  function incrementTempo() {
    setTempo((prevValue) => {return (prevValue+1)})
  }
  return (
    <View style={pageStyles.screenContainer}>
        <View>
          <View style ={styles.spacedRow}>
            <Text>Song Title:  </Text>
            <TextInput
                style = {styles.input} 
                onChangeText= {text => setSongTitle(text)}
                value = {songTitle}
                />

          </View>   
          <Image source = {{uri : selectedImage}} style = {styles.imageStyles}/>
        </View>
        <Text>
          Tempo: {tempo}
        </Text>
        <View style = {styles.spacedRow}>

          <TouchableOpacity onPress={decrementTempo}>
            <AntDesign name = "stepbackward" size = {24} color = "black"/>
          </TouchableOpacity>

          <Slider
            style = {styles.slider}
            minimumValue = {30}
            step = {1}
            value = {tempo}
            maximumValue = {240}
            onValueChange= {value => setTempo(value)}
          />

          <TouchableOpacity onPress = {incrementTempo} >
            <AntDesign name = "stepforward" size = {24} color = "black"/>
          </TouchableOpacity>

          
        </View>
        <Text>
          What Concert Pitch Is This Sheet Music In?
        </Text>
          <View style ={styles.picker}>
          <Picker
            selectedValue = {pitch}
            
            onValueChange= {(itemValue, itemIndex) =>setPitch(itemValue)}>
              <Picker.Item label = "Select Concert Pitch" value = "Select Concert Pitch"/>
              <Picker.Item label = "Concert C" value = "C"/>
              <Picker.Item label = "Concert D Flat" value = "Db"/>
              <Picker.Item label = "Concert D" value = "D"/>
              <Picker.Item label = "Concert E Flat" value = "Eb"/>
              <Picker.Item label = "Concert E" value = "E"/>
              <Picker.Item label = "Concert F" value = "F"/>
              <Picker.Item label = "Concert G Flat" value = "Gb"/>
              <Picker.Item label = "Concert G" value = "G"/>
              <Picker.Item label = "Concert A Flat" value = "Ab"/>
              <Picker.Item label = "Concert A" value = "A"/>
              <Picker.Item label = "Concert B Flat" value = "Bb"/>
              <Picker.Item label = "Concert B" value = "B"/>


            </Picker> 
          </View>

       

        <TouchableOpacity
        style = {styles.button}
        onPress= {handleUploadSong}
        >
          <Text style ={styles.buttonText}> Upload Song To Your Library</Text>
        </TouchableOpacity>
      <View style ={{ height:10 }}/>
      <TouchableOpacity
        onPress= {() => props.navigation.navigate("SelectImage")}
        style ={styles.button}
      >
          <Text style ={styles.buttonText}>Select a Different Image</Text>
      </TouchableOpacity>

     


    </View>
  );
}

const pageStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    display: "flex",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
  },
 
}

)