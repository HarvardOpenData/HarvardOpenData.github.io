import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '..')))

import unittest

from server import auth

class TestAuth(unittest.TestCase):
    def test_is_authenticated():
        pass