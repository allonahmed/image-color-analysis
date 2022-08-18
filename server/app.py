import os
from flask import *
from flask_cors import CORS

from db import db_init, db
from model import Img

file_path = os.path.abspath(os.getcwd())+"\database.db"

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+file_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db_init(app)

class ContactModel(db.Model):
    __tablename__ = "table"
 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True)
 
    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"{self.name}"

@app.before_first_request
def create_table():
    db.create_all()

# testing route to upload images from client
@app.route('/upload-image', methods=['POST'])
def upload_image():
    # image = json.loads(request.data);
    res = json.loads(request.data)
    print(res)
    return res

@app.route('/data')
def retrieveDataList():
    return jsonify([*map(contact_serializer, ContactModel.query.all())])

@app.route('/data/create' , methods = ['GET','POST'])
def create():
    if request.method == 'GET':
        return jsonify({"success": True, "message": "this is the create endpoint"}), 201
 
    if request.method == 'POST':
        request_data = json.loads(request.data)
        name = request_data['name']
        contact = ContactModel(name=name)
        db.session.add(contact)
        db.session.commit()
        return jsonify({"success": True, "message": "contact added successfully"}), 201

def contact_serializer(contact):
    return {'name': contact.name}

@app.route('/data/delete', methods=['GET','POST'])
def delete():
    request_data = json.loads(request.data)
    name = request_data['name']
    contact = ContactModel.query.filter_by(name=name).first()
    if request.method == 'POST':
        if contact:
            db.session.delete(contact)
            db.session.commit()
            return jsonify({"success": True, "message": "Contact deleted successfully"}), 201
        abort(404)
 
    return jsonify({"success": True}), 201




@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8091)