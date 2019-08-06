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

def reset_database(db : MockFirestore):
        db.reset()
        emails_ref = db.collection("emails")
        emails_ref.document("test1").set({
            "id" : "12345",
            "has_demographics" : True
        })
        
        emails_ref.document("test2").set({
            "has_demographics" : False
        })

class TestAuth(unittest.TestCase):
    def setUp(self):
        self.db = MockFirestore()
        reset_database(self.db)

    def test_is_authenticated_false(self):
        db = self.db
        reset_database(db)
        emails_ref = db.collection("emails")
        self.assertFalse(auth.is_authenticated(None, None, emails_ref))
        self.assertFalse(auth.is_authenticated("test2", "12345", emails_ref))
        self.assertFalse(auth.is_authenticated("test3", "12345", emails_ref))

    def test_is_authenticated_true(self):
        db = self.db
        reset_database(db)
        emails_ref = db.collection("emails")
        self.assertTrue(auth.is_authenticated("test1", "12345", emails_ref))

    def test_is_authenticated_error(self):
        self.assertRaises(Exception, lambda : auth.is_authenticated("test1", "23456"))

