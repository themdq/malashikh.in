import { useEffect } from 'react';

export default function HomeInteractions() {
  useEffect(() => {
    // ── NYC Clock ──────────────────────────────────────────────────────
    function tick() {
      const el = document.getElementById('timeval');
      if (!el) return;
      try {
        el.textContent = new Date().toLocaleTimeString('en-US', {
          hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/New_York',
        });
      } catch { el.textContent = '—'; }
    }
    tick();
    const clockTimer = setInterval(tick, 30000);

    // ── Dark toggle button ─────────────────────────────────────────────
    const darkTog = document.getElementById('darkTog');
    function toggleDark() {
      const cur = document.documentElement.dataset.dark === 'true';
      const next = !cur;
      document.documentElement.dataset.dark = String(next);
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
    darkTog?.addEventListener('click', toggleDark);

    // ── Stats count-up ────────────────────────────────────────────────
    const nums = document.querySelectorAll<HTMLElement>('.stat .n[data-count]');
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const target = parseFloat(el.dataset.count || '0');
        const u = el.querySelector('.u')?.outerHTML || '';
        let cur = 0;
        const step = Math.max(1, Math.ceil(target / 24));
        const iv = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(iv); }
          el.innerHTML = cur + u;
        }, 32);
        io.unobserve(el);
      }
    }, { threshold: 0.4 });
    nums.forEach(n => io.observe(n));

    // ── Deploy log pulse ──────────────────────────────────────────────
    const firstRow = document.querySelector<HTMLElement>('#log .row');
    let pulseTimer: ReturnType<typeof setInterval> | null = null;
    if (firstRow) {
      pulseTimer = setInterval(() => {
        firstRow.animate(
          [{ background: 'transparent' }, { background: 'var(--highlight)' }, { background: 'transparent' }],
          { duration: 1600, easing: 'ease-out' }
        );
      }, 9000);
    }

    // ── Chord highlight ───────────────────────────────────────────────
    const projects = document.querySelectorAll<HTMLElement>('.project');
    const nodes = document.querySelectorAll<HTMLElement>('.pipeline .node');
    const facts = document.querySelectorAll<HTMLElement>('[data-fact]');

    function applyChord(p: HTMLElement) {
      const tags = (p.dataset.chord || '').split(',').map(s => s.trim()).filter(Boolean);
      const factIds = (p.dataset.facts || '').split(',').map(s => s.trim()).filter(Boolean);
      nodes.forEach(n => {
        const ntags = (n.dataset.tag || '').split(',').map(s => s.trim());
        const hit = ntags.some(t => tags.includes(t));
        n.classList.toggle('chord-dim', !hit);
        n.classList.toggle('chord-hit', hit);
      });
      facts.forEach(f => {
        const hit = factIds.includes(f.dataset.fact || '');
        f.classList.toggle('chord-dim', !hit);
        f.classList.toggle('chord-hit', hit);
      });
      projects.forEach(o => { if (o !== p) o.classList.add('chord-dim'); });
    }
    function clearChord() {
      [...nodes, ...facts, ...projects].forEach(el => el.classList.remove('chord-dim', 'chord-hit'));
    }
    projects.forEach(p => {
      p.addEventListener('mouseenter', () => applyChord(p));
      p.addEventListener('mouseleave', clearChord);
    });

    // ── J/K section jump ─────────────────────────────────────────────
    const sectionIds = ['top', 'about', 'projects', 'blog', 'contact'];
    function jumpSection(dir: number) {
      const y = window.scrollY + 80;
      let cur = 0;
      sectionIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = i;
      });
      const target = Math.max(0, Math.min(sectionIds.length - 1, cur + dir));
      document.getElementById(sectionIds[target])?.scrollIntoView({ behavior: 'smooth' });
    }

    // ── Keyboard shortcuts ────────────────────────────────────────────
    function onKeyDown(e: KeyboardEvent) {
      if ((e.target as HTMLElement).matches('input,textarea')) return;
      const key = e.key;
      if (key.toLowerCase() === 'w') { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }
      else if (key.toLowerCase() === 'c') { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }
      else if (key === '/') { e.preventDefault(); document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' }); }
      else if (key === 'j') { e.preventDefault(); jumpSection(+1); }
      else if (key === 'k') { e.preventDefault(); jumpSection(-1); }
      else if (key === 'd') { toggleDark(); }
    }
    document.addEventListener('keydown', onKeyDown);

    return () => {
      clearInterval(clockTimer);
      if (pulseTimer) clearInterval(pulseTimer);
      darkTog?.removeEventListener('click', toggleDark);
      document.removeEventListener('keydown', onKeyDown);
      io.disconnect();
      projects.forEach(p => {
        p.removeEventListener('mouseenter', () => applyChord(p));
        p.removeEventListener('mouseleave', clearChord);
      });
    };
  }, []);

  return null;
}
