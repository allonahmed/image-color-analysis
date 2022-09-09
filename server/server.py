import os
import sys
sys.path.insert(0, '/Users/allon/pwa/image-analysis/server/utils')
from colors import get_color_pallete, ct_pallete_colors
from flask import Flask, flash, request, redirect, url_for, session, jsonify
from werkzeug.utils import secure_filename # secure files
from flask_cors import CORS, cross_origin # prevent cors policy blocks
import logging # useful for logging info

#config for logging server informations
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('HELLO WORLD')

#folder path and file types we want to allow
UPLOAD_FOLDER = './assets/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'PNG', 'webp'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

#file validation
def allowed_file(filename):
    return '.' in filename and \
       filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_colors(filename):
    img =  Image.open(filename)
    return img.convert('RGB').getcolors()
    

@app.route('/upload-image', methods=['POST'])
def fileUpload():
    target=UPLOAD_FOLDER
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload`")
    file = request.files['file'] 
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        logger.info(filename)
        destination="/".join([target, filename])
        file.save(destination)
        logger.info(file)
        # session['uploadFilePath']=destination
        response = ct_pallete_colors('./assets/'+ filename)
        return jsonify(response)
    return ''

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,host="0.0.0.0", port=8092, use_reloader=False)

flask_cors.CORS(app, expose_headers='Authorization')