# Front Row Focus

A phone-first interactive piece. You sit down with your headphones, the show fills the screen, and you try to hold one instrument in the mix with a lens on a rope. On Hard the ring pushes you off. Give up and the show shrinks into a Walkman on your desk, where thoughts keep taking the ring. It never says what it's about until the end.

One HTML file, SVG and CSS only, Google Fonts allowed. `index.html` is the whole app.

## Demo

https://butch-ab.github.io/adhd-focus-app/

## Run

Any static server works. Stems (see `audio/README.md`) only load over http.

```
npx serve .
```

## Publish as an Artifact

```
scripts/artifact.sh      # writes dist/artifact.html, the fragment the Artifact tool takes
```

## Tests

Headless Playwright bots that drive the flows and take screenshots. They expect a server on :3000.

```
npm install
npx playwright install chromium
npx serve . -l 3000 &
node tests/flow.mjs
```

## Tuning

Everything tunable is at the top of the main script in `index.html`: hold times, rope presets per level, the magnet, the thought phases, and the flood grace window. The audio engine is the script just above it.

## Design

`design/handoff/` is the Claude Design handoff this build follows: boards, copy, motion, and tokens.
