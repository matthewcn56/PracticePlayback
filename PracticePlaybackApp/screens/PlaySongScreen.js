import React from 'react';
import { Image, StyleSheet, Text, View, } from 'react-native';
import styles from "../styles";

export default function PlaySongScreen(props) {
  const {image, songName} = props.route.params;
  return (
    <View style={styles.container}>
      <Text>Screen for playing {songName}</Text>
      <Image source = {image} style = {styles.imageStyles}/>


    </View>
  );
}

