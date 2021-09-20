/** @jsx jsx */
import { jsx, Button } from "theme-ui";
import firebase from "gatsby-plugin-firebase";
import { useList } from "react-firebase-hooks/database";
import { calculateScore, updateScore, updateLeaderboard } from "./utils.js";

// update scores for all users
const UpdateScore = () => {
  const [snapshot, loading, error] = useList(
    firebase.database().ref("predictions_users")
  );
  const [questions, questionsLoading, questionsError] = useList(
    firebase.database().ref("predictions/questions")
  );

  const update = () => {
    const updates = {};
    snapshot.forEach((userSnapshot) => {
      const uid = userSnapshot.key;
      let total = 0;

      questions.forEach((question) => {
        const isMC = question.child("type").val() === "mc";
        const qid = question.key;
        const range = !isMC && question.child("choices").val();
        let answer = question.child("answer").val();
        if (answer !== null) {
          answer = parseInt(answer);
        }
        const score = calculateScore(
          isMC,
          userSnapshot.child(qid).val(),
          answer,
          range
        );
        total += score;
        updateScore(score, qid, uid);
      });
      updates[uid] = total;
    });
    updateLeaderboard(updates);
  };

  return (
    <div>
      {error && null}
      {questionsError && null}
      {loading || questionsLoading ? (
        "Loading..."
      ) : (
        <Button onClick={update}>Update scores</Button>
      )}
    </div>
  );
};

export default UpdateScore;
