import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import hashlib
import datetime

# returns the MD5 hash of the user's email.
# used for the ID of the responses doc
def email_hash(email):
    return hashlib.md5(email.encode()).hexdigest()

# checks if the current user exists in DB and has the correct userId
def is_authenticated(userEmail, userId, db):
    if userEmail is None or userId is None:
        return False
    emails_ref = db.collection("emails")
    userDoc = emails_ref.document(userEmail)
    if userDoc is None:
        return False
    userDict = userDoc.to_dict() 
    
    if userDict["id"] == userId:
        return True
    else:
        raise Exception("Email and stored ID do not match")

# creates a user in the database and returns a reference to the user's email doc
# if user already exists, returns a reference to existing user's email doc
def create_user(userEmail, userId, db):
    emails_ref = db.collection("emails")
    if userEmail is None:
        raise Exception("User email not defined")
    if userId is None:
        raise Exception("User ID not defined")
    if is_authenticated(userEmail, userId, db):
        return emails_ref.document(userEmail)
    else: 
        emails_ref.document(userEmail).set({
            "id" : userId,
            "has_demographics" : False,
            "last_contact" : datetime.datetime.now,
            "monthly_responses" : [],
            "total_responses" : 0,
        })
        db.collection("responses").document(email_hash(userEmail)).set({
            "demographics" : {}
        })
        return emails_ref.document(userEmail)

