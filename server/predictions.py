import sys
sys.path.append("../")
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import server.auth as auth
import datetime

# Fill in as outcomes come in?
realized_outcomes = {
    "harvard-yale": None,
    "divestment": None,
}

def update_predictions(email, form, db):
    user_info_ref = db.collection("prediction_users").document(email)
    for field in form:
        # update documents under the user's predictions subcollection
        question_ref = user_info_ref.collection("predictions").document(field)
        question_ref.update({
            "guess": form[field]
        })

def calculate_points(prediction, outcome):
    """
    Adjusted version of the Brier scoring function, as described at
    https://fivethirtyeight.com/features/how-to-play-our-nfl-predictions-game/
    """
    diff = (prediction - outcome) / 100
    brier_score = diff ** 2
    adjusted_score = -(brier_score - 0.25) * 200  # or 100, depending on whether you're using the 2018 or 2019 version
    return round(adjusted_score, 2)

def update_user_score(email, db):
    user_info_ref = db.collection("prediction_users").document(email)
    predictions_dict = auth.get_predictions_dict(email, db)
    score = 0
    for question, outcome in realized_outcomes:
        if outcome is not None and question in predictions_dict:
            prediction = predictions_dict[question]
            score += calculate_points(prediction, outcome)
    user_info_ref.update({
        u"current_score" : score,
    })
