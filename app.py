import os

from flask import Flask, jsonify, render_template, url_for
app = Flask(__name__)


@app.route("/map")
def map():
    return render_template('Map/index.html')


@app.route("/chart")
def chart():
    return render_template('Chart.js/index.html')

@app.route("/affordable")
def affordable():
    return render_template('Affordability Data/index/index.html')


if __name__ == "__main__":
    app.run(debug=True)
