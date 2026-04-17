import { useEffect, useRef, useState } from 'react';

interface SiteData {
  meta: { name: string; role: string; location: string; email: string };
  about: { lead: string; paras: string[]; facts: Array<{ k: string; v: string }> };
  now: { label: string; items: Array<{ ic: string; k: string; v: string; sub?: string }> };
  projects: Array<{ year: string; title: string; desc: string }>;
  contact: { links: Array<{ label: string; href: string; ext: string }> };
}

interface Props {
  siteData: SiteData;
}

interface Line {
  html: string;
  cls?: string;
}

export default function HomeTerminal({ siteData }: Props) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [, setHIdx] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialized = useRef(false);

  function addLine(html: string, cls?: string) {
    setLines(prev => [...prev, { html, cls }]);
  }

  function write(text: string, cls?: string) {
    addLine(text.replace(/</g, '&lt;'), cls);
  }
  function writeHTML(html: string, cls?: string) {
    addLine(html, cls);
  }

  function promptLine(cmd: string) {
    writeHTML(`<span class="dim">dmitrii@nyc</span> <span class="hl">~</span> <span class="dim">%</span> ${cmd.replace(/</g, '&lt;')}`);
  }

  function stripTags(s: string) { return s.replace(/<[^>]*>/g, ''); }

  function runCmd(raw: string) {
    const parts = raw.trim().split(/\s+/);
    const cmd = (parts[0] || '').toLowerCase();
    const arg = parts[1] || '';

    promptLine(raw);

    switch (cmd) {
      case 'help':
        write('available commands:', 'dim');
        [
          'help            — list commands',
          'whoami          — identity',
          'ls              — sections',
          'cat <section>   — about | now | stack | projects | contact',
          'stack           — current stack',
          'now             — currently',
          'theme dark|light — switch theme',
          'accent <name>   — espresso | rust | cyan | ink',
          'clear           — clear terminal',
          'exit            — close',
        ].forEach(l => write('  ' + l));
        break;
      case 'whoami':
        write(`${siteData.meta.name} — ${siteData.meta.role} @ ${siteData.meta.location}`);
        break;
      case 'ls':
        writeHTML('<span class="hl">about</span>   <span class="hl">now</span>    <span class="hl">stack</span>   <span class="hl">projects</span>   <span class="hl">contact</span>');
        break;
      case 'cat':
        if (!arg) { write('usage: cat <section>', 'err'); break; }
        if (arg === 'about') {
          write(siteData.about.lead);
          siteData.about.paras.forEach(p => { write(''); write(stripTags(p)); });
        } else if (arg === 'now') {
          siteData.now.items.forEach(it =>
            writeHTML(`<span class="dim">${it.ic}</span> <span class="hl">${it.k}</span>: ${stripTags(it.v)}${it.sub ? ' (' + it.sub + ')' : ''}`)
          );
        } else if (arg === 'stack') {
          const f = siteData.about.facts.find(f => f.k === 'stack');
          write(f ? f.v : '—');
        } else if (arg === 'projects') {
          siteData.projects.forEach(p =>
            writeHTML(`<span class="dim">${p.year}</span> <span class="hl">${p.title}</span> — ${stripTags(p.desc)}`)
          );
        } else if (arg === 'contact') {
          siteData.contact.links.forEach(l =>
            writeHTML(`  <span class="dim">${l.ext}</span> <span class="hl">${l.label}</span> — ${l.href}`)
          );
        } else {
          write('no such section: ' + arg, 'err');
        }
        break;
      case 'stack':
        { const f = siteData.about.facts.find(f => f.k === 'stack'); write(f ? f.v : '—'); break; }
      case 'now':
        siteData.now.items.forEach(it =>
          writeHTML(`<span class="dim">${it.ic}</span> <span class="hl">${it.k}</span>: ${stripTags(it.v)}`)
        );
        break;
      case 'projects':
        siteData.projects.forEach(p =>
          writeHTML(`<span class="dim">${p.year}</span> <span class="hl">${p.title}</span>`)
        );
        break;
      case 'theme':
        if (arg === 'dark') {
          document.documentElement.dataset.dark = 'true';
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
          write('theme: dark', 'ok');
        } else if (arg === 'light') {
          document.documentElement.dataset.dark = 'false';
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
          write('theme: light', 'ok');
        } else {
          write('usage: theme dark|light', 'err');
        }
        break;
      case 'accent':
        if (['espresso','rust','cyan','ink'].includes(arg)) {
          document.documentElement.dataset.accent = arg;
          localStorage.setItem('home-accent', arg);
          write(`accent: ${arg}`, 'ok');
        } else {
          write('usage: accent espresso|rust|cyan|ink', 'err');
        }
        break;
      case 'clear':
        setLines([]);
        return;
      case 'exit':
        setOpen(false);
        return;
      case '':
        break;
      default:
        write(`command not found: ${cmd}. type 'help'`, 'err');
    }
  }

  function openTerm() {
    setOpen(true);
    if (!initialized.current) {
      initialized.current = true;
      setTimeout(() => {
        writeHTML('<span class="dim">dmitrii@nyc ~ % type \'help\' to list commands</span>');
      }, 50);
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.target as HTMLElement).matches('input,textarea')) return;
      if (e.key === ':' || e.key === '`') { e.preventDefault(); openTerm(); }
      if (e.key === 'Escape' && open) setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    // expose globally for command palette
    (window as unknown as Record<string, unknown>).__openTerm = openTerm;
    return () => {
      document.removeEventListener('keydown', onKey);
      delete (window as unknown as Record<string, unknown>).__openTerm;
    };
  }, [open]);

  // Scroll to bottom on new lines
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  // Focus input when open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  if (!open) return null;

  return (
    <div id="term-wrap" className="on">
      <div id="term">
        <div className="tbar">
          <span className="dots"><i className="r"></i><i className="y"></i><i className="g"></i></span>
          <span className="title">dmitrii@nyc — zsh</span>
          <span className="x" onClick={() => setOpen(false)}>✕</span>
        </div>
        <div className="body" ref={bodyRef}>
          {lines.map((l, i) => (
            <div
              key={i}
              className={`line${l.cls ? ' ' + l.cls : ''}`}
              dangerouslySetInnerHTML={{ __html: l.html }}
            />
          ))}
        </div>
        <div className="prompt-row">
          <span className="p">❯</span>
          <input
            ref={inputRef}
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                const cmd = inputVal;
                setHistory(prev => [cmd, ...prev]);
                setHIdx(-1);
                setInputVal('');
                runCmd(cmd);
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setHIdx(prev => {
                  const next = Math.min(history.length - 1, prev + 1);
                  setInputVal(history[next] || '');
                  return next;
                });
              } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setHIdx(prev => {
                  const next = Math.max(-1, prev - 1);
                  setInputVal(next < 0 ? '' : history[next] || '');
                  return next;
                });
              } else if (e.key === 'Escape') {
                setOpen(false);
              }
            }}
            placeholder="type 'help'"
            autoComplete="off"
            spellCheck={false}
          />
          <span className="hint">esc</span>
        </div>
      </div>
    </div>
  );
}
