from flask import Flask, send_from_directory
import os
from flask_cors import CORS
import pdf

app = Flask(__name__, static_folder='../../front-end/dist')  # Assuming your React app is built into a 'dist' directory
cors = CORS(app, origins='*')

@app.route("/PDF", methods=['POST'])
def pdf_summary():
    return pdf.pdf_summary()

# Serve the React app
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(debug=True, port=8080)