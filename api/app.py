from flask import Flask, jsonify
from categories import categories
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/categories')
def getProducts():
    return jsonify(categories)

if __name__ == '__main__':
    app.run(debug=True, port = 5000)

