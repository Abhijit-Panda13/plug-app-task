import {initializeApp} from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
export const provider = new GoogleAuthProvider();

const app = initializeApp({
  apiKey: "AIzaSyAbDX2h89aE0swUhPHhDD5Kq0umt1n9Bmc",
  authDomain: "plug-app-backend.firebaseapp.com",
  databaseURL: "https://plug-app-backend-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "plug-app-backend",
  storageBucket: "plug-app-backend.appspot.com",
  messagingSenderId: "559540697772",
  appId: "1:559540697772:web:a3ad35fa740b2e69897d09",
  measurementId: "G-HFFKKQQPTR"
});

let user = null;
export const auth = getAuth();


// // init services
export const db = getFirestore(app);

// // collection ref
// const colRef = collection(db, 'friends');
// // get collection data
// getDocs(colRef)
//   .then((snapshot) =>{
//     console.log(snapshot.docs);
//   })
export const logOut = ()=>{
  
  signOut(auth).then(() => {
  }).catch((error) => {
    // An error happened.
  });
}



