# Swarajya Forts

A child-friendly guide to the forts of Maharashtra and the life and legacy of Chhatrapati Shivaji Maharaj.

**Live website:** [naikchinmay2005-byte.github.io/swarajya-forts](https://naikchinmay2005-byte.github.io/swarajya-forts/)

## Features

- Explore an archive of 23 Maharashtra forts, with a map, filters, photographs, and historical details.
- Read a biography of Shivaji Maharaj and explore an interactive map of important places in his life.
- Listen to chapter-selected narration in English or Marathi, with captions and a detailed, chapter-by-chapter transcript.
- Take a 10-question fort history quiz.
- Use the responsive pages on desktop or mobile.

## Pages

- `index.html` — fort map and archive
- `maharaj.html` — biography, timeline, and life journey
- `story.html` — bilingual story narration and transcript
- `quiz.html` — interactive fort quiz
- `landing.html` and `login.html` — introductory and archive entry pages

## Run locally with Python

The project includes a small Flask application that serves the site pages and their assets. Python 3.9 or later is recommended.

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python app.py
```

Open [http://127.0.0.1:5000](http://127.0.0.1:5000). A health check is available at [http://127.0.0.1:5000/health](http://127.0.0.1:5000/health). The map tiles and web fonts load from external services and require an internet connection.

The browser still uses JavaScript for interactive features such as the map, quiz, page transitions, and narration controls; Flask serves the pages and static assets.

## Deploy

The current public preview is published with GitHub Pages from the repository’s `main` branch. GitHub Pages serves only the static HTML/CSS/JavaScript version and cannot run Flask. The Python server is for local use unless deployed separately to a Python-capable host.

## Project structure

```text
.
├── audio/              # English and Marathi narration clips
├── images/             # Fort and Shivaji Maharaj images
├── app.py              # Flask development server
├── requirements.txt    # Python dependencies
├── index.html
├── maharaj.html
├── story.html
├── quiz.html
├── style.css
└── *.js                # Page data and interactive features
```
