# Handoff: Front Row Focus

## Overview
A single-page, phone-first interactive piece. The player drags a round "focus lens" on a rope onto a named instrument at a concert and holds it. On Hard the target repels the lens; after ~9s the concert shrinks into a Walkman on a desk and the piece becomes about holding the Walkman while intrusive thoughts steal the ring. The condition is never named. Meaning arrives through mechanics.

This package covers **visual identity, screens, copy, and motion**. The mechanics (drag, rope, magnet, ring fill, zoom) are already built — skin them, don't rebuild them.

## About the Design Files
`Front Row Focus.dc.html` is a **design reference built in HTML** — static artboards showing intended look, copy, and motion notes. It is not production code. Recreate the visuals in the existing single-file HTML/SVG/CSS piece (constraint from the brief: one HTML file, SVG + CSS only, no raster, Google Fonts allowed). The SVG scenery in the boards (band silhouettes, room) is primitive-shape reference and can be lifted directly.

## Fidelity
**High-fidelity.** Colours, type, sizes, radii, copy and durations are final. Match them exactly.

## Boards (in the HTML file, ids 1a–1i)
- **1a** Concert at rest — prompt "THE DRUMS", hint, lens home, Easy active.
- **1b** Concert, Hard — lens shoved sideways in the red field, red taut rope, timer.
- **1c** Zoom-out midway — concert at 0.52 scale over the Walkman, room at 55%.
- **1d** Room, nag title, Walkman target (dashed amber ring).
- **1e** Room, thought card holding the stolen ring.
- **1f** Held (locked) panel — concert and room.
- **1g** Easy | Hard toggle states.
- **1h** Ending.
- **1i** Tokens.

## Shared layout (400×860 reference, scales to any portrait viewport; desktop = same layout centred, max-width 480)
- Background: `#0E0A16`. Ink: `#F3EEE6`.
- Toggle: absolute, top 22px, centred. Pill: `rgba(243,238,230,.08)` bg, 1px `rgba(243,238,230,.14)` border, radius 999, padding 3px. Each half: padding 9px 18px, radius 999, Public Sans 500 12px, letter-spacing .06em. Active Easy: bg `#F2A93B`, text `#0E0A16`. Active Hard: bg `#E5484D`, text `#F3EEE6`. Inactive: text `rgba(243,238,230,.6)`. Pressed: extra `0 0 0 3px` halo in the active colour, 120ms. In the room the whole toggle is at opacity .4 but still live. Total height 44px; both halves are hit targets.
- Title block: absolute, top 92px, left/right 28px. Title: Big Shoulders Display 800, uppercase, line-height .92, letter-spacing .005em, `text-wrap: pretty`. 64px for one-line titles ("THE DRUMS"), 56px for multi-line ("CAN YOU AT LEAST FOCUS ON THE MUSIC?"). Title turns `#3FD1C4` when held.
- Hint: 14px below title, Public Sans 400 15px/1.45, `rgba(243,238,230,.66)`. Swaps with a 160ms fade.
- Lens: 88×88 circle, 3px border in the state colour (amber / red / teal), radial fill `circle at 35% 30%, rgba(243,238,230,.22), rgba(<state>,.08) 60%, rgba(<state>,.14)`, shadow `0 0 0 6px rgba(<state>,.12), 0 10px 30px rgba(<state>,.25)`. Idle breathe: scale 1→1.035, 2.4s ease-in-out infinite. Home position: centred, bottom edge ~86px above screen bottom.
- Rope: 2px `rgba(243,238,230,.5)` quadratic curve from bottom-centre to lens bottom, with a 6px `rgba(242,169,59,.35)` dashed (1 9) overlay when slack. Taut + `#E5484D` at .85 on Hard within the field. Teal at .5 when held.
- Target ring: at rest (room only) dashed 4 8, 2px `#F2A93B` at .5, r 56. Filling: teal arc. Held: 4px `#3FD1C4` solid + 1px outer halo at .35, r +12.

## Screens

### Concert (1a, 1b, 1f-left)
- Stage bg vertical gradient `#160F24 → #0E0A16 (60%) → #07050C`. Amber haze: radial ellipse centred (200,430) 260×200, `#F2A93B` .28→0.
- Three spot cones from off-top to stage lip y=510, `#F2A93B` .55→0; outer cones at .7 opacity.
- Stage floor y 500–544, gradient `#2A1E3A → #140E1E`; 6px `#0A0710` lip.
- Five silhouettes in `#1A1327` (guitar, bass, drums centre-back, keys, vocal). Drums target centre ≈ (200,470).
- Crowd: `#06040A` ellipses hugging left/right edges and bottom, leaving a centre gap.
- **Hard field (1b):** concentric red circles at r 46 (3px, dash 16 10), 80 (1px, dash 3 9, .45), 120 (1px, dash 2 12, .25). Lens displaced sideways, ±2px shake at 12Hz. Three short red motion streaks trailing the lens. Small red timer `0:07` bottom-centre (13px, `rgba(229,72,77,.8)`) appears at 7s.
- **Held (1f):** everything but the drums at 35% opacity, outer cones at .2, centre cone full.

