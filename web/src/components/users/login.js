/** @jsx jsx */
import { useState, useEffect } from "react";
import { Button, jsx } from "theme-ui";
import firebase from "gatsby-plugin-firebase";

const LoginPage = () => {
  const { auth } = firebase;
  const [user, setUser] = useState();

  useEffect(() => auth().onAuthStateChanged(setUser), [auth, user]);

  const login = () =>
    auth()
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((result) => {
        if (result && !result.user.email.endsWith("harvard.edu")) {
          alert("Please sign in with your Harvard email!");
        }
      });

  const logout = () => auth().signOut();

  return (
    <div>
      {user && user.email.endsWith("harvard.edu") ? (
        <Button onClick={logout}>Sign out from {user.displayName}</Button>
      ) : (
        <Button onClick={login}>Login with Google</Button>
      )}
    </div>
  );
};

export default LoginPage;
