import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq88_AgcdEvLIJ-nFCbMNADNeZAkbZmEU",
  authDomain: "ecommarce-assignment.firebaseapp.com",
  // databaseURL: "https://ecommarce-assignment-default-rtdb.firebaseio.com",
  projectId: "ecommarce-assignment",
  storageBucket: "ecommarce-assignment.appspot.com",
  messagingSenderId: "686683389936",
  appId: "1:686683389936:web:1d0a99a1a52640a95fe735",
  measurementId: "G-3J5DDF6ZS4",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const fs = firebase.firestore();

const storage = firebase.storage();

export { auth, fs, storage };
