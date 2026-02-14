import sqlite3
import os

# get directory where helpers.py lives
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
def getDB():
    db_path = os.path.join(BASE_DIR, "simply-lifts.db")
    connection = sqlite3.connect(db_path)
    return connection

def createCursor(db):
    cursor = db.cursor()
    return cursor