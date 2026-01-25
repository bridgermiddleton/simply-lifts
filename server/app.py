from flask import Flask, flash, redirect, request, session, jsonify
from flask_cors import CORS
import datetime
import bcrypt
import sqlite3
from helpers import getDB, createCursor

# instantiate the app
app = Flask(__name__)

# allows us to make requests to other urls (since our frontend and backend are hosted on different urls, we need to do this)
CORS(app)

# register
@app.route('/api/register', methods=["POST"])
def register():

    if request.method == "POST":

        # we connect to our DB and our cursor.  we then checkout the json that we got sent by creating that data variable
        db = getDB()
        cursor = createCursor(db)
        data = request.get_json()
        print(data)

        # if data isn't empty...
        if data:

            # basically get all of our form elements, hash a password, and then...
            name = data.get("name")
            print("name",name)
            email = data.get("email")

            # password hash generator
            salt = bcrypt.gensalt()
            password_str = data.get("password")
            password_bytes = password_str.encode("utf-8")
            hashed_password = bcrypt.hashpw(password_bytes, salt)


            # we try to execute the SQL command.  we then commit it to our db, create a response message, and then return that response message as json
            try:
                cursor.execute("INSERT INTO users (name, email, hash) VALUES (?, ?, ?)", (name, email, hashed_password))
                db.commit()
                response = {"message": "success"}
                return jsonify(response);

                # if it didn't work, we throw a response with the error message
            except Exception as e:
                response = {"message": e}
                return jsonify(response)

                # after all is said and done, we need to close our cursor and our DB so we don't run into the threading issue
            finally:
                cursor.close()
                db.close()

        return
    



@app.route('/login')
def login():
    return

        