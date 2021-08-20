from flask import Flask, request, jsonify
from flask_cors import CORS
from delegate import login_verification, display_all, signup
from flask_jwt_extended import create_access_token
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import unset_jwt_cookies
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import get_jwt


app = Flask(__name__)
app.config['SECRET_KEY'] = 'xo8R7i5fjFkUoNQr_wP8ZG7zw3JwRwwaz9_i4146YAM'
jwt = JWTManager(app)

CORS(app)

@app.route('/listings/all', methods=['GET'])
@jwt_required()
def display():
    data = display_all()
    return jsonify({"listings": data})

@app.route("/signup", methods=["POST"])
def register():
    data = request.get_json()
    signup(data['name'], data['pnum'], data['email'], data['password'])
    print(data)
    return jsonify({"auth": True})



@app.route("/login", methods=["POST"])
def login():
    # get the data from our incoming request
    data = request.get_json()
    # pass that data to our login method
    auth = login_verification(data['email'], data['password'])
    # if we do, return something indicating success
    if auth:
        access_token = create_access_token(identity=data['email'])
        refresh_token = create_refresh_token(identity=data['email'])
        return jsonify({"access_token":access_token, "refresh_token":refresh_token, "auth":True}), 200
        #return jsonify({"auth": True})
    # otherwise, return something indicating failure
    return jsonify({"auth": False})

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route("/info", methods=["GET"])
@jwt_required()
def info():
    print(get_jwt())
    print(get_jwt_identity())
    return jsonify({'msg':'cats', 'jwt':get_jwt()})


if __name__ == "__main__":
    app.run() 