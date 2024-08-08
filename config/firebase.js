import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPih6NeEvSrl0AbpQBQJrN83gWWyTx-XE",
  authDomain: "h2o-sentinel.firebaseapp.com",
  projectId: "h2o-sentinel",
  storageBucket: "h2o-sentinel.appspot.com",
  messagingSenderId: "931228111660",
  appId: "1:931228111660:web:a068202bffbc165444d289",
  measurementId: "G-1K49YNXEDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
