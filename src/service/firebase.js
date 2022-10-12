// Import the functions you need from the SDKs you need
// import firebase from "firebase/compat/app";
// import "firebase/compat/database";
// import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getFirestore, initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
// const firestoreSettings = { experimentalAutoDetectLongPolling: true };
// const db = initializeFirestore(firebaseApp, firestoreSettings);
// const db = firebase.firestore(firebaseApp);
// const db = getFirestore(firebaseApp);

// const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
// const db = firebase.database(firebaseApp);

export default db;
