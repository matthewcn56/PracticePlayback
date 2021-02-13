import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import ProfileScreen from "../screens/profile/ProfileScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";

export default function ProfileStack(props){
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName = "ProfileScreen">
            <Stack.Screen
                name = "Profile"
                component = {ProfileScreen}
                options={{ header: () => null }}
            />

            <Stack.Screen
                name = "EditProfile"
                component = {EditProfileScreen}
                options={{ header: () => null }}
            />
            
        </Stack.Navigator>
    )
}