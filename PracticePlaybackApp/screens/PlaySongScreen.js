import React, {useState} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import styles from "../styles";
import Slider from "@react-native-community/slider";
import { AntDesign } from "@expo/vector-icons";
import {db} from "../config/Firebase";

export default function PlaySongScreen(props) {
  function convertConcertPitch(pitch){
    switch(pitch){
      case "C":
        return "Concert C";
        break;
      case "Db":
        return "Concert D Flat";
        break;
      case "D":
        return "Concert D ";
        break;
      case "Eb":
          return "Concert E Flat";
          break;
      case "E":
        return "Concert E";
        break;
      case "F":
        return "Concert F";
        break;
      case "Gb":
          return "Concert G Flat";
          break;
      case "G":
        return "Concert G";
        break;
      case "Ab":
        return "Concert A Flat";
        break;
      case "A":
        return "Concert A";
        break;
      case "Bb":
        return "Concert B Flat";
      case "B":
        return "Concert B";
      default : return "ERROR";
    }
  }
  const {image, songName, originalBPM, concertPitch} = props.route.params;
  const [tempo, setTempo] = useState(originalBPM);


  function decrementTempo() {
    setTempo((prevValue) => {return (prevValue -1)})
  }

  function incrementTempo() {
    setTempo((prevValue) => {return (prevValue+1)})
  }

  function handlePlaySong() { 
    let updates = {};
    updates['/currSong'] = songName;
    updates['/currTempo'] = tempo;
    db.ref().update(updates);
  }

  function deleteSong() {
    let ref1= db.ref("songs/"+songName);
    let ref2 = db.ref("songImages/"+songName);
    ref1.remove()
    .then(function() {
      console.log("Remove succeeded.")
    })
    .catch(function(error) {
      console.log("Remove failed: " + error.message)
    });
    ref2.remove()
    .then(function() {
      console.log("Remove succeeded.")
    })
    .catch(function(error) {
      console.log("Remove failed: " + error.message)
    });
    props.navigation.navigate("Home");



  }
  return (
    <View style={styles.centerContainer}>

        <TouchableOpacity 
          onPress={deleteSong}
          style = {styles.button}
        >
          <Text style ={styles.buttonText}>Delete Current Song </Text>
        </TouchableOpacity>
      <Image source = {image} style = {styles.imageStyles}/>
      <Text>Concert Pitch: {convertConcertPitch(concertPitch)}</Text>
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
          <Text style ={styles.buttonText}>Play Song At Selected Tempo </Text>
          </TouchableOpacity>



    </View>
  );
}

