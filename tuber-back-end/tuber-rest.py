from flask import Flask, jsonify, make_response, request
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth
from passlib.hash import sha256_crypt
from flask_cors import CORS, cross_origin
# noinspection PyUnresolvedReferences
from config import config

app = Flask(__name__)

CORS(app)  # Allows all others to access this API

api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqldb://{username}:{password}@{host}/{db_name}'.format(
    username=config['db_username'],
    password=config['db_password'],
    host=config['db_host'],
    db_name=config['db_name']
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_POOL_RECYCLE'] = 380
app.secret_key = "Don'tTellAnyone"

db = SQLAlchemy(app)

auth = HTTPBasicAuth()

users = {
    "john": "hello",
    "susan": "bye"
}


@auth.get_password
def get_pw(username):
    if username in users:
        return users.get(username)
    return None


@app.route('/')
@auth.login_required
def index():
    return "Hello, %s!" % auth.username()


class Ping(Resource):
    def get(self):
        return {'request': 'get'}

    def post(self):
        return {'request': 'post'}

    def put(self):
        print("Put Request Ping received")
        print(request.get_data())
        print(request.form['message'])
        return {'request': 'put'}

    def delete(self):
        return {'request': 'delete'}

    def patch(self):
        return {'request': 'patch'}


api.add_resource(Ping, '/ping')


# @auth.verify_password
# def verify(email, password):
#     print("trying to verify")
#     print(email)
#     print(password)
#     if not (email and password):
#         print("Required data not included")
#         return False
#     user = User.query.filter_by(email=email).first()
#     print(user)
#     return sha256_crypt.verify(password, user.password)


class Build(Resource):
    def get(self):
        db.create_all()
        return {'response': 'db is created'}


api.add_resource(Build, '/build')


class Secret(Resource):
    @auth.login_required
    def get(self):
        return {'secret': 'Not telling'}


api.add_resource(Secret, '/secret')


class UserSignUp(Resource):
    # TODO: Put all user stuff in here under different request types
    def post(self):
        # TODO: Use PUT instead
        # TODO: validate
        # TODO: send verification email to new user
        if not request.form['email'] or not request.form['password']:
            return {'message': 'Please provide email address and password'}

        password = sha256_crypt.encrypt(request.form['password'])
        new_user = User(
            email=request.form['email'],
            password=password,
            name=None,
            address=None,
            rating=None
        )
        db.session.add(new_user)
        db.session.commit()
        return {'response': 'user added'}


api.add_resource(UserSignUp, '/sign_up')


class GetUser(Resource):
    def get(self, id):
        found = User.query.filter_by(id=id).first()

        if not found:
            return {'message': 'user not found'}

        current = {
            'id': found.id,
            'email': found.email,
            'name': found.name,
            'address': found.address,
            'rating': found.rating
        }

        return {'user': current}


api.add_resource(GetUser, '/user/<id>')


class GetUsers(Resource):
    def get(self):
        all_users = User.query.all()

        response = []

        for user in all_users:
            current = {
                'id': user.id,
                'email': user.email,
                'name': user.name,
                'address': user.address,
                'rating': user.rating
            }
            response.append(current)

        return {'users': response}


api.add_resource(GetUsers, '/user')


def pretty_print_POST(req):
    """
    At this point it is completely built and ready
    to be fired; it is "prepared".

    However pay attention at the formatting used in
    this function because it is programmed to be pretty
    printed and may differ from the actual request.
    """
    print('{}\n{}\n{}\n\n{}'.format(
        '-----------START-----------',
        req.method + ' ' + req.url,
        '\n'.join('{}: {}'.format(k, v) for k, v in req.headers.items()),
        req.body,
    ))


