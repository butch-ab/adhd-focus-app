import { chromium } from 'playwright';
const out = process.argv[2];
const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
const p = await b.newPage({ viewport: { width: 400, height: 860 } });
p.on('pageerror', e => console.log('PAGEERROR', e.message));
await p.goto('http://localhost:3000/index.html'); await p.waitForTimeout(1800);
await p.mouse.click(200, 600); await p.waitForTimeout(2600); await p.mouse.click(200, 600); await p.waitForTimeout(700);
await p.evaluate(() => { unlockHard(); setLevel('easy'); giveUp(); }); await p.waitForTimeout(1900);
const left = await p.evaluate(() => frame.getBoundingClientRect().left);
// Aim: if a round is active, go to the nearest bubble's disc; otherwise lean on the Walkman.
async function aim() {
  const r = await p.evaluate(() => {
    if (roundActive && thoughts.length) { const n = nearestThought(); const d = discOf(n.t); return { x: d.x, y: d.y, kind: 'bubble' }; }
    const ux = targetPos.x - homePos.x, uy = targetPos.y - homePos.y, L = Math.hypot(ux, uy), over = maxPull - D.tolerance + 8;
    return { x: targetPos.x + ux / L * over, y: targetPos.y + uy / L * over, kind: 'walkman' };
  });
  await p.mouse.move(left + Math.max(2, Math.min(398, r.x)), Math.max(2, Math.min(858, r.y)), { steps: 5 });
}
const h = await p.evaluate(() => ({ ...puckPos })); await p.mouse.move(left + h.x, h.y); await p.mouse.down();
const t0 = Date.now(); let lastRound = -1, lastCleared = -1, shots = { 0: false, 1: false, 2: false };
for (let i = 0; i < 1500; i++) {
  await aim(); await p.waitForTimeout(40);
  const s = await p.evaluate(() => ({ round, roundActive, cleared, n: thoughts.length, spawned, held, ending: ending.classList.contains('show'), flood: arena.classList.contains('flood') }));
  if (s.roundActive && s.round !== lastRound) { lastRound = s.round; console.log(`round ${s.round + 1} started at ${((Date.now() - t0) / 1000).toFixed(1)}s`); }
  if (s.roundActive && !shots[s.round] && s.n >= Math.min(3, s.spawned)) { shots[s.round] = true; await p.screenshot({ path: `${out}/round${s.round + 1}.png` }); }
  if (s.cleared !== lastCleared) { lastCleared = s.cleared; if (s.cleared) console.log(`round ${s.cleared} cleared at ${((Date.now() - t0) / 1000).toFixed(1)}s`); }
  if (s.held) { console.log(`LOCKED at ${((Date.now() - t0) / 1000).toFixed(1)}s`, s); break; }
  if (s.ending) { console.log(`ENDING at ${((Date.now() - t0) / 1000).toFixed(1)}s`, s); break; }
}
await p.mouse.up(); await b.close();
