import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import icon from "../assets/musicPNG.png";
import Song from "./displayingLibraries/Song";
import styles from "../styles";
import {db} from "../config/Firebase";

export default function HomeScreen(props) {
  const [songs, setSongs] = React.useState({});

  useEffect(() => {
    db.ref("songs").on('value', (querySnapshot) => {
      setSongs(querySnapshot.val());
    })
  }, []);

    //map the junk data into a list of songs
    //TODO: Change into URI, or decode base64 like what Lucas 
    let songsList = Object.entries(songs);
    songsList = songsList.map((section, index) => {
      let songImage;
      let songRef=db.ref("songImages/"+section[0]);
      // db.child("songImages").child(section[0]).get().then(
      //   function(snapshot) {
      //     if (snapshot.exists()) {
      //       songImage= snpashot.val();
      //     }
      //     else {
      //       console.log("No data available");
      //     }
      //   }
      // )
      return (
        <TouchableOpacity 
        key ={index} 
        
        onPress={() => props.navigation.navigate("PlaySong", {
          image: icon/*section[1].image*/,
          songName : section[0],
          originalBPM: section[1].tempo,
          concertPitch: section[1].concertPitch
        })} >
          <Song 
          songName = {section[0]}
          image = {icon} /*{section[1].image}*/
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

        
      </View>

        
    </View>

    
    
  );
}

