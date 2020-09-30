/** @jsx jsx */
import { jsx } from "theme-ui";
import firebase from "gatsby-plugin-firebase"
import { useAuthState } from 'react-firebase-hooks/auth';

const provider = new firebase.auth.GoogleAuthProvider();

const login = () => {
  firebase.auth().signInWithPopup(provider);
};
const logout = () => {
  firebase.auth().signOut();
};

const Login = () => {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <p>Current User: {user.email}</p>
        <button onClick={logout}>Log out</button>
      </div>
    );
  }
  return <button onClick={login}>Log in</button>;
};

export default Login