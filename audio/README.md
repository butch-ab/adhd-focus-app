# Stems

Drop five files here, in `stems/`, and the page uses them instead of the synthesized band:

```
audio/stems/drums.mp3
audio/stems/bass.mp3
audio/stems/guitar.mp3
audio/stems/keys.mp3
audio/stems/voice.mp3
```

Rules:
- Same length, same start point, all from one song. They loop together, so trim to a clean bar boundary.
- 30 to 60 seconds is plenty. MP3 at 128kbps keeps each under ~1MB.
- They only load over http(s). Opened as a file, or published as an Artifact, the synth plays instead.

For the Artifact, external fetches are blocked. Inline them as data URIs in `STEM_URLS` at the top of the audio script,
and keep the page under 16MB.

Where to get stems: Suno (generate, then stem export), or Demucs on a track you have rights to:

```
pip install demucs
demucs -n htdemucs_6s song.mp3
```
