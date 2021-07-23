// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCZdGgPZR62U1qM0bvXHNau8tBWpa3YKmQ",
  authDomain: "todoapp-f9fc0.firebaseapp.com",
  projectId: "todoapp-f9fc0",
  storageBucket: "todoapp-f9fc0.appspot.com",
  messagingSenderId: "752623891289",
  appId: "1:752623891289:web:13bfa6dbd77988925ed248",
  measurementId: "G-GM9D5328XQ",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
