import sys
sys.path.append("../")
from typing import List, Dict, Type, TypeVar
import json
from firebase_admin import firestore, storage
from threading import Lock

MemberType = TypeVar('MemberType', bound='Member')

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
    
    @classmethod
    def get_member(cls : Type[MemberType], userEmail : str, userId : str, db : firestore.firestore.Client, readonly = False) -> MemberType:
        members_ref : firestore.firestore.DocumentReference = db.collection("members").document(userEmail)
        member_snapshot : firestore.firestore.DocumentSnapshot = members_ref.get()
        if not member_snapshot.exists:
            if not readonly:
                raise Exception("Email does not belong to HODP member")
            else:
                return None

        member_email = members_ref.id
        member_dict = member_snapshot.to_dict()

        member = cls(member_email, member_dict)
        
        if not readonly:
            if member.id is None:
                member.id = userId
                members_ref.update({
                    "id" : member.id
                })
            elif member.id != userId:
                raise Exception("id in databasae does not match current id")

        return member

# used to cache members from firebase so we can make fewer calls and speed things up
class MembersCache():
    def __init__(self):
        self.members = []
        self.lock : Lock = Lock() 
        
    # refreshes the cache from firestore
    # should be called whenever the database is updated
    # this is probably less efficient than it could be, but it is called fairly infrequently
    # furthermore, only HODP members will experience the slowdown
    def populate(self, db : firestore.firestore.Client, peopleYml : dict) -> List[Member]:
        members = []
        for person in peopleYml["people"]:
            if "email" in person:
                member = Member.get_member(person["email"], None, db, True)
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

    # return the full list of members
    def get(self) -> List[Member]:
        members = None
        self.lock.acquire()
        members = self.members
        self.lock.release()
        return members



def add_members_to_firestore(db : firestore.firestore.Client, peopleYml : List[dict]):
    members_ref = db.collection("members")
    people = peopleYml["people"]
    for person in people:
        if "email" in person: 
            email = person["email"]
            name = person["name"]
            member_ref : firestore.firestore.DocumentReference = members_ref.document(email)
            member_doc : firestore.firestore.DocumentSnapshot = member_ref.get()
            if not member_doc.exists:
                member_ref.set({
                    "full_name" : name
                })
