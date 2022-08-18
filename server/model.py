from db import db

class Img(db.Model):
    __tablename__ = "image"
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.Text, nullable=False)
    mineType = db.Column(db.Text, nullable=False)