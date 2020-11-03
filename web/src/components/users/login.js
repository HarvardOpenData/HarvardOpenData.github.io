/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { jsx } from "theme-ui";
import firebase from "gatsby-plugin-firebase"

export default () => {
  const { auth } = firebase;
  const [user, setUser] = useState();
  useEffect(() => auth().onAuthStateChanged(setUser), []);

  const login = () => auth().signInWithPopup(new auth.GoogleAuthProvider());
  const logout = () => auth().signOut();

  console.log(user);

  return (
    <div>
      {user
        ? <button onClick={logout}>Logout</button>
        : <button onClick={login}>Login with Google</button>
      }
    </div>
  )
};