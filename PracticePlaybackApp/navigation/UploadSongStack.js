import React from "react";
import { createStackNavigator} from "@react-navigation/stack";
import SelectImageScreen from "../screens/uploadingSongs/SelectImageScreen";
import UploadSongScreen from "../screens/uploadingSongs/UploadSongScreen";

export default function UploadSongStack(props){
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator initialRouteName = "SelectImage">
            <Stack.Screen
                name = "SelectImage"
                component = {SelectImageScreen}
                options={{ header: () => null }}/>
            
            <Stack.Screen
                name = "UploadSong"
                component = {UploadSongScreen}
                options={{ header: () => null }}/>
            
        </Stack.Navigator>
    )
}