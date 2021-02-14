import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../../styles";

export default function Song(props) {
    return (
        <View style ={styles.songContainer} >
            <Text style = {styles.songHeader}>
                {props.songName}
            </Text>
            <Image source = {/* prob change to URI or decoded base 64 with database*/props.image} style ={styles.thumbnailStyles}/>
            <Text style ={styles.songSubheader}>
                {"Instrument: " +props.instrument}
            </Text>
            
            
        </View>
    )
}