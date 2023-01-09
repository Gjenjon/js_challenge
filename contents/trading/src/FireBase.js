// settings             
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved, get}
                  from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.14.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSvSaynTxvrPw7n6Dt6qUbKl_aKz9P_kw",
  authDomain: "jschallenge-a5765.firebaseapp.com",
  databaseURL: "https://jschallenge-a5765-default-rtdb.firebaseio.com",
  projectId: "jschallenge-a5765",
  storageBucket: "jschallenge-a5765.appspot.com",
  messagingSenderId: "985801193792",
  appId: "1:985801193792:web:47d6d6abb1130538a4e2a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // connect to realtime db
