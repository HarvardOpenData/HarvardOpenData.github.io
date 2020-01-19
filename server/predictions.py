import sys
sys.path.append("../")
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import server.auth as auth
import datetime

# Fill in as outcomes come in?
realized_outcomes = {
    1: None,
    2: None,
}

def update_predictions(email, db):
    pass

def update_outcome(question_id, outcome):
    realized_outcomes[question_id] = outcome

def calculate_score(prediction, outcome):
    """
    Adjusted version of the Brier scoring function, as described at
    https://fivethirtyeight.com/features/how-to-play-our-nfl-predictions-game/
    """
    brier_score = (prediction - outcome) ** 2
    adjusted_score = -(brier_score - 0.25) * 200  # or 100, depending on whether you're using the 2018 or 2019 version
    return adjusted_score
