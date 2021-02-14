import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import Slider from "@react-native-community/slider";
import styles from "../../styles";
import {Picker} from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";

export default function UploadSongScreen(props) {
  const {selectedImage} = props.route.params;
  const [tempo, setTempo] = useState(120);
  const [instrument, setInstrument] = useState("Select Concert Pitch");

  function handleUploadSong(){
    //test for invalid arguments
    if(instrument ==="Select Concert Pitch")
      alert("Sheet music must have a pitch associated with it!");
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
          What Instrument Is This Sheet Music For?
        </Text>
         <Picker
          selectedValue = {instrument}
          style = {styles.picker}
          onValueChange= {(itemValue, itemIndex) =>setInstrument(itemValue)}>
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

       

        <TouchableOpacity
        style = {styles.button}
        onPress= {handleUploadSong}
        >
          <Text style ={styles.buttonText}> Upload Song To Your Library</Text>
        </TouchableOpacity>

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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
  },
 
}

)