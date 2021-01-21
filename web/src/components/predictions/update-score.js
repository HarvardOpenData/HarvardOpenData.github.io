/** @jsx jsx */
import React from 'react';
import { jsx } from "theme-ui";
import firebase from "gatsby-plugin-firebase";
import { useList } from "react-firebase-hooks/database";

const UpdateScore = ({user}) => {
    const [snapshot, loading, error] = useList(
        firebase.database().ref("predictions_users")
    );
    const [questions, questionsLoading, questionsError] = useList(
        firebase.database().ref("predictions/questions")
    );

    function calculateScore(isMC, prediction, answer, qid, uid, range, snapshot) {
        let score = 0;
        const scale = 60;
        let total = 0;
        let updates = {};
        let leaderboardUpdates = {};

        if (answer && prediction) {
            if (isMC) {
                if (prediction.length === 1) {
                    // binary scoring
                    if (answer) {
                        score = (1 - prediction[0] / 100) ** 2 * 2;
                    } else {
                        score = (prediction[0] / 100) ** 2 * 2;
                    }
                    score = -score * scale + scale / 2;
                } else {
                    // multi-category scoring
                    for (let i = 0; i < prediction.length; i++) {
                        if (i === answer) {
                            score += (1 - prediction[i] / 100) ** 2;
                        } else {
                            score += (prediction[i] / 100) ** 2;
                        }
                    }
                    score =
                        -score * scale +
                        (scale * (prediction.length - 1)) / prediction.length;
                }
            } else {
                // range-based scoring
                if (answer >= prediction[0] && answer <= prediction[1]) {
                    score =
                        (scale / 2) *
                        (1 - (prediction[1] - prediction[0]) / (range[1] - range[0]));
                }
            }
            updates[qid] = score;
            firebase
                .database()
                .ref("predictions_users/" + uid + "/score")
                .update(updates)
                .then(() => {
                    total = Object.values(snapshot.child("score").val()).reduce((a, b) => a + b, 0);
                    leaderboardUpdates["score"] = total;
                    firebase
                        .database()
                        .ref("predictions/leaderboard/" + uid)
                        .update(leaderboardUpdates);
                });
        }
    }

    if (!loading && !questionsLoading && user.uid === "Aipy5556cHMtUgBsFVlWk4SCQSb2") {
        snapshot.forEach((userSnapshot) => {
            questions.forEach((question) => {
                const isMC = question.child("type").val() === "mc";
                const uid = userSnapshot.key;
                const qid = question.key;
                const range = !isMC && question.child("choices").val();
                calculateScore(isMC, userSnapshot.child(qid).val(), question.child("answer").val(), qid, uid, range, userSnapshot);
            });
        });
    }

    return null;

};

export default UpdateScore;