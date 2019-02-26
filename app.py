from flask import Flask, jsonify, render_template
app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/line")
def test():
    data = ("foreclosure_table.csv")

    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
