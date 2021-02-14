import React, {useState} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import styles from "../styles";
import Slider from "@react-native-community/slider";
import { AntDesign } from "@expo/vector-icons";

export default function PlaySongScreen(props) {
  const {image, songName, originalBPM} = props.route.params;
  const [tempo, setTempo] = useState(originalBPM);

  function decrementTempo() {
    setTempo((prevValue) => {return (prevValue -1)})
  }

  function incrementTempo() {
    setTempo((prevValue) => {return (prevValue+1)})
  }

  function handlePlaySong() { 
    console.log("Song will play!!");
  }
  return (
    <View style={styles.container}>
      <Text>Screen for playing {songName}</Text>
      <Image source = {image} style = {styles.imageStyles}/>
      <Text>Original BPM: {originalBPM} BPM </Text>

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
          Practice BPM: {tempo} BPM
        </Text>

        <TouchableOpacity 
          onPress={handlePlaySong}
          style = {styles.button}
        >
          <Text>Play Song At Selected Tempo </Text>
          </TouchableOpacity>



    </View>
  );
}

