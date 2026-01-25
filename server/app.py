from flask import Flask, flash, redirect, request, session, jsonify
from flask_cors import CORS
import datetime
import bcrypt
import sqlite3
from helpers import getDB, createCursor


app = Flask(__name__)

CORS(app)

@app.route('/api/register', methods=["POST"])
def register():

    if request.method == "POST":
        db = getDB()
        cursor = createCursor(db)
        data = request.get_json()
        print(data)
        if data:
            name = data.get("name")
            print("name",name)
            email = data.get("email")

            # password hash generator
            salt = bcrypt.gensalt()
            password_str = data.get("password")
            password_bytes = password_str.encode("utf-8")
            hashed_password = bcrypt.hashpw(password_bytes, salt)

            try:
                cursor.execute("INSERT INTO users (name, email, hash) VALUES (?, ?, ?)", (name, email, hashed_password))
                db.commit()
                response = {"message": "success"}
                return jsonify(response);
            except Exception as e:
                response = {"message": e}
                return jsonify(response)
            finally:
                cursor.close()
                db.close()

        else:
            print("fuck")
    



@app.route('/login')
def login():
    return

        