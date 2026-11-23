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

## Run locally

This is a static website and does not require a build step or package installation. Serve the project folder with any local static HTTP server, then open its `index.html`. For example, with Python installed:

```powershell
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in a browser. The map tiles and web fonts load from external services and require an internet connection.

## Deploy

The site is published with GitHub Pages from the repository’s `main` branch. After pushing changes, GitHub Actions builds and publishes the updated static site.

## Project structure

```text
.
├── audio/              # English and Marathi narration clips
├── images/             # Fort and Shivaji Maharaj images
├── index.html
├── maharaj.html
├── story.html
├── quiz.html
├── style.css
└── *.js                # Page data and interactive features
```
