import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';
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
const db = getDatabase();
const database = getDatabase();
// ========== Auth State ====================
onAuthStateChanged(auth, (user) => {
    if (user) {
        // console.log(user)
        const uid = user.uid;
        // console.log(uid)
        // console.log(user.email)
        // console.log(user.accessToken)
         let Collection = [2345678,3424235236,235235325235,325235326]
         let nameCollection = 'Watched'
         writeUserData(uid,Collection)
         readUserData(uid)
        // writeToFBHundler(user.accessToken,nameCollection,user.uid,Collection) 
        // readFromFBHundler(user.accessToken,nameCollection,user.uid)
    } else {
        console.log('eror')
    }
  });
// ==========login to Firebase====================
function RegistrationWithEmailAndPassword(email, password) {
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // ...
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
export{authWithEmailAndPassword,RegistrationWithEmailAndPassword}

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
// ========== write User Data to Firebase====================
  function writeUserData(userId, Collection) {
    set(ref(db, 'users/' + userId), {
      queue:Collection,
      Watched:Collection,
    });
  }
  const dbRef = ref(getDatabase());
// ========== read User Data to Firebase====================
  function readUserData(userId){
    get(child(dbRef, `users/${userId}`)).then((data) => {
        if (data.exists()) {
          console.log(data.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
  }
