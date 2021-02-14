import db from "./config/Firebase";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Providers from "./navigation/index";
import HomeScreen from "./screens/HomeScreen";
import HomeStack from "./navigation/HomeStack";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  return (
    // <Providers/>
    <NavigationContainer>
        <HomeStack/>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
