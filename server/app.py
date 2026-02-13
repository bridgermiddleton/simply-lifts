from flask import Flask, flash, redirect, request, session, jsonify
from flask_cors import CORS
from flask_session import Session
from datetime import datetime
import bcrypt
from flask_bcrypt import Bcrypt
import sqlite3
from helpers import getDB, createCursor

# instantiate the app
app = Flask(__name__)

app.debug = True

# Setting up secret key for session management

app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

# allows us to make requests to other urls (since our frontend and backend are hosted on different urls, we need to do this)
CORS(app, supports_credentials=True, origins="http://localhost:5173")

# show past workouts

@app.route('/api/past-workouts', methods=["GET"])
def get_past_workouts():

    if request.method == "GET":
        db = getDB()
        cursor = createCursor(db)
        user_id = session['user_id']

        cursor.execute("SELECT * FROM workout_logs WHERE user_id=?", (user_id,))
        logs = cursor.fetchall()
        logArray = []
        for log in logs:
            workout_id = log[2]
            cursor.execute("SELECT name FROM workouts WHERE id=?", (workout_id,))
            workout_name = cursor.fetchone()[0]
            date = log[3]
            logArray.append({"name": workout_name, "date": date})
        
        response = {"message": "success", "logs": logArray}
        return jsonify(response)
    else:
        response = {"message": "failure"}
        return jsonify(response)
        



# create workout log

@app.route('/api/log-workout', methods=["POST"])
def create_workout_log():

    if request.method == "POST":
        data = request.get_json()
        print("data", data)
        db = getDB()
        cursor = createCursor(db)
        date = datetime.now()
        date = date.strftime("%b %d, %Y, %I:%M %p")
        user_id = session["user_id"]
        workout_id = data["workoutId"]
        exercises = data['logData']
        try:
            cursor.execute("INSERT INTO workout_logs (user_id, workout_id, date) VALUES (?, ?, ?)", (user_id, workout_id, date))
            log_id = cursor.lastrowid
            db.commit()
            for exercise in exercises:
                exercise_id = exercise['exerciseId']
                sets = exercise['sets']

                for s in sets:
                    set_number = s['setNumber']
                    weight = s['weight']
                    reps = s['reps']
                    cursor.execute("INSERT INTO log_entries (log_id, exercise_id, set_number, weight, reps) VALUES(?, ?, ?, ?, ?)", (log_id, exercise_id, set_number, weight, reps))
                    db.commit()
            
            response = {"message": "success"}
            return jsonify(response)
        except Exception as e:
            response = {"message": str(e)}
            return jsonify(response)
        
        finally:
            cursor.close()
            db.close()
    return




# fetch workout template

@app.route('/api/workouts/<workout_id>', methods=["GET"])
def get_workout_template(workout_id):
    
    if request.method == "GET":
        db = getDB()
        cursor = createCursor(db)
        cursor.execute("SELECT * FROM workout_exercises WHERE workout_id=? ORDER BY specific_order", (workout_id,))
        workout_exercises = cursor.fetchall()
        print(workout_exercises)
        exercise_array = []
        user_id = session['user_id']
        for workout_exercise in workout_exercises:
            exercise_id = workout_exercise[2]
            sets = workout_exercise[3]
            reps = workout_exercise[4]
            order = workout_exercise[5]
            cursor.execute("SELECT name FROM exercises WHERE id=?", (exercise_id,))
            exercise_name = cursor.fetchone()[0]
            cursor.execute("SELECT id FROM workout_logs WHERE user_id=? AND workout_id=? ORDER BY date DESC", (user_id, workout_id))
            log_id = cursor.fetchone()[0]
            cursor.execute("SELECT * FROM log_entries WHERE log_id=? AND exercise_id=? ORDER BY set_number ASC", (log_id, exercise_id))
            logs = cursor.fetchall()
            logs_array = []
            if logs:
                for log in logs:
                    logs_array.append({"setNumber": log[3], "weight": log[4], "reps": log[5]})


            exercise_array.append({"exercise_id": exercise_id, "name": exercise_name, "sets": sets, "reps": reps, "order": order, "logs": logs_array})
            
        cursor.execute("SELECT name FROM workouts WHERE id=?", (workout_id,))
        workout_name = cursor.fetchone()[0]
        response = {"message": "success", "workout_name": workout_name,"exercises": exercise_array}
        cursor.close()
        db.close()
        return jsonify(response)
    return




