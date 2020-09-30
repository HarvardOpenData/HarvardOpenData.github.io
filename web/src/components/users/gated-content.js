/** @jsx jsx */
import { jsx } from "theme-ui";
import firebase from "gatsby-plugin-firebase"
import { useAuthState } from 'react-firebase-hooks/auth';

const GatedContent = ({ renderPublic, renderPrivate }) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  return (user ? renderPrivate(user) : renderPublic());
};

export default GatedContent