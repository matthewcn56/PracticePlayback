import React, {useContext, useState, useEffect} from "react";
import HomeStack from "./HomeStack";
import AuthStack from "./AuthStack";
import firebase from "firebase";
import db from "../config/Firebase";
import { AuthContext } from "./AuthProvider";
import {NavigationContainer} from "@react-navigation/native";
import { ActivityIndicator} from "react-native";

export default function Routes(){
    const {user, setUser} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);
    //handle user state changes
    useEffect(() => {
        console.log("mounting...");
        const subscriber = firebase.auth().onAuthStateChanged(
            function (user) {
                setUser(user);
                if (initializing) setInitializing(false);
                setLoading(false);
            }
    
        );
        return subscriber; // unsubscribe on unmount
      }, []);
      if (loading){
          return <ActivityIndicator/>;
      }
    return(
        <NavigationContainer>
            { user ?<HomeStack/> : <AuthStack/> }
        </NavigationContainer>
    )
}