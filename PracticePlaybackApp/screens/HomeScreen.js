import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import icon from "../assets/icon.png";
import Song from "./displayingLibraries/Song";
import styles from "../styles";

export default function HomeScreen(props) {
    const junkData = {
      song1: {
        songName : "song1",
        image :icon,
        concertPitch : "Concert C",
        originalBPM : 120
      },
      song2: {
        songName : "song2",
        image :icon,
        concertPitch : "Concert C",
        originalBPM : 150
      },
      song3: {
        songName : "song3",
        image :icon,
        concertPitch : "Concert D Flat",
        originalBPM : 130
      },
      song4: {
        songName : "song4",
        image :icon,
        concertPitch : "Concert B Flat",
        originalBPM : 180
      }
    }
    //map the junk data into a list of songs
    //TODO: Change into URI, or decode base64 like what Lucas 
    let songsList = Object.entries(junkData);
    songsList = songsList.map((section, index) => {
      return (
        <TouchableOpacity 
        key ={index} 
        
        onPress={() => props.navigation.navigate("PlaySong", {
          image: section[1].image,
          songName : section[0],
          originalBPM: section[1].originalBPM,
          concertPitch: section[1].concertPitch
        })} >
          <Song 
          songName = {section[0]}
          image = {section[1].image}
          concertPitch = {section[1].concertPitch}/>
        </TouchableOpacity>
      )
    })
    console.log(songsList);

  return (
    <View style={styles.container}>
      <Text style ={styles.headerText}>Your Uploaded Songs</Text>
      <View style ={styles.libraryScroll}>
        <ScrollView>
          {songsList}
        </ScrollView>
      </View>
      <View style ={styles.pageBottom}>
        <TouchableOpacity
            onPress= {() => props.navigation.navigate("UploadSong")}
            
            style ={styles.button}
        >
           <Text style ={styles.buttonText}>  Upload A Song </Text>
          </TouchableOpacity>

        <TouchableOpacity
            onPress= {() => props.navigation.navigate("Profile")}
            style = {styles.button}
        ><Text style = {styles.buttonText}> Go To Profile Screen</Text>
          </TouchableOpacity>
      </View>

        
    </View>

    
    
  );
}

