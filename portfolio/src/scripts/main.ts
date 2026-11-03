import { startField } from './particles';
import { initPalette } from './palette';

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = () => matchMedia('(hover: hover) and (pointer: fine)').matches;
const store = {
  get(k: string) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
};

/* ---------------- Theme ---------------- */
export function setTheme(t: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', t);
  store.set('theme', t);
}
export function toggleTheme() {
  setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
}
function currentTheme() {
  const saved = store.get('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/* ---------------- Brand name preview ---------------- */
export function setBrand(id: string) {
  const opt = document.querySelector<HTMLElement>(`[data-brand-option="${id}"]`);
  if (!opt) return;
  const name = opt.dataset.name!;
  document.querySelectorAll('[data-brand-option]').forEach((b) => b.setAttribute('aria-checked', String(b === opt)));
  document.querySelectorAll('[data-brand-name]').forEach((el) => { el.textContent = name; });
  const t = document.querySelector('title');
  if (t) t.textContent = `${t.dataset.titleSuffix ?? ''}${name}${t.dataset.titleSuffix ? '' : ' · Two minds. One build.'}`;
  store.set('brand', id);
}
// The "Name preview" switcher is for the two of you, not for visitors.
// Open the site once with ?names in the address to switch it on in your
// browser, and with ?names=off to switch it off again.
function namePreviewOn() {
  const q = new URLSearchParams(location.search).get('names');
  if (q !== null) store.set('names-preview', q === 'off' ? '0' : '1');
  return store.get('names-preview') === '1';
}
function applyBrand() {
  const on = namePreviewOn();
  const box = document.querySelector<HTMLElement>('[data-brand-switch]');
  if (box) box.hidden = !on;
  const id = store.get('brand');
  if (on && id) setBrand(id);
}

/* ---------------- Once per visit (persistent UI) ---------------- */
function initOnce() {
  document.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    if (t.closest('[data-theme-toggle]')) toggleTheme();
    const opt = t.closest<HTMLElement>('[data-brand-option]');
    if (opt) setBrand(opt.dataset.brandOption!);
    const tog = t.closest('[data-brand-toggle]');
    if (tog) {
      const box = tog.closest('[data-brand-switch]')!;
      const open = box.classList.toggle('open');
      tog.setAttribute('aria-expanded', String(open));
    }
  });

  // Keep theme across page transitions (the new page's <html> replaces ours).
  document.addEventListener('astro:after-swap', () => {
    document.documentElement.setAttribute('data-theme', currentTheme());
    document.documentElement.classList.remove('no-js');
  });

  initPalette({ toggleTheme, setBrand });

  // Hide the nav while scrolling down, show it when scrolling up.
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('[data-nav]');
    const y = window.scrollY;
    nav?.classList.toggle('hide', y > lastY && y > 200);
    lastY = y;
  }, { passive: true });

  // Custom cursor.
  if (fine() && !reduced()) {
    const ring = document.querySelector<HTMLElement>('.cursor');
    const dot = document.querySelector<HTMLElement>('.cursor-dot');
    if (ring && dot) {
      let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
      window.addEventListener('pointermove', (e) => {
        document.body.classList.add('has-cursor');
        x = e.clientX; y = e.clientY;
        dot.style.transform = `translate(${x}px, ${y}px)`;
        const hot = (e.target as HTMLElement).closest('a,button,[data-hover],input,label,textarea');
        ring.classList.toggle('hover', !!hot);
      });
      document.addEventListener('pointerleave', () => document.body.classList.remove('has-cursor'));
      document.addEventListener('pointerenter', () => document.body.classList.add('has-cursor'));
      const follow = () => {
        rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
        ring.style.transform = `translate(${rx}px, ${ry}px)`;
        requestAnimationFrame(follow);
      };
      follow();
    }
  }

  // Shortcut so "/" opens the menu is handled in palette.ts.
}

/* ---------------- Per page ---------------- */
type Cleanup = () => void;
let cleanups: Cleanup[] = [];

function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('.reveal:not(.in), .steps li');
  if (reduced() || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        const s = en.target.querySelector<HTMLElement>('[data-scramble]') ?? (en.target.matches('[data-scramble]') ? en.target as HTMLElement : null);
        if (s) scramble(s);
        en.target.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  els.forEach((e) => io.observe(e));
  cleanups.push(() => io.disconnect());
}

