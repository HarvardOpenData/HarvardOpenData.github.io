import React from "react";
import ReactDOM from "react-dom";
import Scoreboard from "./Scoreboard";
import firebase from "@firebase/app";
import "@firebase/firestore";
import { FirestoreProvider } from "react-firestore";

const firebaseConfig = {
  projectId: "hodp-scraping"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <FirestoreProvider firebase={firebase}>
    <Scoreboard />
  </FirestoreProvider>,
  document.getElementById("app")
);

module.hot.accept();
