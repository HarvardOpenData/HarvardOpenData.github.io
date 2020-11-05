/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { jsx } from "theme-ui";
import firebase from "gatsby-plugin-firebase";
import { useObject, useObjectVal } from 'react-firebase-hooks/database';

export default () => {
  const { auth } = firebase;
  const [user, setUser] = useState();

  // returns entire snapshot of predictions_users, will need to change to only grab a single user
  // not sure the best way to check user exists/wait for user to populate after logging in
  const [snapshot, loading, error] = useObject(firebase.database().ref('predictions_users'));
  useEffect(() => auth().onAuthStateChanged(setUser), []);

  const login = () => auth().signInWithPopup(new auth.GoogleAuthProvider()).then(function(result) {
    // add to firebase if new user
    const uid = result.user.uid;
    if (!snapshot.child(uid).exists()) {
      firebase.database().ref('predictions_users/' + uid).set({
        nickname: result.user.email
      })
    }
  });

  const logout = () => auth().signOut();

  // bad method of updating firebase (hopefully Kevin's components can help with updating only occasionally
  const handleChange = (e) => firebase.database().ref('predictions_users/' + user.uid).set({
    nickname: e.target.value
  });

  // console.log(loading);
  console.log(user);

  return (
    <div>
      {user ?
          <div>
            <p> Email: {user.email} </p>
            <p> Nickname:
              <input
                  value={loading ? "Loading..." : snapshot.child(user.uid + "/nickname").val()}
                  onChange={handleChange}
              />
            </p>
            <button onClick={logout}>Logout</button>
          </div>
        : <button onClick={login}>Login with Google</button>
      }
    </div>
  )
};