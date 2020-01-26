import sys
sys.path.append("../")
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import server.auth as auth
import datetime
import yaml

def getYml(filepath):
    with open(filepath, encoding='utf-8') as infile:
        fileMap = yaml.safe_load(infile)
        return fileMap

def easternTime():
    """ Returns a timezone object representing EST """
    return datetime.timezone(-datetime.timedelta(hours=5))

def yml_str_to_datetime(str):
    """ Converts the deadlines in the predictions.yml file to tz-aware datetime objects """
    return datetime.datetime.strptime(str, "%m/%d/%Y %H:%M:%S %z")

def update_predictions(email, form, questions, db):
    current_time = datetime.datetime.now(tz=easternTime())
    # get a list of form fields we're still taking predictions for
    valid_form_names = [item["name"] for item in questions if yml_str_to_datetime(item["deadline"]) > current_time]
    user_info_ref = db.collection("prediction_users").document(email)
    for field in form:
        if field in valid_form_names:
            # update documents under the user's predictions subcollection
            question_ref = user_info_ref.collection("predictions").document(field)
            question_ref.set({
                "guess": int(form[field])
            })

def calculate_points(prediction, outcome):
    """
    Adjusted version of the Brier scoring function, as described at
    https://fivethirtyeight.com/features/how-to-play-our-nfl-predictions-game/
    """
    diff = (prediction / 100) - outcome
    brier_score = diff ** 2
    adjusted_score = -(brier_score - 0.25) * 200
    return round(adjusted_score, 2)

def update_user_score(email, realized_outcomes, db):
    """ Update a single user's score """
    user_info_ref = db.collection("prediction_users").document(email)
    predictions_dict = auth.get_predictions_dict(email, db)
    score = 0
    for question, outcome in realized_outcomes.items():
        if question in predictions_dict:
            prediction = predictions_dict[question]
            score += calculate_points(prediction, outcome)
    user_info_ref.update({
        u"current_score" : score
    })

def update_all_scores(db):
    """ Update all users' scores """
    predictionYml = getYml("./data/predictions.yml")
    realized_outcomes = {question["name"] : question["realized_outcome"] for question in predictionYml if question["realized_outcome"] is not None}
    prediction_users_ref = db.collection("prediction_users")
    user_docs = prediction_users_ref.stream()
    for user_doc in user_docs:
        update_user_score(user_doc.id, realized_outcomes, db)
    print("all scores updated")

def get_user_score(email, db):
    """ Retrieve a user's score """
    user_info = db.collection("prediction_users").document(email).get().to_dict()
    if "current_score" in user_info:
        return user_info["current_score"]
    else:
        return None
