// import { initializeApp } from 'firebase/app';
// import "firebase/auth";
// import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBW1s5cEQltmDJwesjDl1e6HNYsmOPurRM",
//   authDomain: "omdb-efa0e.firebaseapp.com",
//   projectId: "omdb-efa0e",
//   storageBucket: "omdb-efa0e.appspot.com",
//   messagingSenderId: "438293385977",
//   appId: "1:438293385977:web:95c8b21db92f6652ee8828",
//   measurementId: "G-LH94XRBQSG",
// };
// // Initialize Firebase
// const firebase = initializeApp(firebaseConfig);
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBW1s5cEQltmDJwesjDl1e6HNYsmOPurRM",
  authDomain: "omdb-efa0e.firebaseapp.com",
  projectId: "omdb-efa0e",
  storageBucket: "omdb-efa0e.appspot.com",
  messagingSenderId: "438293385977",
  appId: "1:438293385977:web:95c8b21db92f6652ee8828",
  measurementId: "G-LH94XRBQSG"
});

export const db = firebase.firestore();
export const auth = firebase.auth();

export default app;



