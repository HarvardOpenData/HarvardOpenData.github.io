import sys
sys.path.append("../")
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import server.auth as auth
import datetime

# update demographic info based on form responses
def update_demographics(email, form, demo_questions, db):
    userResponsesRef = db.collection("responses").document(auth.email_hash(email))
    userEmailsRef = db.collection("emails").document(email)
    new_demographics = {} 
    for field in form:
        # makes sure the form names haven't been modified
        if field in demo_questions["valid_form_names"]:
            # get as a list if we enable selecting multiple things
            if field in demo_questions["multiselects"]:
                new_demographics[field] = form.getlist(field)
            # makes sure we only get house field if not a freshman
            elif field != "house" or form.get("year", -1) != demo_questions["years"][-2]:
                new_demographics[field] = form[field]
    userResponsesRef.update({
        "demographics" : new_demographics
    })
    userEmailsRef.update({
        "has_demographics" : True,
        "last_demographic_update" : datetime.datetime.now()
    })


