/** @jsx jsx */
import React from "react";
import { jsx, Button } from "theme-ui";
import firebase from "gatsby-plugin-firebase";
import { useList } from "react-firebase-hooks/database";

// update scores for all users
const UpdateScore = () => {
  const [snapshot, loading, error] = useList(
    firebase.database().ref("predictions_users")
  );
  const [questions, questionsLoading, questionsError] = useList(
    firebase.database().ref("predictions/questions")
  );

  function calculateScore(isMC, prediction, answer, qid, uid, range, snapshot) {
    const scale = 60;
    const updates = {};
    const leaderboardUpdates = {};

    let score = 0;
    let total = 0;

    if (answer !== null && prediction !== null) {
      if (isMC) {
        if (prediction.length === 1) {
          // binary scoring
          if (answer === 1) {
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
            scale *
            (1 - (prediction[1] - prediction[0]) / (range[1] - range[0]));
        } else {
          score =
            -scale *
            (1 - (prediction[1] - prediction[0]) / (range[1] - range[0]));
        }
      }
      updates[qid] = score;
      firebase
        .database()
        .ref("predictions/" + uid + "/score")
        .update(updates)
        .then((result) => {
          total = Object.values(result.child("score").val()).reduce(
            (a, b) => a + b,
            0
          );
          leaderboardUpdates["total"] = total;
          firebase
            .database()
            .ref("predictions/leaderboard/" + uid)
            .update(leaderboardUpdates);
        });
    }
  }

  // TODO round scores when updating
  function update() {
    snapshot.forEach((userSnapshot) => {
      questions.forEach((question) => {
        const isMC = question.child("type").val() === "mc";
        const uid = userSnapshot.key;
        const qid = question.key;
        const range = !isMC && question.child("choices").val();
        let answer = question.child("answer").val();
        if (answer !== null) {
          answer = parseInt(answer);
        }
        calculateScore(
          isMC,
          userSnapshot.child(qid).val(),
          answer,
          qid,
          uid,
          range,
          userSnapshot
        );
      });
    });
  }

  return (
    <div>
      {error && null}
      {questionsError && null}
      {loading || questionsLoading ? (
        "Loading..."
      ) : (
        <Button onClick={update}>Update scores (click twice)</Button>
      )}
    </div>
  );
};

export default UpdateScore;
