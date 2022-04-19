import React, { useEffect, useContext, useState } from "react";
import "./Signin.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider, db } from "../../services/firebase";
import PropTypes from "prop-types";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getRandomUser } from "../../services/randomuser";

export default function Signin({ setToken }) {
  const [anonymous, setAnonymous] = useState(null);
  const signInWithAnonymous = async () => {
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
    onAuthStateChanged(auth, (user) => {
      console.log(
        "user",
        anonymous.results[0].name.first + " " + anonymous.results[0].name.last
      );
      var user_final = {
        displayName:
          anonymous.results[0].name.first +
          " " +
          anonymous.results[0].name.last,
        email: anonymous.results[0].email,
        photoURL: anonymous.results[0].picture.large,
        uid: user.uid,
        likes: true,
        thumbsUp: true,
        thumbsDown: true,
        description: true,
      };
      console.log("Final User", user_final);
      if (user_final) {
        setToken(user_final);
      } else {
        alert("Error");
      }
    });
  };
  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setToken(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  useEffect(async () => {
    const user_detail = await getRandomUser();
    console.log(user_detail);
    if (!anonymous) {
      setAnonymous(user_detail);
    }
  }, []);

  return (
    <div className="Buttons">
      <button
        onClick={signInWithGoogle}
        type="button"
        className="login-with-google-btn"
      >
        Sign in with Google
      </button>
      <button
        onClick={signInWithAnonymous}
        type="button"
        className="login-with-google-btn"
      >
        Sign in Anonymously
      </button>
    </div>
  );
}

Signin.propTypes = {
  setToken: PropTypes.func.isRequired,
};
