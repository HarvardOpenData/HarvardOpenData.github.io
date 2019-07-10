import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import server.auth as auth

def update_demographics(email, form, demo_questions, db):
    print("UDPATING DEMOGRAPHICS...")
    userResponsesRef = db.collection("responses").document(auth.email_hash(email))
    new_demographics = {} 
    for field in form:
        if field in demo_questions["valid_form_names"]:
            if field in demo_questions["multiselects"]:
                new_demographics[field] = form.getlist(field)
            elif field != "house" or form.get("year", -1) != demo_questions["years"][-1]:
                new_demographics[field] = form[field]
    print(new_demographics)
    userResponsesRef.update({
        "demographics" : new_demographics
    })


