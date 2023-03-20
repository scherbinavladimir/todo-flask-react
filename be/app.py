import flask
import flask_praetorian
import os
from flask import Flask, send_from_directory
from models import db, User

from flask_restful import Api

from resources import TaskList, TaskDetail

guard = flask_praetorian.Praetorian()

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__, static_folder='build', static_url_path='')
app.config['SECRET_KEY'] = '!@#^5761253UUQWE76R37Q862UDYA&^%#&@^Q%'
app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api = Api(app)
api.add_resource(TaskList, '/api/task/')
api.add_resource(TaskDetail, '/api/task/<int:task_id>/')

guard.init_app(app, User)

db.init_app(app)


@app.route("/api/login/", methods=["POST"])
def login():
    """
    Logs a user in by parsing a POST request containing user credentials and
    issuing a JWT token.
    """
    req = flask.request.get_json(force=True)
    username = req.get("username", None)
    password = req.get("password", None)
    user = guard.authenticate(username, password)
    ret = {"access_token": guard.encode_jwt_token(user)}
    return (flask.jsonify(ret), 200)


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


with app.app_context():
    db.create_all()
    # db.session.add(
    #     User(
    #         username="admin",
    #         hashed_password=guard.hash_password("123"),
    #     )
    # )
    # db.session.commit()

if __name__ == "__main__":
    app.run(debug=True)