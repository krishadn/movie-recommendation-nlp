from flask import Flask, jsonify, request
from flask_cors import CORS
from process_reco import recommend_movies


app = Flask(__name__)
CORS(app)

@app.route('/process', methods=['POST'])
def process():
    data = request.get_json()
    
    result = {'movies': recommend_movies(data['text'])}
    
    return jsonify(result), 200



if __name__ == '__main__':
   app.run(port=5000, debug=True)