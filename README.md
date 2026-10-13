# Elonepedia
Static site (index.html, styles.css, app.js). Loads `data/faqs.json`; falls back to `data.js` (file://). Regenerate data.js after editing JSON:
`python3 -c "import json;open('data.js','w').write('window.ELONEPEDIA_DATA='+json.dumps(json.load(open('data/faqs.json')))+';')"`
Serve: `python3 -m http.server 8080`.

## Schema (`data/faqs.json`)
Top: `title, version, last_updated (ISO), faqs[], archive[]` (archive = retired entries, same shape plus `retired_date`, `retired_reason`).
Entry: `id` (q###, never reused), `question`, `category`, `tags[]`, `answer_summary` (paraphrase), `answer_type` (summary|quote), `quotes[]` {text, source, url, timestamp} — ONLY verbatim text verified against a transcript, `sources[]` {title, outlet, date, url|null, type}, `frequency` (count of distinct appearances where asked), `first_asked`, `last_updated`, `verification` (source_linked|needs_transcript_check|verified), `updates[]` append-only {date, summary, source, type: addition|clarification|position_change}.
`data/changelog.json`: append-only [{date, action, details}].
