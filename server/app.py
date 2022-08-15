from flask import flask

app = Flask(__name__)

@app.route('/ping')
def ping():
    return ("Hello World");

if __name__ == '__main__':
    app.run()