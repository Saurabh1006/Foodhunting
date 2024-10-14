// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // Import Firebase authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfCmqPlEy3n6dSGZFyapZkef-2Dm1vVtA",
  authDomain: "foodhunt-dc4be.firebaseapp.com",
  projectId: "foodhunt-dc4be",
  storageBucket: "foodhunt-dc4be.appspot.com",
  messagingSenderId: "987695098486",
  appId: "1:987695098486:web:9d3d7174ea9d499a8fcd57",
  measurementId: "G-XJP1465RS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth, app, analytics };
