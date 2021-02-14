import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import Slider from "@react-native-community/slider";
import styles from "../../styles";
import {Picker} from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";

export default function UploadSongScreen(props) {
  const {selectedImage} = props.route.params;
  const [tempo, setTempo] = useState(120);
  const [instrument, setInstrument] = useState("Select Instrument");

  function handleUploadSong(){
    //test for invalid arguments
    if(instrument ==="Select Instrument")
      alert("Sheet music must have instrument associated with it!");
  }

  function decrementTempo() {
    setTempo((prevValue) => {return (prevValue -1)})
  }

  function incrementTempo() {
    setTempo((prevValue) => {return (prevValue+1)})
  }
  return (
    <View style={pageStyles.screenContainer}>
      <Text>Chosen Image</Text>
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
            <Picker.Item label = "Select Instrument" value = "Select Instrument"/>
            <Picker.Item label = "Clarinet" value = "clarinet"/>
            <Picker.Item label = "Cello" value = "cello"/>
            <Picker.Item label = "flute" value = "flute"/>

          </Picker> 

       

        <TouchableOpacity
        style = {styles.button}
        onPress= {handleUploadSong}
        >
          <Text> Upload Song To Your Library</Text>
        </TouchableOpacity>

      <TouchableOpacity
        onPress= {() => props.navigation.navigate("SelectImage")}
        style ={styles.button}
      >
          <Text>Select a Different Image</Text>
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