const GLYPHS = '!<>-_\\/[]{}—=+*^?#01ABCDEFxyz';
function scramble(el: HTMLElement) {
  if (reduced()) return;
  const final = el.dataset.final ?? el.textContent ?? '';
  el.dataset.final = final;
  let frame = 0;
  const total = 26;
  const tick = () => {
    const out = [...final].map((ch, i) => {
      if (ch === ' ') return ' ';
      return frame / total > i / final.length ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }).join('');
    el.textContent = out;
    if (frame++ < total) requestAnimationFrame(tick); else el.textContent = final;
  };
  tick();
}

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target) || reduced()) return;
  const start = performance.now();
  const dur = 1400;
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = Math.round(target * eased).toLocaleString('en-IN');
    if (t < 1) requestAnimationFrame(tick);
  };
  el.textContent = '0';
  requestAnimationFrame(tick);
}

function initPointerEffects() {
  if (!fine() || reduced()) return;
  const onMove = (e: PointerEvent) => {
    const t = e.target as HTMLElement;
    // Spotlight + tilt on cards
    const card = t.closest<HTMLElement>('[data-tilt], [data-spot]');
    if (card) {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
      if (card.hasAttribute('data-tilt')) {
        card.style.setProperty('--rx', `${(0.5 - py) * 5}deg`);
        card.style.setProperty('--ry', `${(px - 0.5) * 6}deg`);
      }
    }
    // Magnetic buttons
    const mag = t.closest<HTMLElement>('[data-magnetic]');
    if (mag) {
      const r = mag.getBoundingClientRect();
      mag.style.setProperty('--mx', `${(e.clientX - r.left - r.width / 2) * 0.25}px`);
      mag.style.setProperty('--my', `${(e.clientY - r.top - r.height / 2) * 0.35}px`);
    }
  };
  const onOut = (e: PointerEvent) => {
    const t = e.target as HTMLElement;
    const rel = e.relatedTarget as HTMLElement | null;
    const card = t.closest<HTMLElement>('[data-tilt]');
    if (card && !card.contains(rel)) { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); }
    const mag = t.closest<HTMLElement>('[data-magnetic]');
    if (mag && !mag.contains(rel)) { mag.style.setProperty('--mx', '0px'); mag.style.setProperty('--my', '0px'); }
  };
  document.addEventListener('pointermove', onMove);
  document.addEventListener('pointerout', onOut);
  cleanups.push(() => { document.removeEventListener('pointermove', onMove); document.removeEventListener('pointerout', onOut); });
}

