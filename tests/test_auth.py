import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '..')))

import unittest

from server import auth

class TestAuth(unittest.TestCase):
    def test_is_authenticated():
        pass
    import os, sys
from mockfirestore import *
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '..')))

import unittest
from server import auth

class TestAuth(unittest.TestCase):
    def setUp(self):
        self.db = MockFirestore()
        self.reset_database()

    def test_is_authenticated(self):
        pass

    def reset_database(self):
        db = self.db
        db.reset_database()
        emails_ref = db.collection("email")
        emails_ref.document("test1").set({
            "id" : "12345",
            "has_demographics" : True
        })
        
        emails_ref.document("test2").set({
            "id": "56789",
            "has_demographics" : False
        })

