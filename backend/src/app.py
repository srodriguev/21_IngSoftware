from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS

from bson import ObjectId

# Instantiation
app = Flask(__name__)
# app.config['MONGO_URI'] = 'mongodb://localhost/pythonreact'
app.config['MONGO_URI'] = 'mongodb+srv://sara:Sara012@cluster1.vvhuq.mongodb.net/pythonreact?retryWrites=true&w=majority'
mongo = PyMongo(app)

# Settings
CORS(app)

# Database
db1 = mongo.db.reactUsers
db2 = mongo.db.reactPolls

# Routes
@app.route('/users', methods=['POST'])
def createUser():
  print(request.json)
  id = db1.insert({
    'name': request.json['name'],
    'email': request.json['email'],
    'password': request.json['password']
  })
  return jsonify(str(ObjectId(id)))


@app.route('/users', methods=['GET'])
def getUsers():
    users = []
    for doc in db1.find():
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'email': doc['email'],
            'password': doc['password']
        })
    return jsonify(users)

@app.route('/users/<id>', methods=['GET'])
def getUser(id):
  user = db1.find_one({'_id': ObjectId(id)})
  print(user)
  return jsonify({
      '_id': str(ObjectId(user['_id'])),
      'name': user['name'],
      'email': user['email'],
      'password': user['password']
  })


@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
  db1.delete_one({'_id': ObjectId(id)})
  return jsonify({'message': 'User Deleted'})

@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
  print(request.json)
  db1.update_one({'_id': ObjectId(id)}, {"$set": {
    'name': request.json['name'],
    'email': request.json['email'],
    'password': request.json['password']
  }})
  return jsonify({'message': 'User Updated'})


# separador

# Routes
@app.route('/board', methods=['POST'])
def createPoll():
  print(request.json)
  id = db2.insert({
    'name': request.json['name'],
    'targetPublic': request.json['targetPublic'],
    'questions': request.json['questions'],
    'finishDate': request.json['finishDate']
  })
  return jsonify(str(ObjectId(id)))


@app.route('/board', methods=['GET'])
def getPolls():
    polls = []
    for doc in db2.find():
        polls.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'targetPublic': doc['targetPublic'],
            'questions': doc['questions'],
            'finishDate': doc['finishDate']
        })
    return jsonify(polls)

@app.route('/board/<id>', methods=['GET'])
def getPoll(id):
  poll = db2.find_one({'_id': ObjectId(id)})
  print(poll)
  return jsonify({
      '_id': str(ObjectId(poll['_id'])),
      'name': poll['name'],
      'targetPublic': poll['targetPublic'],
      'questions': poll['questions'],
      'finishDate': poll['finishDate']
  })


@app.route('/board/<id>', methods=['DELETE'])
def deletePoll(id):
  db2.delete_one({'_id': ObjectId(id)})
  return jsonify({'message': 'Poll Deleted'})

@app.route('/board/<id>', methods=['PUT'])
def updatePoll(id):
  print(request.json)
  db2.update_one({'_id': ObjectId(id)}, {"$set": {
    'name': request.json['name'],
    'targetPublic': request.json['targetPublic'],
    'questions': request.json['questions'],
    'finishDate': request.json['finishDate']
  }})
  return jsonify({'message': 'Poll Updated'})

if __name__ == "__main__":
    app.run(debug=True)
