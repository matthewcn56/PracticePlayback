import firebase from "firebase";
import apiKeys from "./apiKeys";
let app;
if (!firebase.apps.length)
    app =firebase.initializeApp(apiKeys.firebaseConfig);
else app =firebase.app();
export const db = app.database();
console.log("Firebase set up!");



