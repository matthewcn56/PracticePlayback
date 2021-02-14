import React, {createContext, useState} from "react";
import firebase from "firebase";
import db from "../config/Firebase";
import apiKeys from "../config/apiKeys";
export const AuthContext = createContext({});
export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    function register(){
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((userCredential) => {
            setUser(userCredential.user);
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
          });
    }

    function signIn(email, password){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            setUser(userCredential.user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    }

    function signOut(){
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }

    return (
        <AuthContext.Provider
            value = {{
                user,
                setUser,
                register,
                signIn,
                signOut


            }}
            >
                {children}
            </AuthContext.Provider>
    )
}