import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAHOZyWKieJkZ0qSPc8J5TYdORDdDwCL4k",
  authDomain: "instagram-clone-e843b.firebaseapp.com",
  projectId: "instagram-clone-e843b",
  storageBucket: "instagram-clone-e843b.appspot.com",
  messagingSenderId: "4706775142",
  appId: "1:4706775142:web:5c5f81cb014949ac997da7",
  measurementId: "G-NB8DY1Q2QE"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();

const db = firebase.firestore();

export { auth,firebaseApp,db };