### Zoom-out midway (1c)
Room SVG at opacity .55 beneath; concert frame scaled .52, radius 24, shadow `0 20px 60px rgba(0,0,0,.6)`, centred over the Walkman window (≈200,625). Title at opacity .18. No copy.

### Room (1d, 1e, 1f-right, 1h)
- Wall gradient `#120D1C → #0B0812`. Lamp glow radial at (320,470) 230×260, `#F2A93B` .5→0.
- Window x30 y96 132×172 r6, fill `#151A2A`, 3px `#28213A` frame + cross bars. Rain: 1.5px `#3A4560` .7 slanted lines, translateY 60px per 1.8s loop.
- Clock (332,130) r26, fill `#130E1C`, stroke `#2C2438`, hands `#8A8194`.
- Lamp shade trapezoid `#E3922C` (300,360)-(360,360)-(378,412)-(282,412); light cone below `#F2A93B` .35→0; stand 6px `#1A1322`.
- Desk from y560: gradient `#3A2A3A → #241A2C (8%) → #120C18`.
- Headphones left (arc stroke `#3A3148` 7px, cups `#2A2236`). Cat right, `#09070D` silhouette. **Scenery only — not targets.**
- Walkman: x125 y580 150×100 r10, fill `#2B2536`, 2px `#3C3450` (teal when held). Window x145 y598 110×54 r6 `#130D1C` with amber haze; reels r12 stroke `#6A6180` 3px; three buttons 22×10 `#3C3450`. Target centre (200,630).
- **Thought card (1e):** 290px wide, padding 14px 16px 14px 14px, bg `#ECE8EE`, radius 16, shadow `0 18px 40px rgba(0,0,0,.55), inset 0 2px 0 rgba(255,255,255,.4)`, ink `#1B1523`. Leading disc 48px `#DCD6E0` carrying the teal ring (4px stroke). Meta "now": Public Sans 11px `#6B6478`, 6px above body. Body: Public Sans 500 16px/1.3. Spawns anywhere except under the thumb, title, or Walkman.
- **Held panel (1f):** left/right/bottom 16px, padding 20px 22px 22px, bg `rgba(14,10,22,.92)`, 1px `rgba(63,209,196,.45)`, radius 20, backdrop-blur 8px. Label "HELD": Public Sans 500 11px, tracking .14em, `#3FD1C4`. Body 16px/1.45 `#F3EEE6`. Concert variant adds italic 13px `rgba(243,238,230,.5)` line. Room variant adds pill button: padding 16px 22px, radius 999, bg `#3FD1C4`, text `#0E0A16` Public Sans 500 15px.
- **Ending (1h):** room at opacity .35. Text block top 300px, gutter 28: title 44px/.95 uppercase; body Public Sans 400 17px/1.5 `rgba(243,238,230,.78)`, 12px between lines. "AGAIN" lens 88px, 3px `#F2A93B` border, bg `rgba(242,169,59,.1)`, label 12px tracking .08em amber, bottom 48px.

## Copy (final)
Concert
- Title: `THE DRUMS` (also `THE BASS`, `THE KEYS`, `THE VOICE`, `THE GUITAR`)
- Hint, at rest: `Pull the lens up. Keep it there.`
- Hint, Hard at 4s: `Closer is worse.`
- Held label: `HELD` · body: `Everything else drops back. Kick, snare, the hi-hat ticking. The rest of the room turns into a hum.` · italic: `Let go and it all comes back.`

Room
- Title: `CAN YOU AT LEAST FOCUS ON THE MUSIC?`
- Hint: `The Walkman. Hold it.`
- Hint while a thought has the ring: `Go get it back.`
- Thoughts (meta `now`): `Work was hard today.` / `I should send those documents.` / `Don't forget the doctor's appointment tomorrow.` / `Did I lock the door?` / `What was that noise?` / `You never replied to her.`
- Held: `HELD` · `The tape's already running.` · button `Put the headphones on`

