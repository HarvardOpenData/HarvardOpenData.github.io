from typing import List, Dict
import json
from firebase_admin import firestore, storage
import server.auth as auth
from server.auth import *
from threading import Lock

class Member:
    def __init__(self, email : str, init_dict : dict = {}):
        self.email : str = email
        self.full_name = init_dict.get("full_name", None)
        self.house = init_dict.get("house", None)
        self.contributions = init_dict.get("contributions", [])
        self.year = init_dict.get("year", None)
        self.img_url = init_dict.get("img_url", None)
        self.description = init_dict.get("description", None)
        self.id = init_dict.get("id", None)
        self.role = init_dict.get("role", None)
        if self.email:
            self.member_id = self.email.replace("@college.harvard.edu", "")
        else:
            self.member_id = None

    def merge_people_dict(self, people_dict : dict):
        if not self.full_name and "name" in people_dict:
            self.full_name = people_dict["name"]
        if not self.img_url and "image" in people_dict:
            self.img_url = "/static/img/people/{}".format(people_dict["image"])
        if not self.role and "role" in people_dict:
            self.role = people_dict["role"]
        if not self.description and "bio" in people_dict:
            self.description = people_dict["bio"]
        if not self.year and "year" in people_dict:
            self.year = people_dict["year"]
        if not self.house and "house" in people_dict:
            self.house = people_dict["house"]

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

    def update_from_form(self, form):
        self.full_name = form.get("full_name", self.full_name)
        self.house = form.get("house", self.house)
        self.contributions = json.loads(form.get("contributions", json.dumps(self.contributions)))
        self.year = form.get("year", self.year)
        self.description = form.get("description", self.description)

    def save(self, db : firestore.firestore.Client):
        member_ref : firestore.firestore.DocumentReference = db.collection("members").document(self.email)
        update_dict = { 
            "full_name" : self.full_name,
            "house" : self.house,
            "contributions" : self.contributions,
            "year" : self.year,
            "description" : self.description,
            "img_url" : self.img_url
        }
        member_ref.update(update_dict)

class MembersCache():
    def __init__(self):
        self.members = []
        self.lock : Lock = Lock() 
        
    def populate(self, db : firestore.firestore.Client, peopleYml : dict) -> List[Member]:
        members = []
        for person in peopleYml["people"]:
            if "email" in person:
                member = auth.get_member(person["email"], None, db, True)
                if member is not None:
                    member.merge_people_dict(person)
                    members.append(member)
                else:
                    member = Member(None)
                    member.merge_people_dict(person)
                    members.append(member)
            else:
                member = Member(None)
                member.merge_people_dict(person)
                members.append(member)
        self.lock.acquire()
        self.members = members.copy()
        self.lock.release()
        return self.members

    def get(self) -> List[Member]:
        members = None
        self.lock.acquire()
        print("lock acquired!")
        members = self.members
        self.lock.release()
        print("lock released!")
        return members

    
