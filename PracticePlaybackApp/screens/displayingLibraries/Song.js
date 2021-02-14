import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../../styles";

export default function Song(props) {
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
    return (
        <View style ={styles.songContainer} >
            <Text style = {styles.songHeader}>
                {props.songName}
            </Text>
            <Image source = {/* prob change to URI or decoded base 64 with database*/props.image} style ={styles.thumbnailStyles}/>
            <Text style ={styles.songSubheader}>
                {"Pitch: " +convertConcertPitch(props.concertPitch)}
            </Text>
            
            
        </View>
    )
}