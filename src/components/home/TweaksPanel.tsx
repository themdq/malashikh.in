import { useEffect, useState } from 'react';

interface Tweaks {
  accent: string;
  density: string;
  hero: string;
  easterEggsOn: boolean;
  dark: boolean;
}

function readTweaks(): Tweaks {
  const root = document.documentElement;
  return {
    accent: root.dataset.accent || 'espresso',
    density: root.dataset.density || 'comfortable',
    hero: root.dataset.hero || 'portrait',
    easterEggsOn: localStorage.getItem('home-easterEggs') !== 'false',
    dark: root.dataset.dark === 'true',
  };
}

function applyTweak(key: keyof Tweaks, val: string | boolean) {
  const root = document.documentElement;
  const sv = String(val);
  if (key === 'accent')  { root.dataset.accent = sv; localStorage.setItem('home-accent', sv); }
  if (key === 'density') { root.dataset.density = sv; localStorage.setItem('home-density', sv); }
  if (key === 'hero')    { root.dataset.hero = sv; applyHeroVariant(sv); }
  if (key === 'dark') {
    root.dataset.dark = sv;
    if (val) { root.classList.add('dark'); localStorage.setItem('theme', 'dark'); }
    else     { root.classList.remove('dark'); localStorage.setItem('theme', 'light'); }
  }
  if (key === 'easterEggsOn') {
    localStorage.setItem('home-easterEggs', sv);
  }
}

function applyHeroVariant(hero: string) {
  const pt = document.getElementById('portrait') as HTMLElement | null;
  if (!pt) return;
  const canvas = document.getElementById('asciiCanvas') as HTMLElement | null;
  if (hero === 'clean') { pt.style.display = 'none'; return; }
  pt.style.display = '';
  if (hero === 'terminal') {
    pt.style.background = '#0E0B08';
    pt.style.color = '#A8D8A8';
    if (canvas) canvas.style.color = '#A8D8A8';
  } else {
    pt.style.background = '';
    pt.style.color = '';
    if (canvas) canvas.style.color = '';
  }
}

export default function TweaksPanel() {
  const [open, setOpen] = useState(false);
  const [tweaks, setTweaks] = useState<Tweaks>({
    accent: 'espresso', density: 'comfortable', hero: 'portrait', easterEggsOn: true, dark: false,
  });

  useEffect(() => {
    setTweaks(readTweaks());
    // expose open function globally so command palette can call it
    (window as unknown as Record<string, unknown>).__openTweaks = () => setOpen(true);
    return () => { delete (window as unknown as Record<string, unknown>).__openTweaks; };
  }, []);

  useEffect(() => {
    function onEsc(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  function set(key: keyof Tweaks, val: string | boolean) {
    applyTweak(key, val);
    setTweaks(prev => ({ ...prev, [key]: val }));
  }

  function btn(key: keyof Tweaks, val: string | boolean, label: string) {
    const active = String(tweaks[key]) === String(val);
    return (
      <button
        key={String(val)}
        className={active ? 'on' : ''}
        onClick={() => set(key, val)}
      >
        {label}
      </button>
    );
  }

  return (
    <>
      {/* Trigger: accessible from command palette via window.__openTweaks */}
      {open && (
        <div id="tweaks-panel" className="open">
          <header>
            <span>// tweaks</span>
            <button onClick={() => setOpen(false)} aria-label="Close">✕</button>
          </header>
          <div className="tbody">
            <label>
              <span>accent</span>
              <div className="row">
                {btn('accent','espresso','espresso')}
                {btn('accent','rust','rust')}
                {btn('accent','cyan','cyan')}
                {btn('accent','ink','ink')}
              </div>
            </label>
            <label>
              <span>density</span>
              <div className="row">
                {btn('density','comfortable','comfy')}
                {btn('density','compact','compact')}
              </div>
            </label>
            <label>
              <span>hero</span>
              <div className="row">
                {btn('hero','portrait','portrait')}
                {btn('hero','terminal','terminal')}
                {btn('hero','clean','clean')}
              </div>
            </label>
            <label>
              <span>easter eggs</span>
              <div className="row">
                {btn('easterEggsOn',true,'on')}
                {btn('easterEggsOn',false,'off')}
              </div>
            </label>
            <label>
              <span>theme</span>
              <div className="row">
                {btn('dark',false,'paper')}
                {btn('dark',true,'ink')}
              </div>
            </label>
          </div>
        </div>
      )}
    </>
  );
}
