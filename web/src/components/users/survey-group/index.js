/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { jsx } from "theme-ui";
import firebase from "gatsby-plugin-firebase";
import { useObject, useObjectVal } from 'react-firebase-hooks/database';

const hashId = (id) => {
  return md5(id)
}

function SurveyForm({ email }) {
  export default () => {
    const { auth } = firebase;
    const hashedId = hashId(email)
  
    // returns entire snapshot of predictions_users, will need to change to only grab a single user
    // not sure the best way to check user exists/wait for user to populate after logging in
    const [snapshot, loading, error] = useObject(firebase.database().ref('survey_group/' + hashedId));

    // returns an update function
    const handleChange = field => {
      return (e =>
        // updates the field under hashedId
        firebase.database().ref('survey_group/' + hashedId).update({
          [field]: e.target.value
        })
      )
    }
  
    return (
      <div>
            <div>
              <p> Ethnicity:
                <input
                    value={loading ? "Loading..." : snapshot.child("ethnicity").val()}
                    onChange={handleChange("ethnicity")}
                />
              </p>
              <p> Race:
                <input
                    value={loading ? "Loading..." : snapshot.child("race").val()}
                    onChange={handleChange("race")}
                />
              </p>
              <p> Gender:
                <input
                    value={loading ? "Loading..." : snapshot.child("gender").val()}
                    onChange={handleChange("gender")}
                />
              </p>
              <p> Concentration:
                <input
                    value={loading ? "Loading..." : snapshot.child("concentration").val()}
                    onChange={handleChange("concentration")}
                />
              </p>
              <p> House:
                <input
                    value={loading ? "Loading..." : snapshot.child("house").val()}
                    onChange={handleChange("house")}
                />
              </p>
            </div>
      </div>
    )
      };
}

export default SurveyForm;

