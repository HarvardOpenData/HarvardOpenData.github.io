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
            questions.forEach(question => initial[question.key] = "");
            firebase.database().ref('predictions_users/' + user.uid).set(initial);
        }
    }

    // TODO create scoring functions
    function calculateScore(isMC, choices, answer) {
        if (isMC) {
            return answer;
        }
        else {
            return answer;
        }
    }

    function renderQuestion(question, date_expired, answer, disabled) {
        const qid = question.key;
        const prediction = snapshot.child(qid).val();

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
                        prediction={prediction}
                        disabled={disabled}
                    />
                    <p>
                        You received <strong>{answer ? calculateScore(true, choices, answer) : "--"}</strong> points for this question.
                    </p>
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
                        prediction={prediction}
                        disabled={disabled}
                    />
                    <p>
                        You received <strong>{answer ? calculateScore(false, range, answer) : "--"}</strong> points for this question.
                    </p>
                </div>
            )
        }
    }

    const liveQuestions = [];
    const pendingQuestions = [];
    const scoredQuestions = [];

    questions.forEach(question => {
        const date_expired = question.child("date_expired").val();
        const answer = question.child("answer").val();

        if (new Date(date_expired).getTime() > new Date().getTime()) {
            liveQuestions.push(renderQuestion(question, date_expired, answer,false));
        }
        else if (new Date(date_expired).getTime() < new Date().getTime() && !answer) {
            pendingQuestions.push(renderQuestion(question, date_expired, answer,true));
        }
        else if (new Date(date_expired).getTime() < new Date().getTime() && answer) {
            scoredQuestions.push(renderQuestion(question, date_expired, answer,true));
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
            <strong>Live Questions</strong>
            {liveQuestions}
            <strong>Pending Questions</strong>
            {pendingQuestions}
            <strong>Scored Questions</strong>
            {scoredQuestions}
        </div>
    )
};

export default PredictionsGame;