/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { jsx } from "theme-ui";
import firebase from "gatsby-plugin-firebase";
import { useList, useObject, useObjectVal } from 'react-firebase-hooks/database';
import PredictionsGame from "./predictions-game";

export default () => {
  const { auth } = firebase;
  const [user, setUser] = useState();

  useEffect(() => auth().onAuthStateChanged(setUser), []);

  const login = () => auth().signInWithPopup(new auth.GoogleAuthProvider());

  const logout = () => auth().signOut();

  return (
    <div>
      {user ?
          <div>
            <button onClick={logout}>Logout from {user.displayName}</button>
            <PredictionsGame user={user}/>
          </div>
        : <button onClick={login}>Login with Google</button>
      }
    </div>
  )
};