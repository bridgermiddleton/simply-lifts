import sqlite3

def getDB():
    connection = sqlite3.connect("simply-lifts.db")
    return connection

def createCursor(db):
    cursor = db.cursor()
    return cursor