class PotatoResource(Resource):
    def put(self):
        new_potato = Potatoes(
            owner=request.form['id'],
            type=request.form['type'],
            amount=request.form['amount'],
            price_per_kilo=request.form['price'],
            description=request.form['description'],
            photo_path=None
        )

        db.session.add(new_potato)
        db.session.commit()
        return {'message': 'new {} potato added'.format(request.form['type'])}

    def get(self):
        potatoes = Potatoes.query.all()

        data = []

        for pot in potatoes:
            current = {
                'title': pot.type,
                'image': pot.photo_path,
                'price': float(pot.price_per_kilo),
                'amount': float(pot.amount),
                'description': pot.description,
                'location': 'No location',
                'owner': pot.owner,
                'id': pot.id
            }
            data.append(current)

        response = make_response(jsonify(data))
        response.headers['Access-Control-Allow-Origin'] = '*'  # TODO: put backend on diff server?

        return response


api.add_resource(PotatoResource, '/potatoes')


class SinglePotatoResource(Resource):
    def get(self, id):
        pot = Potatoes.query.filter_by(id=id).first()

        current = {
            'title': pot.type,
            'image': pot.photo_path,
            'price': float(pot.price_per_kilo),
            'amount': float(pot.amount),
            'description': pot.description,
            'location': 'No location',
            'owner': pot.owner,
            'id': pot.id
        }

        return [current]


api.add_resource(SinglePotatoResource, '/potatoes/<id>')


class UsersPotatoesResource(Resource):
    def get(self, user_id):
        potatoes = Potatoes.query.filter_by(owner=user_id).all()

        data = []

        for pot in potatoes:
            current = {
                'title': pot.type,
                'image': pot.photo_path,
                'price': float(pot.price_per_kilo),
                'amount': float(pot.amount),
                'description': pot.description,
                'location': 'No location',
                'owner': pot.owner,
                'id': pot.id
            }
            data.append(current)

        response = make_response(jsonify(data))
        response.headers['Access-Control-Allow-Origin'] = '*'  # TODO: put backend on diff server?

        return response


api.add_resource(UsersPotatoesResource, '/potatoes+user=<user_id>')


class SignUpResource(Resource):
    def put(self):
        print(request.form['email'])


class LogInResource(Resource):
    def post(self):
        print(request.form['password'])


api.add_resource(LogInResource, '/log_in')


# ------ #
# Models #
# ------ #
class Potatoes(db.Model):
    __tablename__ = 'potatoes'
    id = db.Column('id', db.SmallInteger, primary_key=True)
    owner = db.Column('owner', db.Integer, db.ForeignKey('users.id'), nullable=False)
    type = db.Column('type', db.String(200), nullable=False)
    amount = db.Column('amount', db.String(2000), nullable=False)
    price_per_kilo = db.Column('price', db.DECIMAL(10, 2), nullable=False)
    description = db.Column('description', db.String(200), nullable=False)
    photo_path = db.Column('photo_path', db.String(300), nullable=True)


class User(db.Model):
    # TODO: Just have email as PK?
    __tablename__ = 'users'
    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True, nullable=False)
    email = db.Column('email', db.String(250), unique=True, nullable=False)
    password = db.Column('password', db.String(250), unique=False, nullable=False)
    name = db.Column('name', db.String(250), nullable=True)
    address = db.Column('address', db.Integer, db.ForeignKey('address.id'), nullable=True)
    rating = db.Column('rating', db.DECIMAL(10, 2), nullable=True)
    # Instead of storing rating, store Reviews as DB table linked to user, and generate rating accordingly


class Address(db.Model):
    __tablename__ = 'address'
    id = db.Column('id', db.Integer, primary_key=True, nullable=False, autoincrement=True)
    unit_number = db.Column('unit_number', db.Integer, nullable=True)
    street_number = db.Column('street_number', db.Integer, nullable=False)
    street_name = db.Column('street_name', db.String(250), nullable=False)
    suburb = db.Column('suburb', db.String(250), nullable=False)
    country = db.Column('country', db.String(250), nullable=False)


if __name__ == '__main__':
    app.run(debug=True)
