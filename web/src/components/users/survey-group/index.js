/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { jsx } from "theme-ui";
import firebase from "gatsby-plugin-firebase";
import { useObject, useObjectVal } from 'react-firebase-hooks/database';

const hashId = (id) => {
  return id
}

function SurveyForm({ email }) {
  export default () => {
    const { auth } = firebase;
    const hashedId = hashId(email)
  
    // returns entire snapshot of predictions_users, will need to change to only grab a single user
    // not sure the best way to check user exists/wait for user to populate after logging in
    const [snapshot, loading, error] = useObject(firebase.database().ref('survey_group/' + hashedId));
  
    // bad method of updating firebase (hopefully Kevin's components can help with updating only occasionally
    const handleChange = (e) => firebase.database().ref('survey_group/' + hashedId).set({
      nickname: e.target.value,
      ethnicity: e.target.value,
    });
  
    return (
      <div>
            <div>
              <p> Ethnicity:
                {/* input ethnicity */}
                <input
                    value={loading ? "Loading..." : snapshot.child("ethnicity").val()}
                    onChange={handleChange}
                />
              </p>
            </div>
      </div>
    )
      };
}

export default SurveyForm;