# get workouts

@app.route('/api/workouts', methods=["GET"])
def get_workouts():

    if request.method == "GET":
        db = getDB()
        cursor = createCursor(db)
        user_id = session["user_id"]
        cursor.execute("SELECT * FROM workouts WHERE user_id=?", (user_id,))
        rows = cursor.fetchall()
        response = {"workouts": rows}
        print("rows", rows)
        cursor.close()
        db.close()
        # maybe jsonify?
        return response
    return


# create workout

@app.route('/api/create-workout', methods=["POST"])
def create_workout():

    if request.method == "POST":

        db = getDB()
        cursor = createCursor(db)
        data = request.get_json()
        name = data["name"]
        user_id = session["user_id"]
        exercises = data["exerciseArray"]
        print("data:", data)
        print("user_id:", user_id)
        print("name:", name)
        print("exercises:", exercises)
        try:
            cursor.execute("INSERT INTO workouts (user_id, name) VALUES (?, ?)", (user_id, name))
            db.commit()
            workout_id = cursor.lastrowid
            count = 0
            for exercise in exercises:
                print("exercise:", exercise)
                cursor.execute("INSERT INTO exercises (user_id, name) VALUES (?, ?)", (user_id, exercise["exerciseName"]))
                db.commit()
                exercise_id = cursor.lastrowid
                cursor.execute("INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, specific_order) VALUES (?, ?, ?, ?, ?)", (workout_id, exercise_id, exercise["sets"], exercise["reps"], count))
                db.commit()
                count += 1

            response = {"message": "success"}
            return jsonify(response)
        except Exception as e:
            response = {"message": str(e)}
            return jsonify(response)
        finally:
            cursor.close()
            db.close()
    return
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
                cursor.execute("SELECT * FROM users WHERE email=?", (email,))
                user = cursor.fetchone()
                session["user_id"] = user[0]
                response = {"message": "success", "user_id": user[0]}
                return jsonify(response);

                # if it didn't work, we throw a response with the error message
            except Exception as e:
                response = {"message": str(e)}
                return jsonify(response)

                # after all is said and done, we need to close our cursor and our DB so we don't run into the threading issue
            finally:
                cursor.close()
                db.close()

        return
    



@app.route('/api/login', methods=["POST"])
def login():

    if request.method == "POST":

        db = getDB()
        cursor = createCursor(db)
        data = request.get_json()
        email = data.get("email")
        print(email)
        password_str = data.get("password")
        password_bytes = password_str.encode("utf-8")

        try:
            cursor.execute("SELECT * FROM users WHERE email=?", (email,))
            user = cursor.fetchone()
            print(user)
            print(bcrypt.checkpw(password_bytes, user[3]))
            if user and bcrypt.checkpw(password_bytes, user[3]):
                response = {"user_id": user[0]}
                session['user_id'] = user[0]
                print(session['user_id'])
                return jsonify(response), 200;
                # if it didn't work, we throw a response with the error message
        except Exception as e:
            error_str = str(e)
            response = {"status": "error", "message": error_str}
            return jsonify(response), 404

                # after all is said and done, we need to close our cursor and our DB so we don't run into the threading issue
        finally:
                cursor.close()
                db.close()
    return

@app.route('/api/auth')
def me():

    if not session:
        response = {"message": "unauthenticated"}
        return response
    elif "user_id" in session:
        print(session)
        response = {"message": "authenticated", "user_id": session["user_id"]}
        return jsonify(response)
    else:
        print(session)
        response = {"message": "unauthenticated"}
        return jsonify(response)

@app.route('/api/logout', methods=["POST"])
def logout():
    if request.method == "POST":

        session.pop('user_id', None)
        
        return "Success"
    return