import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
	apiKey: "AIzaSyBhOKMDz4aVabnhtTsxqXwc9dcdt2v5-5g",
	authDomain: "enrollment-student-mobile-app.firebaseapp.com",
	projectId: "enrollment-student-mobile-app",
	storageBucket: "enrollment-student-mobile-app.firebasestorage.app",
	messagingSenderId: "314879881419",
	appId: "1:314879881419:web:28c6afdf3bedf7751d6b4e",
	measurementId: "G-59H5GMS8F0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
