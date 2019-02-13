from flask import Flask, jsonify, make_response
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
# noinspection PyUnresolvedReferences
from config import config

app = Flask(__name__)
api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqldb://{username}:{password}@{host}/{db_name}'.format(
    username=config['db_username'],
    password=config['db_password'],
    host=config['db_host'],
    db_name=config['db_name']
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_POOL_RECYCLE'] = 380
db = SQLAlchemy(app)


class Hello(Resource):
    def get(self):
        return {'hello': 'world'}

    def put(self):
        return {'put': 'world'}

    def delete(self):
        return {'delete': 'world'}


api.add_resource(Hello, '/hello')


@app.route('/')
def home():
    return jsonify({'name': 'no name', 'info': 'none'})


class PotatoResource(Resource):
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


class Message(Resource):
    def get(self, message):
        return {'message': message}


api.add_resource(Message, '/message/<string:message>')


# ------ #
# Models #
# ------ #
class Potatoes(db.Model):
    __tablename__ = 'potatoes'
    id = db.Column('id', db.SmallInteger, primary_key=True)
    owner = db.Column('owner', db.String(50), db.ForeignKey('users.username'), nullable=False)
    type = db.Column('type', db.String(200), nullable=False)
    amount = db.Column('amount', db.String(2000), nullable=False)
    price_per_kilo = db.Column('price', db.DECIMAL(10, 2), nullable=False)
    description = db.Column('description', db.String(200), nullable=False)
    photo_path = db.Column('photo_path', db.String(300), nullable=False)


class User(db.Model):
    __tablename__ = 'users'
    username = db.Column('username', db.String(50), primary_key=True)
    password = db.Column('password', db.String(250), unique=False, nullable=False)
    address = db.Column('address', db.String(250), nullable=True)
    email = db.Column('email', db.String(250), nullable=False)
    rating = db.Column('rating', db.DECIMAL(10, 2), nullable=False)  # Rating starts at -1. Real ratings are from 0-5


if __name__ == '__main__':
    app.run(debug=True)
