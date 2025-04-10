from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow CORS for Node.js

classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

@app.route("/classify", methods=["POST"])
def classify():
    data = request.get_json()
    text = data.get("text", "")
    labels = ["selected", "rejected", "other"]

    result = classifier(text, labels)
    top_label = result["labels"][0]
    score = result["scores"][0]

    return jsonify({"label": top_label, "confidence": score})

if __name__ == "__main__":
    app.run(port=5000)
