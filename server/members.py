from typing import List, Dict
from firebase_admin import firestore, storage
from server.auth import *

class Member:
    def __init__(self, email : str, init_dict : dict = {}):
        self.email : str = email
        self.full_name = init_dict.get("full_name", None)
        self.house = init_dict.get("house", None)
        self.contributions = init_dict.get("contributions", [])
        self.year = init_dict.get("year", None)
        self.img_url = init_dict.get("img_url", None)
        self.description = init_dict.get("description", "")
        self.id = init_dict.get("id", None)
        self.role = init_dict.get("role", None)

    def merge_people_dict(self, people_dict : dict):
        print("in merge people dict")
        if not self.full_name and "name" in people_dict:
            self.full_name = people_dict["name"]
        if not self.img_url is None and "image" in people_dict:
            self.img_url = "/static/img/people/{}".format(people_dict["image"])
        if not self.role and "role" in people_dict:
            self.role = people_dict["role"]
        if not self.description and "bio" in people_dict:
            self.description = people_dict["bio"]

    def to_dict(self): 
        out_dict = {}
        out_dict["full_name"] = self.full_name
        out_dict["house"] = self.house
        out_dict["contributions"] = self.contributions
        out_dict["year"] = self.year
        out_dict["img_url"] = self.img_url
        out_dict["description"] = self.description
        out_dict["id"] = self.id
        return out_dict

    def member_id(self):
        return self.email.replace("@college.harvard.edu", "")

    def save(self, db : firestore.firestore.Client):
        member_ref : firestore.firestore.DocumentReference = db.collection("members").document(self.email)
        member_ref.update(self.to_dict())