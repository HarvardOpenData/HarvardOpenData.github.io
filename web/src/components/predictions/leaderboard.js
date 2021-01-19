/** @jsx jsx */
import React, {useEffect, useState} from 'react';
import { Card, jsx, Text, Input } from "theme-ui";
import firebase from "gatsby-plugin-firebase";
import { useList, useObject } from "react-firebase-hooks/database";

const Leaderboard = ({user}) => {
    const [uids, uidsLoading, uidsError] = useList(
        firebase.database().ref("predictions/leaderboard")
    );
    let userIndex = 0;
    uids.sort((uid1, uid2) => uid2.val() - uid1.val());

    const topScores = uids.map((uid, index) => {
        if (uid.key === user.uid) {
            userIndex = index;
            return (
                <div>
                    <strong>{index + 1}. You --- {parseFloat(uid.val()).toFixed(2)}</strong>
                </div>
            )
        }
        return (
            <div>
                <p>{index + 1}. {uid.key} --- {parseFloat(uid.val()).toFixed(2)}</p>
            </div>
        )
    });

    return (
        <div>
            {uidsError && <strong>Error: {uidsError}</strong>}
            {uidsLoading ? "Loading..." :
                <div>
                    {topScores.slice(0, 5)}
                    {userIndex >= 5 && topScores[userIndex]}
                </div>
            }
        </div>
    )

};

export default Leaderboard;