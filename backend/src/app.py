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
cors = CORS(app)

# Database
_dbUsers = mongo.db.reactUsers
_dbPolls = mongo.db.reactPolls
_dbAnswers = mongo.db.reactAnswers
_dbOpinions = mongo.db.reactOpinions


# Routes
@app.route('/users', methods=['POST'])
def createUser():
  print(request.json)
  id = _dbUsers.insert({
    'name': request.json['name'],
    'email': request.json['email'],
    'password': request.json['password'],
    'reputation': request.json['reputation'],
    'pollNumber': request.json['pollNumber'],
    'answerNumber': request.json['answerNumber']
  })
  return jsonify(str(ObjectId(id)))

@app.route('/users', methods=['GET'])
def getUsers():
    users = []
    for doc in _dbUsers.find():
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'email': doc['email'],
            'password': doc['password'],
            'reputation': doc['reputation'],
            'pollNumber': doc['pollNumber'],
            'answerNumber':doc['answerNumber']

        })
    return jsonify(users)

@app.route('/users/<id>', methods=['GET'])
def getUser(id):
  user = _dbUsers.find_one({'_id': ObjectId(id)})
  print(user)
  return jsonify({
      '_id': str(ObjectId(user['_id'])),
      'name': user['name'],
      'email': user['email'],
      'password': user['password'],
      'reputation': user['reputation'],
      'pollNumber': user['pollNumber'],
      'answerNumber':user['answerNumber']
  })


@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
  _dbUsers.delete_one({'_id': ObjectId(id)})
  return jsonify({'message': 'User Deleted'})

@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
  print(request.json)
  _dbUsers.update_one({'_id': ObjectId(id)}, {"$set": {
    'name': request.json['name'],
    'email': request.json['email'],
    'password': request.json['password'],
    'reputation': request.json['reputation'],
    'pollNumber': request.json['pollNumber'],
    'answerNumber':request.json['answerNumber']
  }})
  return jsonify({'message': 'User Updated'})


# separador: inicio polls

# Routes
@app.route('/board', methods=['POST'])
def createPoll():
  print(request.json)
  id = _dbPolls.insert({
    'pollName': request.json['pollName'],
    'targetPublic': request.json['targetPublic'],
    'questions': request.json['questions'],
    'finishDate': request.json['finishDate']
  })
  return jsonify(str(ObjectId(id)))


@app.route('/board', methods=['GET'])
def getPolls():
    polls = []
    for doc in _dbPolls.find():
        polls.append({
            '_id': str(ObjectId(doc['_id'])),
            'pollName': doc['pollName'],
            'targetPublic': doc['targetPublic'],
            'questions': doc['questions'],
            'finishDate': doc['finishDate']
        })
    return jsonify(polls)

@app.route('/board/<id>', methods=['GET'])
def getPoll(id):
  poll = _dbPolls.find_one({'_id': ObjectId(id)})
  print(poll)
  return jsonify({
      '_id': str(ObjectId(poll['_id'])),
      'pollName': poll['pollName'],
      'targetPublic': poll['targetPublic'],
      'questions': poll['questions'],
      'finishDate': poll['finishDate']
  })


@app.route('/board/<id>', methods=['DELETE'])
def deletePoll(id):
  _dbPolls.delete_one({'_id': ObjectId(id)})
  return jsonify({'message': 'Poll Deleted'})

@app.route('/board/<id>', methods=['PUT'])
def updatePoll(id):
  print(request.json)
  _dbPolls.update_one({'_id': ObjectId(id)}, {"$set": {
    'pollName': request.json['pollName'],
    'targetPublic': request.json['targetPublic'],
    'questions': request.json['questions'],
    'finishDate': request.json['finishDate']
  }})
  return jsonify({'message': 'Poll Updated'})


  # separador - inicio answers

# Routes
@app.route('/answers/', methods=['POST'])
def createAnswer():
  print(request.json)
  id = _dbAnswers.insert({
    'pollID': request.json['pollID'],
    'contestantName': request.json['contestantName'],
    'pollAnswers': request.json['pollAnswers'],
    'answerDate': request.json['answerDate'],
    'notes': request.json['notes']
  })
  return jsonify(str(ObjectId(id)))


@app.route('/answers/', methods=['GET'])
def getAnswers():
    answers = []
    for doc in _dbAnswers.find():
        answers.append({
            '_id': str(ObjectId(doc['_id'])),
            'pollID': doc['pollID'],
            'contestantName': doc['contestantName'],
            'pollAnswers': doc['pollAnswers'],
            'answerDate': doc['answerDate'],
            'notes': doc['notes']
        })
    return jsonify(answers)

@app.route('/answers/<id>', methods=['GET'])
def getAnswer(id):
  answer = _dbAnswers.find_one({'_id': ObjectId(id)})
  print(answer)
  return jsonify({
      '_id': str(ObjectId(answer['_id'])),
      'pollID': answer['pollID'],
      'contestantName': answer['contestantName'],
      'pollAnswers': answer['pollAnswers'],
      'answerDate': answer['answerDate'],
      'notes': answer['notes']
  })


@app.route('/answers/<id>', methods=['DELETE'])
def deleteAnswer(id):
  _dbAnswers.delete_one({'_id': ObjectId(id)})
  return jsonify({'message': 'Answer Deleted'})


@app.route('/answers/<id>', methods=['PUT'])
def updateAnswer(id):
  print(request.json)
  _dbAnswers.update_one({'_id': ObjectId(id)}, {"$set": {
    'pollID': request.json['pollID'],
    'contestantName': request.json['contestantName'],
    'pollAnswers': request.json['pollAnswers'],
    'answerDate': ['answerDate'],
    'notes': request.json['notes']
  }})
  return jsonify({'message': 'Answer Updated'})



# Separador Contact Info

# Routes
@app.route('/Contact/', methods=['POST'])
def createOpinion():
  print(request.json)
  id = _dbOpinions.insert({
    'name': request.json['name'],
    'email': request.json['email'],
    'rating': request.json['rating'],
    'opinion': request.json['opinion']
  })
  return jsonify(str(ObjectId(id)))


if __name__ == "__main__":
    app.run(debug=True)
