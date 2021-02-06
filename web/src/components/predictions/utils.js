/** @jsx jsx */
import { jsx, Text } from "theme-ui";
import firebase from "gatsby-plugin-firebase";

const calculateScore = (isMC, prediction, answer, range) => {
    const scale = 60;
    let score = 0;

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
                score = prediction.reduce(
                    (acc, cur, index) => index === answer ? acc + (1 - cur / 100) ** 2 : acc + (cur / 100) ** 2,
                    0
                );
                score =
                    -score * scale +
                    (scale * (prediction.length - 1)) / prediction.length;
            }
        } else {
            // range-based scoring
            const proportion = (prediction[1] - prediction[0]) / (range[1] - range[0]);
            if (answer >= prediction[0] && answer <= prediction[1]) {
                score = (proportion / 2) ** 2 * 2;
            } else {
                score = (1 - proportion / 2) ** 2 * 2;
            }
            score = -score * scale + scale / 2;
        }
    }

    return score;
};

const updateScore = (score, qid, uid) => {
    let total = 0;
    const updates = {};
    const leaderboardUpdates = {};

    updates[qid] = score;
    firebase
        .database()
        .ref("predictions/" + uid + "/score")
        .update(updates)
        .then((result) => {
            total = Object.values(result.child("score").val()).reduce(
                (acc, cur) => acc + cur,
                0
            );
            leaderboardUpdates["total"] = total;
            firebase
                .database()
                .ref("predictions/leaderboard/" + uid)
                .update(leaderboardUpdates);
        });
};

const displayScore = (score, explanation) => {
    return (
        <div>
            <Text> {explanation} </Text>
            <Text>
                You received <strong>{score}</strong> points
                for this prediction.
            </Text>
        </div>
    );
};

// Displays possible point wins/losses on each question
// Multiplying by 1 removes trailing decimals for integers
const displayMessage = (isMC, prediction, range) => {
    if (!prediction) {
        return (
            <div>
                <Text sx={{ fontSize: 15 }}>
                    Potential gain: <strong>0</strong> points
                </Text>
                <Text sx={{ fontSize: 15 }}>
                    Potential loss: <strong>0</strong> points
                </Text>
            </div>
        );
    }
    if (isMC) {
        const indices = prediction.length === 1 ? [0, 1] : [...Array(prediction.length).keys()];
        const possibleScores = indices.map(index => calculateScore(isMC, prediction, index));
        return (
            <div>
                <Text sx={{ fontSize: 15 }}>
                    Potential gain: {prediction.length !== 1 && "Up to"} <strong>
                    {1 * Math.max(...possibleScores).toFixed(2)}
                    </strong> points
                </Text>
                <Text sx={{ fontSize: 15 }}>
                    Potential loss: {prediction.length !== 1 && "Up to"} <strong>
                    {-1 * Math.min(...possibleScores).toFixed(2)}
                </strong> points
                </Text>
            </div>
        );
    } else {
        return (
            <div>
                <Text sx={{ fontSize: 15 }}>
                    Potential gain: <strong>
                    {1 * calculateScore(isMC, prediction, prediction[0], range).toFixed(2)}
                </strong> points
                </Text>
                <Text sx={{ fontSize: 15 }}>
                    Potential loss: <strong>
                    {-1 * calculateScore(isMC, prediction, prediction[0] - 1, range).toFixed(2)}
                </strong> points
                </Text>
            </div>
        );
    }
}

export { calculateScore, updateScore, displayScore, displayMessage };
