// ==========styles=================
import './sass/main.scss';
// ==========Document Refs===========
import "./js/Refs";
// ==========Document HEADER=========
import "./js/header";
// ==========Document MAIN========
import "./js/gallery";
// ==========Document FOOTER=========
import "./js/footer";
//+++++++++++++++++++ filmoteca2 ++++++++++++++++++++++++++++ 
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR83s7HPzADcrtRoUE2ndSXGar5JAgfWk",
  authDomain: "filmoteka2-11906.firebaseapp.com",
  projectId: "filmoteka2-11906",
  storageBucket: "filmoteka2-11906.appspot.com",
  messagingSenderId: "12870537930",
  appId: "1:12870537930:web:d7a02c2d3d10fd4e9f5a33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
console.log(app)
console.log(auth)
console.log(db)