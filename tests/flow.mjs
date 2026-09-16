// Drives the whole piece headlessly with audio enabled. Prints a timeline and writes screenshots to test-results/.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const BASE = process.env.BASE || 'http://localhost:3000';
mkdirSync('test-results', { recursive: true });
const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
const p = await b.newPage({ viewport: { width: 400, height: 860 } });
const errors = []; p.on('pageerror', e => errors.push(e.message));
const log = (...a) => console.log(...a);
await p.goto(BASE + '/index.html'); await p.waitForTimeout(2000);
const st = () => p.evaluate(() => ({ scene, held, stolen, level, spawned, grabBacks, audio: audio.started ? audio.mode : 'off', flood: arena.classList.contains('flood') }));
async function grab() { const h = await p.evaluate(() => ({ ...puckPos, left: frame.getBoundingClientRect().left })); await p.mouse.move(h.left + h.x, h.y); await p.mouse.down(); }
async function aimRound() {
  const r = await p.evaluate(() => {
    if (roundActive && thoughts.length) { const n = nearestThought(); const d = discOf(n.t); return { x: d.x, y: d.y, left: frame.getBoundingClientRect().left }; }
    const ux = targetPos.x - homePos.x, uy = targetPos.y - homePos.y, L = Math.hypot(ux, uy), over = maxPull - D.tolerance + 8;
    return { x: Math.max(2, Math.min(fw - 2, targetPos.x + ux / L * over)), y: Math.max(2, Math.min(fh - 2, targetPos.y + uy / L * over)), left: frame.getBoundingClientRect().left };
  });
  await p.mouse.move(r.left + r.x, r.y, { steps: 5 }); await p.waitForTimeout(40);
}
async function holdOn(ms) {
  const r = await p.evaluate(() => ({ targetPos, homePos, maxPull, tol: D.tolerance, left: frame.getBoundingClientRect().left, fw, fh }));
  const ux = r.targetPos.x - r.homePos.x, uy = r.targetPos.y - r.homePos.y, L = Math.hypot(ux, uy), over = r.maxPull - r.tol + 8;
  const x = Math.max(2, Math.min(r.fw - 2, r.targetPos.x + ux / L * over)), y = Math.max(2, Math.min(r.fh - 2, r.targetPos.y + uy / L * over));   // a finger can't leave the screen
  await p.mouse.move(r.left + x, y, { steps: 8 });
  await p.waitForTimeout(ms);
}
log('open', await st());
await p.mouse.click(200, 600); await p.waitForTimeout(2600); log('after tap 1', await st());
await p.mouse.click(200, 600); await p.waitForTimeout(700); log('game', await st());
await p.screenshot({ path: 'test-results/concert.png' });
// Easy lock
await grab(); await holdOn(6000); log('easy hold', await st()); await p.mouse.up();
await p.mouse.click(200, 700); await p.waitForTimeout(600); await p.screenshot({ path: 'test-results/held.png' });
// Try it on Hard, fight to the give-up
await p.click('#tryHard'); await p.waitForTimeout(400);
await grab();
for (let i = 0; i < 130; i++) { await holdOn(100); if ((await st()).scene === 'room') break; }
await p.mouse.up(); await p.waitForTimeout(1900); log('room', await st()); await p.screenshot({ path: 'test-results/room.png' });
// Hard in the room: play well through rounds 1 and 2, dawdle in round 3 until the clock ends it.
await grab(); for (let i = 0; i < 2000; i++) { const r = await p.evaluate(() => roundActive && round === 2); if (r) { await p.waitForTimeout(1200); } await aimRound(); if (await p.locator('#ending.show').count()) break; }
await p.mouse.up(); await p.waitForTimeout(4000); log('ending', await st(), await p.locator('#endLine1').textContent()); await p.screenshot({ path: 'test-results/ending.png' });
// Again, then Easy in the room to the lock and the headphones
await p.click('#again'); await p.waitForTimeout(800); await p.click('#toggle button[data-level="easy"]');
await p.evaluate(() => giveUp()); await p.waitForTimeout(1900);
await grab(); const t0 = Date.now(); let floodSeen = false;
for (let i = 0; i < 1500; i++) { await aimRound(); const s = await st(); if (s.flood && !floodSeen) { floodSeen = true; await p.screenshot({ path: 'test-results/flood.png' }); } if (s.held) break; }
log('easy room', await st(), ((Date.now() - t0) / 1000).toFixed(1) + 's', 'flood seen', floodSeen); await p.mouse.up();
await p.click('#headphones'); await p.waitForTimeout(1200 + 4200); log('made it', await st(), await p.locator('#endLine1').textContent());
log(errors.length ? 'PAGE ERRORS: ' + errors.join(' | ') : 'no page errors');
await b.close();
