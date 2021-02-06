/** @jsx jsx */
import React from "react";
import { jsx, Text, Box } from "theme-ui";
import { useObject } from "react-firebase-hooks/database";
import firebase from "gatsby-plugin-firebase";
import Spacer from "../../components/core/spacer";
import UpdateScore from "./update-score";

// generate leaderboard
const Leaderboard = ({ user }) => {
  const [names, namesLoading, namesError] = useObject(
    firebase.database().ref("public")
  );
  const ref = firebase.database().ref("predictions/scores/leaderboard");
  let userIndex = 0;
  let topScores;

  ref.on("value", (snapshot) => {
    const scores = snapshot.val();
    const uids = Object.keys(scores || []).sort(
      (uid1, uid2) => scores[uid2] - scores[uid1]
    );

    // Object to associate scores with place on leaderboard (in case of ties)
    const getIndex = {};

    topScores = uids
      .map((uid, index) => {
        const score = 1 * scores[uid].toFixed(2);
        if (!(score in getIndex)) {
          getIndex[score] = index + 1;
        }
        if (uid === user.uid) {
          userIndex = index;
          return (
            <tr>
              <td style={{ textAlign: "right" }}>
                <Text sx={{ fontWeight: "bold", pr: 1, fontSize: 1 }}>
                  {getIndex[score]}
                </Text>
              </td>
              <td>
                <Text sx={{ fontWeight: "bold", p: 1, fontSize: 1 }}>You</Text>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text sx={{ fontWeight: "bold", pl: 1, fontSize: 1 }}>
                  {score}
                </Text>
              </td>
            </tr>
          );
        } else if (index < 5) {
          return (
            <tr>
              <td style={{ textAlign: "right" }}>
                <Text sx={{ pr: 1, fontSize: 1 }}>{getIndex[score]}</Text>
              </td>
              <td>
                <Text sx={{ p: 1, fontSize: 1 }}>
                  {!namesError &&
                    !namesLoading &&
                    names.child(uid).val()["displayName"]}
                </Text>
              </td>
              <td style={{ textAlign: "right" }}>
                <Text sx={{ pl: 1, fontSize: 1 }}>{score}</Text>
              </td>
            </tr>
          );
        } else return null;
      })
      .filter((obj) => obj);
  });

  return (
    <div>
      {user && (
        <Box p={4} bg={"muted"}>
          <Text sx={{ fontSize: 4, fontWeight: "bold" }}>Leaderboard</Text>
          <Spacer height={2} />
          {namesLoading ? (
            "Loading..."
          ) : (
            <div>
              {topScores && topScores.length ? (
                <table style={{ width: "100%" }} frame="hsides" rules="rows">
                  <colgroup>
                    <col span="1" style={{ width: "5%" }} />
                    <col span="1" style={{ width: "85%" }} />
                    <col span="1" style={{ width: "10%" }} />
                  </colgroup>
                  {topScores}
                </table>
              ) : (
                <p>
                  You'll see your score here when the first results come out!
                </p>
              )}
            </div>
          )}
        </Box>
      )}
      <Spacer height={3} />
      {/*if user.uid matches below, then a button is rendered that allows for updating all scores*/}
      {user.uid === process.env.ADMIN_USER && <UpdateScore />}
    </div>
  );
};

export default Leaderboard;
