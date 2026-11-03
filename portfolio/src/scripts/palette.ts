import { navigate } from 'astro:transitions/client';

interface Api { toggleTheme: () => void; setBrand: (id: string) => void }
interface TermData { people: { id: string; name: string; role: string; strengths: string[] }[]; projects: string[] }

const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]!));

export function initPalette(api: Api) {
  const root = document.querySelector<HTMLElement>('[data-palette]');
  if (!root) return;
  const input = root.querySelector<HTMLInputElement>('[data-palette-input]')!;
  const list = root.querySelector<HTMLElement>('[data-palette-list]')!;
  const term = root.querySelector<HTMLElement>('[data-term]')!;
  const items = [...list.querySelectorAll<HTMLLIElement>('li')];
  const data: TermData = JSON.parse(root.querySelector('[data-term-data]')?.textContent || '{"people":[],"projects":[]}');
  let lastFocus: Element | null = null;

  const visible = () => items.filter((li) => !li.hidden);
  const select = (li?: HTMLLIElement) => {
    items.forEach((x) => x.setAttribute('aria-selected', String(x === li)));
    li?.scrollIntoView({ block: 'nearest' });
  };
  const open = () => {
    lastFocus = document.activeElement;
    root.hidden = false;
    input.value = '';
    term.hidden = true;
    filter();
    requestAnimationFrame(() => input.focus());
  };
  const close = () => {
    root.hidden = true;
    (lastFocus as HTMLElement | null)?.focus?.();
  };
  const filter = () => {
    const q = input.value.trim().toLowerCase();
    items.forEach((li) => { li.hidden = !!q && !li.dataset.label!.includes(q) && !li.dataset.group!.toLowerCase().includes(q); });
    select(visible()[0]);
  };

  const terminal = (cmd: string) => {
    const [c, arg] = cmd.trim().toLowerCase().split(/\s+/);
    let out = '';
    if (c === 'whoami') {
      const p = data.people.find((x) => x.id === arg) ?? null;
      out = p
        ? `<b>${esc(p.name)}</b>\n${esc(p.role)}\n\nstrengths: ${p.strengths.map(esc).join(', ')}`
        : `usage: whoami <i>ujjal</i> | <i>barun</i>`;
    } else if (c === 'neofetch') {
      out = [
        `<b>team</b>      ${data.people.map((p) => esc(p.name)).join(' + ')}`,
        `<b>motto</b>     Two minds. One build.`,
        `<b>shipped</b>   ${data.projects.map(esc).join(', ')}`,
        `<b>stack</b>     Kotlin · TypeScript · React · Next.js · Firebase · Supabase`,
        `<b>base</b>      West Bengal, India`,
        `<b>status</b>    <i>open to new projects</i> → type “hire”`,
      ].join('\n');
    } else if (c === 'hire' || c === 'contact') {
      close(); navigate('/#contact'); return true;
    } else if (c === 'projects' || c === 'ls') {
      out = data.projects.map((p) => `▸ ${esc(p)}`).join('\n');
    } else if (c === 'help') {
      out = 'commands: <b>whoami</b> ujjal|barun · <b>neofetch</b> · <b>projects</b> · <b>hire</b> · <b>theme</b>';
    } else if (c === 'theme') {
      api.toggleTheme(); out = 'theme switched';
    } else {
      return false;
    }
    term.innerHTML = out;
    term.hidden = false;
    return true;
  };

  const run = (li?: HTMLLIElement) => {
    if (!li) { if (input.value.trim() && !terminal(input.value)) { term.hidden = false; term.innerHTML = `command not found: ${esc(input.value)} · try <b>help</b>`; } return; }
    const cmd = li.dataset.cmd!;
    const [kind, ...rest] = cmd.split(':');
    const val = rest.join(':');
    if (kind === 'go') { close(); navigate(val); }
    else if (kind === 'theme') { api.toggleTheme(); close(); }
    else if (kind === 'brand') { api.setBrand(val); close(); }
    else if (kind === 'copy') {
      navigator.clipboard?.writeText(val).then(
        () => { term.hidden = false; term.textContent = `copied ${val}`; },
        () => { term.hidden = false; term.textContent = val; },
      );
    } else if (kind === 'term') { input.value = val; terminal(val); }
  };

  input.addEventListener('input', () => { term.hidden = true; filter(); });
  input.addEventListener('keydown', (e) => {
    const vis = visible();
    const cur = vis.findIndex((li) => li.getAttribute('aria-selected') === 'true');
    if (e.key === 'ArrowDown') { e.preventDefault(); select(vis[(cur + 1) % vis.length]); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); select(vis[(cur - 1 + vis.length) % vis.length]); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      // A typed terminal command wins over the highlighted item.
      if (input.value.trim() && terminal(input.value)) return;
      run(vis[cur]);
    } else if (e.key === 'Escape') { close(); }
    else if (e.key === 'Tab') { e.preventDefault(); }
  });
  list.addEventListener('click', (e) => run((e.target as HTMLElement).closest('li') ?? undefined));
  list.addEventListener('pointermove', (e) => { const li = (e.target as HTMLElement).closest('li'); if (li) items.forEach((x) => x.setAttribute('aria-selected', String(x === li))); });
  root.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('[data-close-palette]')) close(); });

  document.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('[data-open-palette]')) open();
  });
  document.addEventListener('keydown', (e) => {
    const typing = (e.target as HTMLElement).closest('input,textarea,[contenteditable]');
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
      e.preventDefault();
      root.hidden ? open() : close();
    } else if (e.key === 'Escape' && !root.hidden) close();
  });
}
