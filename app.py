from pathlib import Path

from flask import Flask, abort, jsonify, render_template, send_from_directory


PROJECT_DIR = Path(__file__).resolve().parent
PAGES = {"index", "landing", "login", "maharaj", "story", "quiz"}
ASSET_EXTENSIONS = {".css", ".js", ".jpg", ".jpeg", ".png", ".svg", ".mp3"}

app = Flask(
    __name__,
    template_folder=str(PROJECT_DIR),
    static_folder=None,
)


@app.get("/")
def home():
    return render_template("index.html")


@app.get("/<page>.html")
def page(page: str):
    if page not in PAGES:
        abort(404)
    return render_template(f"{page}.html")


@app.get("/health")
def health():
    return jsonify(status="ok")


@app.get("/<path:asset>")
def public_asset(asset: str):
    if Path(asset).suffix.lower() not in ASSET_EXTENSIONS:
        abort(404)
    return send_from_directory(PROJECT_DIR, asset)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)
