import os

from flask import Flask, jsonify, render_template
app = Flask(__name__)


@app.route("/")
def home():
    return render_template('homepage.html')

@app.route("/map")
def map():
    return render_template('map.html')

@app.route("/chartjs")
def chartjs():
    return render_template('chartjs.html')

@app.route("/affordable-cities")
def affordability():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(port=5000)
