from typing import List, Dict
from firebase_admin.firestore.firestore import Client, DocumentReference
from firebase_admin.storage.storage import Bucket
from server.auth import *

class Member:
    def __init__(self, email : str):
        self.email : str = email
        self.full_name : str= ""
        self.house : str = ""
        self.articles : List[dict] = []
        self.year : str = ""
        self.img_url : str = ""
        self.description : str = ""
        self.webapps : List[dict] = ""
        self.id : str = ""

    def update_from_dict(self, input_dict : dict):
        self.full_name = input_dict.get("full_name", "")
        self.house = input_dict.get("house", "")
        self.articles = input_dict.get("articles", [])
        self.webapps = input_dict.get("webapps", [])
        self.year = input_dict.get("year", "")
        self.img_url = input_dict.get("img_url", None)
        self.description = input_dict.get("description", "")
        self.id = input_dict.get("id", None)

    @staticmethod
    def from_dict(email : str, input_dict : dict) -> Member:
        member = Member(email)
        member.update_from_dict(input_dict)
        return member

    def to_dict(self): 
        out_dict = {}
        out_dict["full_name"] = self.full_name
        out_dict["house"] = self.house
        out_dict["articles"] = self.articles
        out_dict["webapps"] = self.webapps
        out_dict["year"] = self.year
        out_dict["img_url"] = self.img_url
        out_dict["description"] = self.description
        out_dict["id"] = self.id

    def save(self, db : Client):
        member_ref : DocumentReference = db.collection("members").document(self.email)
        member_ref.update(self.to_dict())