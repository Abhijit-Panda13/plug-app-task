// import dotenv from 'dotenv'
// dotenv.config()
import {initializeApp} from "firebase/app";
import { getAuth, getRedirectResult, GoogleAuthProvider, signOut, signInWithPopup } from "firebase/auth";


// initializeApp({
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId:  process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID
// });
const provider = new GoogleAuthProvider();

initializeApp({
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
export const signInWithGoogle = () =>{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    user = result.user;
    
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}


// // init services
// const db = getFirestore();

// // collection ref
// const colRef = collection(db, 'friends');
// // get collection data
// getDocs(colRef)
//   .then((snapshot) =>{
//     console.log(snapshot.docs);
//   })
export const logOut = ()=>{
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}
export const UserDetails = user;


