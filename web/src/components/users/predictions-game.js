/** @jsx jsx */
// import React, { useState, useEffect } from 'react';
import { jsx } from "theme-ui";
import firebase from "gatsby-plugin-firebase";
import { useList, useObject, useObjectVal } from 'react-firebase-hooks/database';

const PredictionsGame = ({user}) => {
    const [snapshot, loading, error] = useObject(firebase.database().ref('predictions_users/' + user.uid));
    const [questions, q_loading, q_error] = useList(firebase.database().ref('predictions'));

    if (snapshot && !snapshot.exists()) {
        firebase.database().ref('predictions_users/' + user.uid).set({
            nickname: user.email,
            question1: "",
            question2: "",
            // replace with map when more questions are added
        })
    }

    function updateQuestions(qid, e) {
        var updates = {};
        updates[qid] = e.target.value;
        firebase.database().ref('predictions_users/' + user.uid).update(updates);
    }

    const q = questions.map(question => {
        const qid = question.child("id").val();
        return (
            <p>
                {q_loading ? "Loading..." : question.child("name").val()}:
                <input
                    value={loading ? "Loading..." : snapshot.child(qid).val()}
                    onChange={(e) => updateQuestions(qid, e)}
                />
            </p>
        );
    });
    console.log(q);

    // bad method of updating firebase (hopefully Kevin's components can help with updating only occasionally)
    const handleChange = (e) => firebase.database().ref('predictions_users/' + user.uid).set({
        nickname: e.target.value
    });

    return (
        <div>
            {error && <strong>Error: {error}</strong>}
            {user &&
                <div>
                    <p> Email: {user.email} </p>
                    <p> Nickname:
                        <input
                            value={loading ? "Loading..." : snapshot.child("nickname").val()}
                            onChange={handleChange}
                        />
                    </p>
                </div>
            }
            <div>
                {q_error && <strong>Error: {q_error}</strong>}
                {q}
            </div>
        </div>
    )
};

export default PredictionsGame;