Ending
- Title: `THAT WAS ONE SONG.`
- Line 1 (made it): `It took {n} tries to hear it.` — n is the real count. (Didn't): `You didn't get to hear it.`
- Line 2: `Some nights it takes more. Some nights the tape runs out first.`
- Line 3: `The music was good, either way.`
- Button: `AGAIN`

Do not use "focus" anywhere except the nag title. Never name the condition. No tutorial overlays.

## Interactions & Motion
- **Easing:** UI `cubic-bezier(.2,.8,.2,1)`; zoom `cubic-bezier(.6,0,.2,1)`.
- **Toggle:** thumb slides 220ms; colour crossfades. Switching mid-drag changes rope tension next frame, no reset. Haptic 15ms.
- **Ring appear (concert):** fades in 200ms as thin amber trace when lens within 120px; turns teal as it fills.
- **Hard magnet:** displacement ∝ 1/d², applied sideways as 80ms impulse then 320ms spring settle. Rope goes taut and red over 400ms. Ring dashes rotate slowly; never fills past 20%. Haptic ticks 10ms→30ms as distance shrinks. At 9s → zoom-out.
- **Zoom-out:** 1.6s. 0–400ms title + toggle fade. 0–1200ms concert scales 1→0.24 into the cassette window, corners 0→12px, lens and rope ride inside. 600–1600ms room fades in from edges (radial mask), lamp last. Concert keeps playing in the window at ~40%. Haptic one 40ms.
- **Nag title:** cuts in at 120ms, no ease.
- **Thought arrives:** 0.9–1.4s into a hold. Card scales .92→1 with 6% overshoot, 240ms, shadow grows. Ring travels Walkman→disc straight line 280ms ease-out; progress resets to 0. Haptic double 15ms. Music dulls while ring is away.
- **Thought pops:** holding the disc fills ring in 600ms; card scales to .85 and fades 160ms; ring snaps back 200ms. Haptic 25ms.
- **Lock:** ring completes → 80ms white-stroke flash → non-targets dim to 35% over 400ms → title recolours teal → panel rises 24px, fades in 320ms. Haptic 50ms heavy.
- **Put the headphones on:** runs the zoom in reverse, 1.2s, lands on stage in Easy.
- **Ending:** after Walkman lock or 3rd grab-back on Hard. Room dims to 35% over 1.2s; lines fade in 400ms each, 600ms apart; AGAIN rises last. No target ring on this screen.
- **Ambient:** rain 60px/1.8s; clock second hand ticks; cat tail moves once per ~20s. None are targets.

## Sound (v1 has none — design intent)
Concert: full mix, crowd close. Hard: pitch wobble on target, crowd swells. Zoom: PA collapses into tape hiss through a small speaker; rain under. Room: show thin and far through the window, rain, a fridge. Thought: notification-shaped click, no tone. Held: everything but target −12dB, low-pass 800Hz; target dry and forward. Ending: tape clicks off; rain only.

## State
`difficulty` (easy|hard), `scene` (concert|zooming|room|ending), `target` (instrument|walkman|thought), `lensPos`, `ringProgress` 0–1, `held` bool, `hardTimer` ms, `activeThought` {text, pos} | null, `grabBacks` int, `tries` int.

## Design Tokens
Colours: Night `#0E0A16` · Silhouette `#1A1327` · Follow-spot `#F2A93B` · Held `#3FD1C4` · Hard `#E5484D` · Thought surface `#ECE8EE`, ink `#1B1523`, meta `#6B6478` · Text `#F3EEE6` (100% titles/panels, 66% hints, 50% meta). Amber is the only warm colour and appears only as spot, lamp, and lens.
Type: Big Shoulders Display 800 — 64/.92, 56/.92, 44/.95, uppercase. Public Sans — 17/1.5, 16/1.45, 15/1.45, 12 label (+.06em), 11 label (+.14em).
Google Fonts: `Big+Shoulders+Display:wght@800`, `Public+Sans:ital,wght@0,400;0,500;1,400`.
Spacing: 4 · 8 · 12 · 16 · 22 · 28. Gutter 28. Lens 88 (min hit 44). Ring Ø 112–152. Thought disc 48.
Radii: 16 thought · 20 panel · 999 pills · 24 zooming frame.
Durations: 80 · 160 · 240 · 280 · 320 · 400 · 1200 · 1600 · 2400 ms.
Haptics (Android): 15 switch · 10→30 magnet · 15×2 thought · 25 pop · 40 zoom · 50 lock.

## Assets
None. All scenery is primitive SVG (rects, circles, ellipses, polygons, arcs) defined inline in the reference file.

## Files
- `Front Row Focus.dc.html` — all nine boards with motion notes beneath each.
