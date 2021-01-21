/** @jsx jsx */
import React from 'react';
import { jsx, Text, Box } from "theme-ui";
import firebase from "gatsby-plugin-firebase";
import Spacer from "../../components/core/spacer";
import UpdateScore from "./update-score";

const Leaderboard = ({user}) => {
    const ref = firebase.database().ref("predictions/leaderboard");
    let userIndex = 0;
    let topScores;
    ref.on('value',(snapshot) => {
        const scores = snapshot.val();
        const uids = Object.keys(scores).sort((a, b) => scores[b]["score"] - scores[a]["score"]);

        topScores = uids.map((uid, index) => {
            if (uid === user.uid) {
                userIndex = index;
                return (
                    <tr>
                        <td style={{textAlign: "right"}}>
                            <Text sx={{fontWeight: "bold", pr: 1}}>{index + 1}</Text>
                        </td>
                        <td>
                            <Text sx={{fontWeight: "bold", p: 1}}>You</Text>
                        </td>
                        <td style={{textAlign: "right"}}>
                            <Text sx={{fontWeight: "bold", pl: 1}}>{parseFloat(scores[uid]["score"]).toFixed(2)}</Text>
                        </td>
                    </tr>
                )
            }

            return (
                <tr>
                    <td style={{textAlign: "right"}}>
                        <Text sx={{pr: 1}}>{index + 1}</Text>
                    </td>
                    <td>
                        <Text sx={{p: 1}}>{scores[uid]["nickname"]}</Text>
                    </td>
                    <td style={{textAlign: "right"}}>
                        <Text sx={{pl: 1}}>{parseFloat(scores[uid]["score"]).toFixed(2)}</Text>
                    </td>
                </tr>
            )
        });
    });

    return (
        <div>
            {user &&
            <Box p={4} bg={"muted"}>
                <Text sx={{fontSize: 4, fontWeight: "bold"}}>Leaderboard</Text>
                <Spacer height={2}/>
                <table style={{width: "100%"}} frame="hsides" rules="rows">
                    <colgroup>
                        <col span="1" style={{width: "5%"}}/>
                        <col span="1" style={{width: "85%"}}/>
                        <col span="1" style={{width: "10%"}}/>
                    </colgroup>
                    {topScores && topScores.slice(0, Math.min(5, topScores.length))}
                    {userIndex >= 5 && topScores[userIndex]}
                </table>
            </Box>
            }
            <Spacer height={3}/>
            <UpdateScore user={user}/>
        </div>
    )

    //  const [uids, uidsLoading, uidsError] = useList(
    //      firebase.database().ref("predictions/leaderboard")
    //  );
    //  let userIndex = 0;
    //  uids.sort((uid1, uid2) => uid2.child("score").val() - uid1.child("score").val());
    //
    // const topScores = uids.map((uid, index) => {
    //      if (uid.key === user.uid) {
    //          userIndex = index;
    //          return (
    //              <tr>
    //                  <td style={{ textAlign: "right" }}>
    //                      <Text sx={{ fontWeight: "bold", pr: 1 }}>{index + 1}</Text>
    //                  </td>
    //                  <td>
    //                      <Text sx={{ fontWeight: "bold", p: 1 }}>You</Text>
    //                  </td>
    //                  <td style={{ textAlign: "right" }}>
    //                      <Text sx={{ fontWeight: "bold", pl: 1 }}>{parseFloat(uid.child("score").val()).toFixed(2)}</Text>
    //                  </td>
    //              </tr>
    //          )
    //      }
    //      return (
    //          <tr>
    //              <td style={{ textAlign: "right"}}>
    //                  <Text sx={{ pr: 1 }}>{index + 1}</Text>
    //              </td>
    //              <td>
    //                  <Text sx={{ p: 1 }}>{uid.child("nickname").val()}</Text>
    //              </td>
    //              <td style={{ textAlign: "right" }}>
    //                  <Text sx={{ pl: 1}}>{parseFloat(uid.child("score").val()).toFixed(2)}</Text>
    //              </td>
    //          </tr>
    //      )
    //  });
    //
    //  return (
    //      <div>
    //      {uidsError && <strong>Error: {uidsError}</strong>}
    //      <div>
    //          <Box p={3} bg={"muted"}>
    //              <Text sx={{ fontSize: 4, fontWeight: "bold" }}>Leaderboard</Text>
    //              <Spacer height={2}/>
    //              {uidsLoading ? "Loading..." :
    //                  <table style={{ width: "100%" }} frame="hsides" rules="rows">
    //                      <colgroup>
    //                          <col span="1" style={{width: "5%"}}/>
    //                          <col span="1" style={{width: "85%"}}/>
    //                          <col span="1" style={{width: "10%"}}/>
    //                      </colgroup>
    //                      {topScores && topScores.slice(0, 5)}
    //                      {userIndex >= 5 && topScores[userIndex]}
    //                  </table>
    //              }
    //          </Box>
    //      </div>
    //      </div>
    //  )
};

export default Leaderboard;