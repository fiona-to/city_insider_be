import firebase from "firebase/app";
import "firebase/firestore";
//import "firebase/database";

// Firebse's config
export const fbConfig = {
  apiKey: "AIzaSyBv_mTaqzH0wwo3F5tHaFIlrpPUaeJRTcA",
  authDomain: "city-insider-1344e.firebaseapp.com",
  databaseURL: "https://city-insider-1344e-default-rtdb.firebaseio.com",
  projectId: "city-insider-1344e",
  storageBucket: "city-insider-1344e.appspot.com",
  messagingSenderId: "39256943366",
  appId: "1:39256943366:web:5a16371a05801ae04e8c87",
  measurementId: "G-EZNC1T18SV",
};

// Initialize firebase
try {
  firebase.initializeApp(fbConfig);
  firebase.firestore();
} catch (e) {
  console.log("Initialize firebase app ERROR: ", e);
}

export default firebase;
