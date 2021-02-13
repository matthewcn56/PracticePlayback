import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import UploadSongStack from "./UploadSongStack";
import ProfileStack from "./ProfileStack";
import PlaySongScreen from "../screens/PlaySongScreen";


export default function HomeStack(props){
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName = "Home">
            <Stack.Screen
                name = "Home"
                component = {HomeScreen}
            />

            <Stack.Screen
                name = "UploadSong"
                component = {UploadSongStack}
            />

            <Stack.Screen
                name = "Profile"
                component = {ProfileStack}
            />

            <Stack.Screen
                name = "PlaySong"
                component = {PlaySongScreen}
            />

            




        </Stack.Navigator>
    )
}
