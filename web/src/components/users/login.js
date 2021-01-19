/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { Button, jsx } from "theme-ui";
import firebase from "gatsby-plugin-firebase";
import { useList, useObject, useObjectVal } from 'react-firebase-hooks/database';
import PredictionsGame from "../predictions/predictions-game";
import PredictionsPage from "../../pages/predictions";

function Login(props) {
  const { auth } = firebase;
  const [user, setUser] = useState();

  useEffect(() => auth().onAuthStateChanged(setUser), []);

  const login = () => auth().signInWithPopup(new auth.GoogleAuthProvider());

  const logout = () => auth().signOut();

  return (
    <div>
      {user ?
          <div>
            <Button onClick={logout}>Sign out from {user.displayName}</Button>
            <PredictionsGame user={user}/>
          </div>
      :
        <Button onClick={login}>Login with Google</Button>
      }
    </div>
  );
}

export default Login;