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
            initial["score"] = {};
            questions.forEach(question => initial["score"][question.key] = 0);
            firebase.database().ref('predictions_users/' + user.uid).set(initial);
        }
    }

    // answer is the index of the choice for MC questions, or the correct number for range questions
    function calculateScore(isMC, prediction, answer, qid, range) {
        let score = 0;
        const scale = 60;
        let updates = {};

        if (answer && prediction) {
            if (isMC) {
                for (let i = 0; i < prediction.length; i++) {
                    if (i === answer) {
                        score += (1 - prediction[i] / 100) ** 2;
                    } else {
                        score += (prediction[i] / 100) ** 2;
                    }
                }
                score = (-score * scale) + (scale * (prediction.length - 1) / prediction.length);
            }
            else {
                if (answer >= prediction[0] && answer <= prediction[1]) {
                    score = (scale / 2) * (1 - (prediction[1] - prediction[0]) / (range[1] - range[0]))
                }
            }
            updates[qid] = score;
            firebase.database().ref('predictions_users/' + user.uid + '/score').update(updates);
        }
        return score;
    }

    function renderQuestion(question, date_expired, answer, disabled) {
        const qid = question.key;
        const prediction = snapshot.child(qid).val();

        if (question.child("type").val() === "mc") {
            const choices = question.child("choices").val();
            const score = calculateScore(true, prediction, answer, qid);
            return (
                <div>
                    {questionsLoading ? "Loading..." : question.child("name").val()}:
                    <MultipleCategoryChoice
                        uid={user.uid}
                        qid={qid}
                        date_expired={date_expired}
                        choices={choices}
                        prediction={prediction}
                        // disabled={disabled}
                    />
                    {answer &&
                        <p>
                            You received <strong>{score ? score.toFixed(2) : score}</strong> points for this prediction.
                        </p>
                    }
                </div>
            );
        }
        else {
            const range = question.child("choices").val();
            const score = calculateScore(false, prediction, answer, qid, range);
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
                        // disabled={disabled}
                    />
                    {answer &&
                        <p>
                            You received <strong>{score ? score.toFixed(2) : score}</strong> points for this prediction.
                        </p>
                    }
                </div>
            )
        }
    }

    const liveQuestions = [];
    const pendingQuestions = [];
    const scoredQuestions = [];

    questions.forEach(question => {
        const date_expired = question.child("date_expired").val();
        let answer = question.child("answer").val();
        if (answer) {
            answer = parseInt(answer);
        }

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
                    <p> Display name:
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