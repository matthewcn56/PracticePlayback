import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

export default function AuthStack(props){
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator initialRouteName = "Login">
            <Stack.Screen
                name = "Login"
                component = {LoginScreen}
                options={{ header: () => null }}
                />
            <Stack.Screen
                name = "Register"
                component = {RegisterScreen}
                options={{ header: () => null }}
                />
            

        </Stack.Navigator>
    )
}