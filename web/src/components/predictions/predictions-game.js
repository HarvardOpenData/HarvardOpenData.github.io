/** @jsx jsx */
import { useEffect, useState } from "react";
import {
  Card,
  jsx,
  Text,
  Input,
  Label,
  Grid,
  Button,
  Box,
  Alert,
} from "theme-ui";
import firebase from "gatsby-plugin-firebase";
import { useList, useObject } from "react-firebase-hooks/database";
import Spacer from "../../components/core/spacer";
import IntervalChoice from "./questions/interval-choice";
import MultipleCategoryChoice from "./questions/multiple-category-choice";
import Leaderboard from "./leaderboard";
import Login from "../users/login";
import theme from "../../styles/theme";

const PredictionsGame = ({ user }) => {
  const [snapshot, loading, error] = useObject(
    firebase.database().ref("predictions_users/" + user.uid)
  );
  const [questions, questionsLoading, questionsError] = useList(
    firebase.database().ref("predictions/questions")
  );
  const [name, nameLoading, nameError] = useObject(
    firebase.database().ref("public/" + user.uid)
  );

  // state hook for display name change
  const [displayName, setDisplayName] = useState(user.displayName);
  const [borderColor, setBorderColor] = useState();
  const [borderWidth, setBorderWidth] = useState(1);
  const [saveFlag, setSaveFlag] = useState(false);

  useEffect(() => {
    setDisplayName(nameLoading ? displayName : name.child("displayName").val());
  }, [nameLoading, name, displayName]);

  // add user to firebase if doesn't exist
  if (name && !name.exists()) {
    const info = { name: user.displayName, email: user.email };
    const publicInfo = { displayName: user.displayName };

    firebase
      .database()
      .ref("users/" + user.uid)
      .update(info);
    firebase
      .database()
      .ref("public/" + user.uid)
      .update(publicInfo);
  }

  // render appropriate component for each question
  function renderQuestion(question, date_expired, answer, disabled) {
    const qid = question.key;
    const prediction = snapshot.child(qid).val();
    const choices = question.child("choices").val();

    if (question.child("type").val() === "mc") {
      return (
        <Card
          key={qid}
          sx={{
            mt: 4,
            borderRadius: 5,
            backgroundColor: "light",
            padding: "4%",
            boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
          }}
        >
          <MultipleCategoryChoice
            name={
              questionsLoading ? "Loading..." : question.child("name").val()
            }
            uid={user.uid}
            qid={qid}
            answer={answer}
            date_expired={date_expired}
            choices={choices}
            prediction={prediction}
            explanation={question.child("explanation").val()}
            disabled={disabled}
          />
        </Card>
      );
    } else {
      return (
        <Card
          key={qid}
          sx={{
            mt: 4,
            borderRadius: 5,
            backgroundColor: "light",
            padding: "4%",
            boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
          }}
        >
          <IntervalChoice
            name={
              questionsLoading ? "Loading..." : question.child("name").val()
            }
            uid={user.uid}
            qid={qid}
            answer={answer}
            lower={choices[0]}
            upper={choices[1]}
            date_expired={date_expired}
            prediction={prediction}
            explanation={question.child("explanation").val()}
            disabled={disabled}
          />
        </Card>
      );
    }
  }

  // sort questions by live, pending, and scored
  let liveQuestions = [];
  let pendingQuestions = [];
  let scoredQuestions = [];

  questions.sort(
    (a, b) =>
      new Date(a.child("date_expired").val()).getTime() -
      new Date(b.child("date_expired").val()).getTime()
  );

  questions.forEach((question) => {
    const date_expired = question.child("date_expired").val();
    let answer = question.child("answer").val();
    if (answer !== null) {
      answer = parseInt(answer);
    }

    if (new Date(date_expired).getTime() > new Date().getTime()) {
      liveQuestions.push(renderQuestion(question, date_expired, answer, false));
    } else if (
      new Date(date_expired).getTime() < new Date().getTime() &&
      answer == null
    ) {
      pendingQuestions.push(
        renderQuestion(question, date_expired, answer, true)
      );
    } else if (
      new Date(date_expired).getTime() < new Date().getTime() &&
      answer !== null
    ) {
      scoredQuestions.push(
        renderQuestion(question, date_expired, answer, true)
      );
    }
  });

  // validate display name on change
  const validateName = () => {
    if (displayName !== "") {
      firebase
        .database()
        .ref("public/" + user.uid)
        .update({
          displayName: displayName,
        });
      setBorderColor("green");
    } else {
      setBorderColor("red");
    }
    setBorderWidth(1.6);
    setTimeout(() => {
      setBorderColor("");
      setBorderWidth(1);
    }, 3000);
  };

  return (
    <Grid gap={5} columns={[1, 1, "3fr 1fr"]}>
      <div>
        <Text sx={{ fontSize: 1, pb: 3 }}>
          Can you forsee the future? Weigh in on our Predictions game and
          compete for glory on the scoreboard!
        </Text>
        <Login />
        <Spacer height={1} />
        {error && <strong>Error: {error}</strong>}
        {questionsError && <strong>Error: {questionsError}</strong>}
        {user && (
          <div>
            <Box sx={{ pt: 3, pb: 3 }}>
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                name="displayName"
                sx={{
                  borderColor: borderColor,
                  borderWidth: borderWidth,
                  width: "30%",
                  display: "inline",
                }}
                value={nameError ? user.displayName : displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.target.blur();
                    validateName();
                  }
                }}
                disabled
              />
              <Button
                sx={{ display: "inline", marginLeft: 1 }}
                onClick={validateName}
                disabled
              >
                Change
              </Button>
              {/*<Box sx={{ display: "inline"}}>*/}
              {/*<Label >*/}
              {/*  <Checkbox />*/}
              {/*  Anonymize me!*/}
              {/*</Label>*/}
              {/*</Box>*/}
            </Box>
            <Spacer height={2} />
            {loading ? (
              "Loading..."
            ) : (
              <div>
                <Text sx={{ fontSize: 3, fontWeight: "bold" }}>
                  Live predictions
                </Text>
                <Text sx={{ fontSize: 1 }}>
                  How likely are each of these events?
                </Text>
                {questionsLoading ? (
                  <div>
                    <Spacer height={2} />
                    Loading...
                  </div>
                ) : (
                  liveQuestions
                )}
                <Spacer height={3} />
                <Button
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    bg: "black",
                    display: "inline",
                  }}
                  onClick={() => {
                    setSaveFlag(true);
                    setTimeout(() => setSaveFlag(false), 2000);
                  }}
                >
                  Save Answers
                </Button>
                {saveFlag && (
                  <Alert sx={{ bg: theme.colors.green, display: "inline" }}>
                    Saved!
                  </Alert>
                )}
                <Spacer height={5} />
                <Text sx={{ fontSize: 3, fontWeight: "bold" }}>
                  Pending predictions
                </Text>
                <Text sx={{ fontSize: 1 }}>
                  The deadline to edit your responses has passed. Check back
                  soon to see the results!
                </Text>
                {questionsLoading ? (
                  <div>
                    <Spacer height={2} />
                    Loading...
                  </div>
                ) : (
                  pendingQuestions
                )}
                <Spacer height={5} />
                <Text sx={{ fontSize: 3, fontWeight: "bold" }}>
                  Scored predictions
                </Text>
                <Text sx={{ fontSize: 1 }}>
                  How accurate were your predictions?
                </Text>
                {questionsLoading ? (
                  <div>
                    <Spacer height={2} />
                    Loading...
                  </div>
                ) : (
                  scoredQuestions
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <Leaderboard user={user} />
      </div>
    </Grid>
  );
};

export default PredictionsGame;