function initProgressRail() {
  const steps = document.querySelector<HTMLElement>('[data-progress]');
  if (!steps) return;
  const onScroll = () => {
    const r = steps.getBoundingClientRect();
    const vertical = innerWidth <= 860;
    const p = vertical
      ? (innerHeight * 0.7 - r.top) / r.height
      : (innerHeight * 0.85 - r.top) / (innerHeight * 0.5);
    steps.style.setProperty('--p', String(Math.max(0, Math.min(1, p))));
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  cleanups.push(() => window.removeEventListener('scroll', onScroll));
}

// Portraits: the photo is first drawn as ASCII art (sampled from the photo
// itself), which decodes into place and then dissolves into the real photo.
// Hovering the card plays it again.
const RAMP = ' .:-=+*#%@';
function initAscii() {
  document.querySelectorAll<HTMLElement>('[data-ascii-photo]').forEach((box) => {
    const out = box.querySelector('pre');
    const img = box.querySelector<HTMLImageElement>('img.photo');
    if (!out || !img || reduced()) return;
    const cols = 92;
    const rows = Math.round(cols * 0.6); // character cells are ~0.6 as wide as tall; the box is square
    let final = '';
    let busy = false;

    const sample = () => {
      const c = document.createElement('canvas');
      c.width = cols; c.height = rows;
      const g = c.getContext('2d', { willReadFrequently: true })!;
      // The whole photo, fitted inside the square like object-fit: contain.
      g.fillStyle = '#000'; g.fillRect(0, 0, cols, rows);
      const ar = img.naturalWidth / img.naturalHeight;
      let dw = cols, dh = rows;
      if (ar > 1) dh = rows / ar; else dw = cols * ar;
      g.drawImage(img, (cols - dw) / 2, (rows - dh) / 2, dw, dh);
      const d = g.getImageData(0, 0, cols, rows).data;
      const lum: number[] = [];
      for (let i = 0; i < d.length; i += 4) lum.push(0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]);
      const lo = Math.min(...lum), hi = Math.max(...lum) || 1;
      const lines: string[] = [];
      for (let y = 0; y < rows; y++) {
        let line = '';
        for (let x = 0; x < cols; x++) {
          const v = (lum[y * cols + x] - lo) / (hi - lo);
          line += RAMP[Math.min(RAMP.length - 1, Math.floor(v * RAMP.length))];
        }
        lines.push(line);
      }
      final = lines.join('\n');
    };
    const fit = () => { out.style.fontSize = `${box.clientWidth / (cols * 0.6)}px`; };

    const play = () => {
      if (busy || !final) return;
      busy = true;
      fit();
      box.classList.add('ascii');
      box.classList.remove('revealing');
      let f = 0;
      const frames = 34;
      const tick = () => {
        const p = f / frames;
        out.textContent = [...final].map((ch, i) => (ch === '\n' || ch === ' ' ? ch : Math.random() < p * 1.15 - ((i % (cols + 1)) / cols) * 0.15 ? ch : RAMP[(Math.random() * RAMP.length) | 0])).join('');
        if (f++ < frames) { requestAnimationFrame(tick); return; }
        out.textContent = final;
        setTimeout(() => {
          box.classList.add('revealing');
          box.classList.remove('ascii');
          setTimeout(() => { busy = false; }, 900);
        }, 450);
      };
      tick();
    };

    const ready = () => { try { sample(); } catch { final = ''; } };
    if (img.complete && img.naturalWidth) ready(); else img.addEventListener('load', ready, { once: true });

    // Start in ASCII so the first reveal is seen; without JS the photo simply shows.
    box.classList.add('ascii');
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const go = () => (final ? play() : box.classList.remove('ascii'));
      img.complete ? go() : img.addEventListener('load', go, { once: true });
    }, { threshold: 0.45 });
    io.observe(box);
    const replay = () => fine() && play();
    box.closest('article')?.addEventListener('pointerenter', replay);
    window.addEventListener('resize', fit);
    cleanups.push(() => { io.disconnect(); window.removeEventListener('resize', fit); });
  });
}

function initBrief() {
  const form = document.querySelector<HTMLFormElement>('[data-brief]');
  if (!form) return;
  const status = form.querySelector<HTMLElement>('[data-brief-status]')!;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const name = String(d.get('name') ?? '').trim();
    const type = String(d.get('type') ?? '');
    if (!type || !name) {
      status.textContent = !type ? 'Pick what you are building first.' : 'Please add your name.';
      status.classList.add('err');
      return;
    }
    status.classList.remove('err');
    const lines = [
      `Hello Ujjal and Barun,`,
      ``,
      `Project type: ${type}`,
      `Budget: ${d.get('budget') || 'Not given'}`,
      `Timeline: ${d.get('timeline') || 'Not given'}`,
      d.get('org') ? `Organisation: ${d.get('org')}` : '',
      ``,
      String(d.get('details') ?? '').trim(),
      ``,
      `${name}`,
    ].filter((l, i, a) => !(l === '' && a[i - 1] === ''));
    const href = `mailto:${form.dataset.to}?subject=${encodeURIComponent(`New project: ${type}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
    status.textContent = 'Opening your email app with the brief filled in…';
    window.location.href = href;
  });
}

function initIndexFilter() {
  const bar = document.querySelector<HTMLElement>('[data-filters]');
  const list = document.querySelector<HTMLElement>('[data-index-list]');
  if (!bar || !list) return;
  bar.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-filter]');
    if (!btn) return;
    const f = btn.dataset.filter!;
    bar.querySelectorAll('[data-filter]').forEach((b) => b.setAttribute('aria-selected', String(b === btn)));
    list.querySelectorAll<HTMLElement>('li').forEach((li) => { li.hidden = f !== 'all' && li.dataset.group !== f; });
  });
}

function initHero() {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-hero-canvas]');
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (canvas && hero) cleanups.push(startField(canvas, hero));
}

function initPage() {
  cleanups.forEach((c) => c());
  cleanups = [];
  applyBrand();
  initReveal();
  initPointerEffects();
  initProgressRail();
  initAscii();
  initBrief();
  initIndexFilter();
  initHero();
}

let booted = false;
document.addEventListener('astro:page-load', () => {
  if (!booted) { booted = true; initOnce(); }
  initPage();
});
document.addEventListener('astro:before-swap', () => { cleanups.forEach((c) => c()); cleanups = []; });
