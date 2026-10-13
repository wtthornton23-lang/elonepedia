# Daily update procedure (every 24h)
1. Discover: search web/YouTube/X/news for Elon Musk interviews, podcasts, press events, earnings calls, X Spaces from the last 24–48h. Skip already-logged URLs (check changelog).
2. Transcripts: prefer official transcripts/captions (YouTube auto-captions, outlet transcripts); else reliable reporting. Record timestamps.
3. Extract each question asked + his answer. Match to existing entries by topic/tags/semantic similarity.
4. Existing question: add source to `sources`, frequency+1. If new info → append `updates` (addition/clarification) and extend summary. Only rewrite `answer_summary` when he fundamentally changes position → `position_change` update, keeping the old summary text in that update.
5. New question: create entry (new id) when it recurs (≥2 appearances) or is of major importance. Keep ~50 active: move lowest-frequency/stalest entries to `archive` with retired_date/reason (never delete).
6. Quotes: add verbatim only if checked against transcript/video; otherwise paraphrase.
7. Bump `last_updated`, regenerate data.js, append to changelog.json (incl. "no new appearances" runs).

## Publishing (after every run)
- Repo: https://github.com/wtthornton23-lang/elonepedia (public), branch `main`. Live site: https://wtthornton23-lang.github.io/elonepedia/
- Method: after regenerating `data.js` and appending `data/changelog.json`, push changed files (`data/faqs.json`, `data/changelog.json`, `data.js`, and any edited `index.html`/`app.js`/`styles.css`/docs) in one commit with the connected GitHub MCP `push_files` (owner `wtthornton23-lang`, repo `elonepedia`, branch `main`, message `Daily update YYYY-MM-DD: <summary>`). Skip the push if nothing changed.
- The `.github/workflows/pages.yml` workflow redeploys GitHub Pages on each push to `main`; check the run with `actions_list` and confirm the live URL returns 200.
- Never push `tx/` (raw third-party transcripts) or credentials.
