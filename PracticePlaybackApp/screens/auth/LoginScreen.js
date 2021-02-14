import React, {useState, useContext} from "react";
import {Text, View, TextInput} from "react-native";
import { AuthContext } from "../../navigation/AuthProvider";
import styles from "../../styles";

export default function LoginScreen(props){
    const {login} = useContext(AuthContext);
    function handleLogin(){
        login();
    }
    return(
        <View style = {styles.container}>
            <Text>This is our Login Screen</Text>
        </View>
    )
}