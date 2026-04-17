import { useEffect, useRef, useState } from 'react';

interface Command {
  group: string;
  label: string;
  gl: string;
  hint?: string;
  sub?: string;
  run: () => void;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function setAccent(v: string) {
  document.documentElement.dataset.accent = v;
  localStorage.setItem('home-accent', v);
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    { group: 'Navigate', label: 'Go to home',      gl: '⌂', hint: '/', run: () => scrollTo('top') },
    { group: 'Navigate', label: 'About',           gl: '§', hint: '1', run: () => scrollTo('about') },
    { group: 'Navigate', label: 'Projects',        gl: '§', hint: '2', run: () => scrollTo('projects') },
    { group: 'Navigate', label: 'Blog',            gl: '§', hint: '3', run: () => scrollTo('blog') },
    { group: 'Navigate', label: 'Contact',         gl: '§', hint: '4', run: () => scrollTo('contact') },
    { group: 'Action',   label: 'Email Dmitrii',   gl: '✉', sub: 'hello@malashikh.in', run: () => { location.href = 'mailto:hello@malashikh.in'; } },
    { group: 'Action',   label: 'Open GitHub',     gl: '↗', sub: 'github.com/malashikhin', run: () => window.open('https://github.com/malashikhin', '_blank') },
    { group: 'Action',   label: 'Open LinkedIn',   gl: '↗', sub: 'linkedin.com/in/malashikhin', run: () => window.open('https://linkedin.com/in/malashikhin', '_blank') },
    { group: 'Theme',    label: 'Toggle dark mode',gl: '☾', run: () => document.getElementById('darkTog')?.click() },
    { group: 'Theme',    label: 'Accent → espresso',gl: '●', run: () => setAccent('espresso') },
    { group: 'Theme',    label: 'Accent → rust',   gl: '●', run: () => setAccent('rust') },
    { group: 'Theme',    label: 'Accent → cyan',   gl: '●', run: () => setAccent('cyan') },
    { group: 'Theme',    label: 'Accent → ink',    gl: '●', run: () => setAccent('ink') },
    { group: 'Fun',      label: 'Open tweaks',     gl: '⚙', run: () => { close(); const fn = (window as unknown as Record<string, unknown>).__openTweaks; if (typeof fn === 'function') fn(); } },
    { group: 'Fun',      label: 'Clear pinboard',  gl: '✕', run: () => { localStorage.removeItem('dm_pins_v1'); localStorage.removeItem('dm_ticker_removed_v1'); location.reload(); } },
  ];

  const results = query.trim()
    ? commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()) || (c.sub || '').toLowerCase().includes(query.toLowerCase()) || c.group.toLowerCase().includes(query.toLowerCase()))
    : commands;

  function close() { setOpen(false); setQuery(''); setSel(0); }

  function runCmd(i: number) {
    const c = results[i];
    if (!c) return;
    close();
    setTimeout(() => c.run(), 50);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
        setQuery('');
        setSel(0);
        return;
      }
      if (!open) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setSel(prev => Math.min(results.length - 1, prev + 1)); }
      else if (e.key === 'ArrowUp')   { e.preventDefault(); setSel(prev => Math.max(0, prev - 1)); }
      else if (e.key === 'Enter')     { e.preventDefault(); runCmd(sel); }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, sel, results]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  // Reset sel when query/results change
  useEffect(() => { setSel(0); }, [query]);

  if (!open) return null;

  let lastGroup = '';
  return (
    <div
      id="cmdk-wrap"
      className="on"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div id="cmdk">
        <header>
          <span className="prompt">›</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command…  try 'projects', 'email', 'dark'"
            autoComplete="off"
            spellCheck={false}
          />
          <span className="hint">esc</span>
        </header>
        <div className="list">
          {results.map((c, i) => {
            const showGroup = c.group !== lastGroup;
            lastGroup = c.group;
            return (
              <div key={c.label}>
                {showGroup && <div className="group">{c.group}</div>}
                <div
                  className={`item${i === sel ? ' sel' : ''}`}
                  onClick={() => runCmd(i)}
                  onMouseEnter={() => setSel(i)}
                >
                  <span className="gl">{c.gl || '·'}</span>
                  <span>
                    {c.label}
                    {c.sub && <span className="sub">{c.sub}</span>}
                  </span>
                  {c.hint && <kbd>{c.hint}</kbd>}
                </div>
              </div>
            );
          })}
        </div>
        <footer>
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> run</span>
          <span><kbd>esc</kbd> close</span>
        </footer>
      </div>
    </div>
  );
}
