from flask import Flask, jsonify, request
from flask_cors import CORS
import pdf

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route("/PDF", methods=['POST'])
def pdf_summary():
    return pdf.pdf_summary()
   
# @app.route("/youtube", methods=['POST'])
# def 
if __name__ == "__main__":
    app.run(debug=True, port=8080)