import { initializeApp } from "firebase/app";
import Refs from "./Refs";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged , reauthenticateWithCredential  ,signOut} from 'firebase/auth';
import { getDatabase, ref, set, child, get  } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyBR83s7HPzADcrtRoUE2ndSXGar5JAgfWk",
    authDomain: "filmoteka2-11906.firebaseapp.com",
    projectId: "filmoteka2-11906",
    storageBucket: "filmoteka2-11906.appspot.com",
    messagingSenderId: "12870537930",
    appId: "1:12870537930:web:d7a02c2d3d10fd4e9f5a33",
    databaseURL: "https://filmoteka2-11906-default-rtdb.europe-west1.firebasedatabase.app/"
  };
// Your web app's Firebase configuration
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// ========== Auth State ====================
function authState(){
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid)
        console.log(user.email)
        localStorage.setItem('userId',uid)
        // console.log(user.accessToken)
    } else {
      console.log('no user')
    }
  });
}
// ==========login to Firebase====================
function RegistrationWithEmailAndPassword(email, password) {
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    console.log(errorCode)
    // ..
  });}
// ==========login to Firebase====================
function authWithEmailAndPassword(email, password) {
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    console.log(errorCode)
  });
}
function logOutAuthUser(){
  localStorage.clear()
  console.log('userOut')
  signOut(auth)
}
export{authWithEmailAndPassword,RegistrationWithEmailAndPassword,logOutAuthUser,authState}

// function writeToFBHundler(accessToken,nameCollection,uid,Collection) {
//     console.log(nameCollection)
//     return fetch(
//       `https://filmoteka2-11906-default-rtdb.europe-west1.firebasedatabase.app//${uid}/${nameCollection}.json?auth=${accessToken}`,
//       {
//         method: 'POST',
//         body: JSON.stringify(Collection),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     )
//       .then(response => response.json())
//       .then(data => console.log(data));
//   }

//   function readFromFBHundler(accessToken,nameCollection,uid) {
//     return fetch(
//       `https://filmoteka2-11906-default-rtdb.europe-west1.firebasedatabase.app//${uid}/${nameCollection}.json?auth=${accessToken}`,
//     )
//       .then(response => response.json())
//       .then(response => console.log(response))
//   }

