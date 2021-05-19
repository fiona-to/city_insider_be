import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";

// Firebse's config
export const fbConfig = {
  // Configuration goes here
};

// Initialize firebase
try {
  firebase.initializeApp(fbConfig);
  firebase.firestore();
  firebase.auth();
} catch (e) {
  console.log("Initialize firebase app ERROR: ", e);
}

export default firebase;
