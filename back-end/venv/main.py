from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import openai
import pdfplumber
import glob2
import textwrap
app = Flask(__name__)
cors = CORS(app, origins='*')

openai.api_key = os.getenv("OPENAI_API_KEY") 

def save_file(filepath, content):
    try:
        with open(filepath, 'w', encoding='utf-8') as outfile:
            outfile.write(content)
    except Exception as e:
        print(f"An error occurred while saving the file '{filepath}': {str(e)}")
        return False  # Return False if an error occurs
    return True  # Return True if the file was saved successfully

def convert_pdf2txt(src_dir, dest_dir):
    files = os.listdir(src_dir)
    files = [i for i in files if '.pdf' in i]
    for file in files:
        try:
            with pdfplumber.open(src_dir+file) as pdf:
                output = ''
                for page in pdf.pages:
                    output += page.extract_text()
                    output += '\n\nNEW PAGE\n\n'
                    print('Destination directory File Path:', dest_dir+file.replace('.pdf','.txt'))
                save_file(dest_dir+file.replace('.pdf','.txt'), output.strip())
        except Exception as oops:
            print("An error occurred:", oops, file)

@app.route("/api/users", methods=['GET'])
def users():
    return jsonify(
        {
            "users": ['zac',
                      'cool',
                      'henry'
                      ]
        }
    )

@app.route("/PDF", methods=['POST'])
def process_pdf():
    file = request.files('file')

    #Upload this into a database instead of local once done.
    pdf_dir = '/PDF'
    with open(os.path.join(pdf_dir, file.filename), 'wb') as f:
            f.write(file.read())
    convert_pdf2txt('PDFs/', 'textPDFs/')

    pathfolder = 'textPDFs/'
    files = glob2.glob(pathfolder + '*.txt')

    alltext = ""

    for file in files:
            with open(file, 'r', encoding='utf-8') as infile:
                alltext += infile.read()

     # Split the contents into chunks
    chunks = textwrap.wrap(alltext, 4000)

if __name__ == "__main__":
    app.run(debug=True, port=8080)