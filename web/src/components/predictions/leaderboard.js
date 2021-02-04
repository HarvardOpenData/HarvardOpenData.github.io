/** @jsx jsx */
import React from "react";
import { jsx, Text, Box } from "theme-ui";
import firebase from "gatsby-plugin-firebase";
import Spacer from "../../components/core/spacer";
import UpdateScore from "./update-score";

// generate leaderboard
const Leaderboard = ({ user }) => {
  const ref = firebase.database().ref("predictions/scores/total");
  let userIndex = 0;
  let topScores;
  ref.on("value", (snapshot) => {
          const scores = snapshot.val();
          const uids = Object.keys(scores || []).sort(
              (a, b) => scores[b]["score"] - scores[a]["score"]
          );
          const getIndex = {};

          topScores = uids.map((uid, index) => {
              const score = parseFloat(scores[uid]["score"]).toFixed(2);
              if (!(score in getIndex)) {
                  getIndex[score] = index + 1;
              }
              if (uid === user.uid) {
                  userIndex = index;
                  return (
                      <tr>
                          <td style={{textAlign: "right"}}>
                              <Text sx={{fontWeight: "bold", pr: 1}}>{getIndex[score]}</Text>
                          </td>
                          <td>
                              <Text sx={{fontWeight: "bold", p: 1}}>You</Text>
                          </td>
                          <td style={{textAlign: "right"}}>
                              <Text sx={{fontWeight: "bold", pl: 1}}>{score}</Text>
                          </td>
                      </tr>
                  );
              }

              return (
                  <tr>
                      <td style={{textAlign: "right"}}>
                          <Text sx={{pr: 1}}>{getIndex[score]}</Text>
                      </td>
                      <td>
                          <Text sx={{p: 1}}>{scores[uid]["nickname"]}</Text>
                      </td>
                      <td style={{textAlign: "right"}}>
                          <Text sx={{pl: 1}}>{score}</Text>
                      </td>
                  </tr>
              );
          });
  });

  return (
    <div>
      {user && (
        <Box p={4} bg={"muted"}>
          <Text sx={{ fontSize: 4, fontWeight: "bold" }}>Leaderboard</Text>
          <Spacer height={2} />
          <table style={{ width: "100%" }} frame="hsides" rules="rows">
            <colgroup>
              <col span="1" style={{ width: "5%" }} />
              <col span="1" style={{ width: "85%" }} />
              <col span="1" style={{ width: "10%" }} />
            </colgroup>
            {topScores && topScores.slice(0, Math.min(5, topScores.length))}
            {topScores && userIndex >= 5 && topScores[userIndex]}
          </table>
        </Box>
      )}
      <Spacer height={3} />
      {/*if user.uid matches below, then a button is rendered that allows for updating all scores*/}
      {user.uid === process.env.ADMIN_USER && <UpdateScore />}
    </div>
  );
};

export default Leaderboard;
