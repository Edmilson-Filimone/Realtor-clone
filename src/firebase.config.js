// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYlxe_f6EW29hAdnE5APXlRbffWTDPW6c",
  authDomain: "realtor-react-clone.firebaseapp.com",
  projectId: "realtor-react-clone",
  storageBucket: "realtor-react-clone.appspot.com",
  messagingSenderId: "635816683530",
  appId: "1:635816683530:web:f6284ab02a8ed86a4b97f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//firestore export db
const db = getFirestore(app);

// Initialize Cloud Storage
const storage = getStorage(app);

export {db, storage};

