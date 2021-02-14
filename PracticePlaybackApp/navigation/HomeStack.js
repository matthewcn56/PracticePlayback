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
                options = {{
                    title: "Home Screen"
                }}
                component = {HomeScreen}
            />

            <Stack.Screen
                name = "UploadSong"
                options = {{
                    title: "Uploading Song"
                }}
                component = {UploadSongStack}
            />

            <Stack.Screen
                name = "Profile"
                component = {ProfileStack}
            />

            <Stack.Screen
                name = "PlaySong"
                options = {{
                    title: "Play A Song"
                }}
                component = {PlaySongScreen}
            />

            




        </Stack.Navigator>
    )
}
