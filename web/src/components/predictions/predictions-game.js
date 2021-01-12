/** @jsx jsx */
// import React, { useState, useEffect } from 'react';
import { jsx } from "theme-ui";
import firebase from "gatsby-plugin-firebase";
import { useList, useObject, useObjectVal } from "react-firebase-hooks/database";
import IntervalChoice from "./questions/interval-choice";
import MultipleCategoryChoice from "./questions/multiple-category-choice";

const PredictionsGame = ({user}) => {
    const [snapshot, loading, error] = useObject(firebase.database().ref('predictions_users/' + user.uid));
    const [questions, questionsLoading, questionsError] = useList(firebase.database().ref('predictions'));

    if (snapshot && !snapshot.exists()) {
        if (!questionsLoading) {
            const initial = {};
            initial["nickname"] = user.email;
            questions.forEach(question => initial[question.child("id").val()] = "");
            firebase.database().ref('predictions_users/' + user.uid).set(initial);
        }
    }

    const renderQuestions = questions.map(question => {
        const qid = question.child("id").val();
        const date_expired = question.child("date_expired").val();
        const current = snapshot.child(qid).val();

        if (question.child("type").val() === "mc") {
            const choices = question.child("choices").val();
            return (
                <div>
                    {questionsLoading ? "Loading..." : question.child("name").val()}:
                    <MultipleCategoryChoice
                        uid={user.uid}
                        qid={qid}
                        date_expired={date_expired}
                        choices={choices}
                        prediction={current}
                    />
                </div>
            );
        }
        else {
            const range = question.child("choices").val();
            return (
                <div>
                    {questionsLoading ? "Loading..." : question.child("name").val()}:
                    <IntervalChoice
                        uid={user.uid}
                        qid={qid}
                        lower={range[0]}
                        upper={range[1]}
                        date_expired={date_expired}
                        prediction={current}
                    />
                </div>
            )
        }
    });

    const handleChange = (e) => firebase.database().ref('predictions_users/' + user.uid).update({
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
            {questionsError && <strong>Error: {questionsError}</strong>}
            {renderQuestions}
        </div>
    )
};

export default PredictionsGame;