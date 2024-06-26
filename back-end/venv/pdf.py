from flask import Flask, jsonify, request
from dotenv import load_dotenv
load_dotenv()
import os
import openai
import pdfplumber
import glob2
import textwrap
import PyPDF2


def open_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as infile:
            return infile.read()
    except Exception as e:
        print(f"An error occurred while opening the file '{filepath}': {str(e)}")
        return None  # Return None if an error occurs

def gpt_3(prompt):

    messages = [
            {"role": "system", "content": "Act as a text summarizer, extracting information from a long document"},
            {"role": "user", "content": prompt},
    ]

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0.7,
        frequency_penalty=0,
        presence_penalty=0,
    )
    text = response['choices'][0]['message']['content']
    return text


def pdf_summary():
    file = request.files['pdf_file']
    filename = "PDFs/" + file.filename
    file.save(filename)

    openai.api_key = os.getenv('API_KEY')

    with open(filename, 'rb') as pdf_file_obj:
        pdf_reader = PyPDF2.PdfReader(pdf_file_obj)
        num_pages = len(pdf_reader.pages)

        extracted_text = ""
        for page_num in range(num_pages):
            page = pdf_reader.pages[page_num]
            extracted_text += page.extract_text()

    chunks = textwrap.wrap(extracted_text, 4000)

    result = []
    for chunk in chunks:
        prompt = open_file('pdfprompt.txt').replace('<<SUMMARY>>', chunk)
        prompt = prompt.encode(encoding='ASCII', errors='ignore').decode()
        
        summary = gpt_3(prompt)
        result.append(summary)
        
        # Print the summary generated by the GPT-3 model

        summary_content = '\n\n'.join(result)
    return jsonify(
        {
            "text": "Remember this information extracted from a pdf: " + extracted_text,
            "summary": summary_content,
        }
    )
