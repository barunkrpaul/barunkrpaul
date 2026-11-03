// The hero's living field: particles scattered at random converge on two
// glowing centres (Ujjal and Barun) that orbit one another. Every few frames
// each particle joins whichever centre is nearer, so when the centres pass,
// streams of light flow between them. The cursor pushes particles away and a
// click sends out a pulse. Scrolling down pulls the pair apart.

interface P { x: number; y: number; vx: number; vy: number; c: number; r: number; a: number; w: number; s: number }

const COLORS = {
  dark: [[94, 234, 212], [167, 139, 250]],
  light: [[13, 148, 136], [109, 40, 217]],
};

function sprite(rgb: number[], light: boolean): HTMLCanvasElement {
  const s = document.createElement('canvas');
  s.width = s.height = 32;
  const g = s.getContext('2d')!;
  const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
  const [r, gr, b] = rgb;
  grad.addColorStop(0, `rgba(${r},${gr},${b},${light ? 0.9 : 1})`);
  grad.addColorStop(0.25, `rgba(${r},${gr},${b},${light ? 0.45 : 0.55})`);
  grad.addColorStop(1, `rgba(${r},${gr},${b},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, 32, 32);
  return s;
}

export function startField(canvas: HTMLCanvasElement, hero: HTMLElement): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const labels = [...hero.querySelectorAll<HTMLElement>('[data-centroid-label]')];

  let w = 0, h = 0, dpr = 1, raf = 0, running = false, visible = true;
  let parts: P[] = [];
  let sprites: HTMLCanvasElement[] = [];
  let light = false;
  let bg = '7,8,12';
  let theta = -0.6;
  let t0 = performance.now();
  let last = t0;
  let scroll = 0;
  const mouse = { x: -9999, y: -9999, on: false };
  const pulses: { x: number; y: number; t: number }[] = [];

  const readTheme = () => {
    light = document.documentElement.getAttribute('data-theme') === 'light';
    const pal = light ? COLORS.light : COLORS.dark;
    sprites = pal.map((c) => sprite(c, light));
    bg = light ? '246,245,241' : '7,8,12';
  };

  const centre = () => {
    const mobile = w < 800;
    return { cx: w * (mobile ? 0.5 : 0.73), cy: h * (mobile ? 0.26 : 0.47), R: Math.min(w, h) * (mobile ? 0.2 : 0.16) };
  };

  const resize = () => {
    const rect = hero.getBoundingClientRect();
    w = rect.width; h = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.max(450, Math.min(1700, (w * h) / 650)));
    if (parts.length !== n) {
      parts = Array.from({ length: n }, (_, i) => {
        const g = Math.abs((Math.random() + Math.random() + Math.random()) / 3 - 0.5) * 2; // 0..1, peaked near 0
        return {
          x: Math.random() * w, y: Math.random() * h, vx: 0, vy: 0,
          c: i % 2, r: 0.12 + g * 1.25, a: Math.random() * Math.PI * 2,
          w: 0, s: 0.6 + Math.random() * 1.6,
        };
      });
    }
  };

  const centroids = () => {
    const { cx, cy, R } = centre();
    const sep = R * (1 + scroll * 2.4);
    const ox = Math.cos(theta) * sep, oy = Math.sin(theta) * sep * 0.5;
    return [
      { x: cx + ox, y: cy + oy - scroll * h * 0.15 },
      { x: cx - ox, y: cy - oy - scroll * h * 0.15 },
    ];
  };

  let frame = 0;
  const step = (dt: number, now: number) => {
    const { R } = centre();
    theta += dt * 0.00022;
    const C = centroids();
    const intro = Math.min(1, (now - t0) / 2600);
    const k = (0.0009 + intro * intro * 0.0042) * (1 - scroll * 0.75);
    const damp = 0.9;
    const reassign = frame++ % 8 === 0;

    for (const p of parts) {
      if (reassign) {
        // k-means assignment step: join the nearer centre.
        const d0 = (p.x - C[0].x) ** 2 + (p.y - C[0].y) ** 2;
        const d1 = (p.x - C[1].x) ** 2 + (p.y - C[1].y) ** 2;
        p.c = d0 <= d1 ? 0 : 1;
      }
      const c = C[p.c];
      const rad = p.r * R;
      p.a += (dt * 0.0011) / (0.35 + p.r) * (p.c ? -1 : 1);
      const tx = c.x + Math.cos(p.a) * rad;
      const ty = c.y + Math.sin(p.a) * rad * 0.82;
      p.vx += (tx - p.x) * k * dt;
      p.vy += (ty - p.y) * k * dt;

      if (mouse.on) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 150 * 150 && d2 > 1) {
          const d = Math.sqrt(d2), f = (1 - d / 150) * 0.9;
          p.vx += (dx / d) * f; p.vy += (dy / d) * f;
        }
      }
      for (const pu of pulses) {
        const age = (now - pu.t) / 1000;
        const ring = age * 520;
        const dx = p.x - pu.x, dy = p.y - pu.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        if (Math.abs(d - ring) < 40) { const f = 2.2 * (1 - age); p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
      }
      p.vx *= damp; p.vy *= damp;
      p.x += p.vx; p.y += p.vy;
    }
    while (pulses.length && now - pulses[0].t > 1000) pulses.shift();
    return C;
  };

  const draw = (C: { x: number; y: number }[], now: number) => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = `rgba(${bg},${reduced ? 1 : 0.3})`;
    ctx.fillRect(0, 0, w, h);
    if (reduced) ctx.clearRect(0, 0, w, h);

    const fade = 1 - scroll * 0.7;
    const mobile = w < 800;
    ctx.globalCompositeOperation = light ? 'source-over' : 'lighter';
    ctx.globalAlpha = (mobile ? 0.55 : 0.85) * fade;
    for (const p of parts) {
      const sz = p.s * 5;
      ctx.drawImage(sprites[p.c], p.x - sz / 2, p.y - sz / 2, sz, sz);
    }

    // The bridge between the two centres.
    ctx.globalAlpha = 0.5 * fade;
    const g = ctx.createLinearGradient(C[0].x, C[0].y, C[1].x, C[1].y);
    g.addColorStop(0, light ? 'rgba(13,148,136,.6)' : 'rgba(94,234,212,.7)');
    g.addColorStop(1, light ? 'rgba(109,40,217,.6)' : 'rgba(167,139,250,.7)');
    ctx.strokeStyle = g; ctx.lineWidth = 1;
    ctx.setLineDash([2, 6]);
    ctx.beginPath(); ctx.moveTo(C[0].x, C[0].y); ctx.lineTo(C[1].x, C[1].y); ctx.stroke();
    ctx.setLineDash([]);

    // Centre cores with a slow breathing ring.
    C.forEach((c, i) => {
      const breathe = 1 + Math.sin(now * 0.002 + i * Math.PI) * 0.12;
      ctx.globalAlpha = fade;
      const s = 70 * breathe;
      ctx.drawImage(sprites[i], c.x - s / 2, c.y - s / 2, s, s);
      ctx.drawImage(sprites[i], c.x - 14, c.y - 14, 28, 28);
      ctx.globalAlpha = 0.35 * fade;
      ctx.strokeStyle = i ? (light ? '#6d28d9' : '#a78bfa') : (light ? '#0d9488' : '#5eead4');
      ctx.beginPath(); ctx.arc(c.x, c.y, 22 * breathe, 0, Math.PI * 2); ctx.stroke();
    });

    // Pulse rings.
    for (const pu of pulses) {
      const age = (now - pu.t) / 1000;
      ctx.globalAlpha = (1 - age) * 0.5;
      ctx.strokeStyle = light ? '#6d28d9' : '#5eead4';
      ctx.beginPath(); ctx.arc(pu.x, pu.y, age * 520, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.globalAlpha = 1;

    labels.forEach((el, i) => {
      el.style.transform = `translate(${C[i].x + 18}px, ${C[i].y - 34}px)`;
      el.classList.toggle('on', (reduced || now - t0 > 1800) && scroll < 0.6);
    });
  };

  const loop = (now: number) => {
    const dt = Math.min(48, now - last);
    last = now;
    const C = step(dt, now);
    draw(C, now);
    raf = requestAnimationFrame(loop);
  };

  const play = () => {
    if (running || reduced || !visible || document.hidden) return;
    running = true; last = performance.now(); raf = requestAnimationFrame(loop);
  };
  const pause = () => { running = false; cancelAnimationFrame(raf); };

  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true;
  };
  const onLeave = () => { mouse.on = false; };
  const onDown = (e: PointerEvent) => {
    if ((e.target as HTMLElement).closest('a,button,input')) return;
    const r = canvas.getBoundingClientRect();
    pulses.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() });
  };
  const onScroll = () => {
    scroll = Math.max(0, Math.min(1, window.scrollY / (h || 1)));
  };
  const onVis = () => (document.hidden ? pause() : play());
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? play() : pause(); });
  const mo = new MutationObserver(readTheme);

  readTheme();
  resize();
  if (reduced) {
    // One still frame of the settled field.
    t0 = -1e6;
    for (let i = 0; i < 260; i++) step(16, i * 16);
    draw(centroids(), 0);
  } else {
    play();
  }
  io.observe(hero);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  window.addEventListener('resize', resize);
  window.addEventListener('scroll', onScroll, { passive: true });
  hero.addEventListener('pointermove', onMove);
  hero.addEventListener('pointerleave', onLeave);
  hero.addEventListener('pointerdown', onDown);
  document.addEventListener('visibilitychange', onVis);

  return () => {
    pause(); io.disconnect(); mo.disconnect();
    window.removeEventListener('resize', resize);
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('visibilitychange', onVis);
  };
}
