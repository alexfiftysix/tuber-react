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
    # TODO: Move this to SingleUserResource
    def post(self):
        # TODO: validate
        # TODO: send verification email to new user
        if not request.form['email'] or not request.form['password']:
            return {'message': 'Please provide email address and password'}

        password = sha256_crypt.encrypt(request.form['password'])
        new_user = User(
            email=request.form['email'],
            password=password,
            name=None,
        )
        db.session.add(new_user)
        db.session.commit()
        return {'response': 'user added'}


api.add_resource(UserSignUp, '/sign_up')


class SingleUserResource(Resource):
    # TODO: PATCH user.
    def get(self, id):
        found = User.query.filter_by(id=id).first()

        if not found:
            return {'message': 'user not found'}

        current = {
            'id': found.id,
            'email': found.email,
            'name': found.name,
        }

        return {'user': current}

    def patch(self, id):
        found = User.query.filter_by(id=id).first()

        if not found:
            return {'message': 'user not found'}

        if request.form.get('name'):
            found.name = request.form['name']
        if request.form.get('email'):
            found.email = request.form['email']

        db.session.commit()

        current = {
            'id': found.id,
            'email': found.email,
            'name': found.name,
        }

        return current

    def post(self):
        # TODO: Add this / check this
        # TODO: validate
        # TODO: send verification email to new user
        if not request.form['email'] or not request.form['password']:
            return {'message': 'Please provide email address and password'}

        password = sha256_crypt.encrypt(request.form['password'])
        new_user = User(
            email=request.form['email'],
            password=password,
            name=None,
            rating=None
        )
        db.session.add(new_user)
        db.session.commit()
        return {'response': 'user added'}


api.add_resource(SingleUserResource, '/user/<id>')


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


class PotatoResource(Resource):
    def post(self):
        # Add new potato
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
        # Get all potatoes
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


class SingleAddressResource(Resource):
    def get(self, id):
        # ID of the owner of the address
        address = Address.query.filter_by(id=id).first()
        if not address:
            return {'message': 'That address does not exist'}

        current = {
            'unit_number': address.unit_number,
            'street_number': address.street_number,
            'street_name': address.street_name,
            'suburb': address.suburb,
            'country': address.country
        }

        return current

    def post(self):
        # POST is for creating new resources
        # TODO: validation
        new_address = {
            'owner': request.form.get('owner'),
            'unit_number': request.form.get('unit_number'),
            'street_number': request.form.get('street_number'),
            'street_name': request.form.get('street_name'),
            'suburb': request.form.get('suburb'),
            'country': request.form.get('country')
        }

        db.session.add(new_address)
        db.session.commit()
        return new_address


api.add_resource(SingleAddressResource, '/address/id')


class LogInResource(Resource):
    def post(self):
        print(request.form['password'])


api.add_resource(LogInResource, '/log_in')


# ------ #
# Models #
# ------ #
class Potatoes(db.Model):
    __tablename__ = 'potato'
    id = db.Column('id', db.SmallInteger, primary_key=True)
    owner = db.Column('owner', db.Integer, db.ForeignKey('user.id'), nullable=False)
    type = db.Column('type', db.String(200), nullable=False)
    amount = db.Column('amount', db.String(2000), nullable=False)
    price_per_kilo = db.Column('price', db.DECIMAL(10, 2), nullable=False)
    description = db.Column('description', db.String(200), nullable=False)
    photo_path = db.Column('photo_path', db.String(300), nullable=True)


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True, nullable=False)
    email = db.Column('email', db.String(250), unique=True, nullable=False)
    password = db.Column('password', db.String(250), unique=False, nullable=False)
    name = db.Column('name', db.String(250), nullable=True)


class Address(db.Model):
    __tablename__ = 'address'
    owner = db.Column('owner', db.Integer, db.ForeignKey('user.id'), primary_key=True, nullable=False)
    unit_number = db.Column('unit_number', db.Integer, nullable=True)
    street_number = db.Column('street_number', db.Integer, nullable=False)
    street_name = db.Column('street_name', db.String(250), nullable=False)
    suburb = db.Column('suburb', db.String(250), nullable=False)
    country = db.Column('country', db.String(250), nullable=False)


class Rating(db.Model):
    __tablename__ = 'rating'
    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    reviewer = db.Column('reviewer', db.Integer, db.ForeignKey('user.id'), nullable=False)  # user who left review
    reviewee = db.Column('reviewee', db.Integer, db.ForeignKey('user.id'), nullable=False)  # user being reviewed
    rating = db.Column('rating', db.Integer, nullable=False)  # from 1-5 inclusive
    comment = db.Column('comment', db.String(200), nullable=True)


if __name__ == '__main__':
    app.run(debug=True)
