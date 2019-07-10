import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import server.auth as auth
import datetime

def update_demographics(email, form, demo_questions, db):
    userResponsesRef = db.collection("responses").document(auth.email_hash(email))
    userEmailsRef = db.collection("emails").document(email)
    new_demographics = {} 
    for field in form:
        if field in demo_questions["valid_form_names"]:
            if field in demo_questions["multiselects"]:
                new_demographics[field] = form.getlist(field)
            elif field != "house" or form.get("year", -1) != demo_questions["years"][-1]:
                new_demographics[field] = form[field]
    userResponsesRef.update({
        "demographics" : new_demographics
    })
    userEmailsRef.update({
        "has_demographics" : True,
        "last_demographic_update" : datetime.datetime.now()
    })


