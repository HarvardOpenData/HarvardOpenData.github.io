/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { Button, jsx } from "theme-ui";
import firebase from "gatsby-plugin-firebase";

export default () => {
    const { auth } = firebase;
    const [user, setUser] = useState();

    useEffect(() => auth().onAuthStateChanged(setUser), []);

    const login = () => auth().signInWithPopup(new auth.GoogleAuthProvider());

    const logout = () => auth().signOut();

    return (
        <div>
            {user ?
                <Button onClick={logout}>Sign out from {user.displayName}</Button>
                :
                <Button onClick={login}>Login with Google</Button>
            }
        </div>
    );
}