import { useEffect, useState } from 'react';

const SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

export default function KonamiOverlay() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let idx = 0;
    function onKey(e: KeyboardEvent) {
      if ((e.target as HTMLElement).matches('input,textarea')) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === SEQ[idx]) {
        idx++;
        if (idx === SEQ.length) { setOpen(true); idx = 0; }
      } else {
        idx = k === SEQ[0] ? 1 : 0;
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      id="konami"
      className="on"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div className="box">
        <div className="big">Well, <span className="it">hello.</span></div>
        <p>You found the quiet door. A few things I'd tell a friend but wouldn't put on a résumé:</p>
        <ul>
          <li>I still hand-write post-mortems in a notebook first.</li>
          <li>Favorite debugging move: <i>walk around the block</i>.</li>
          <li>I have opinions about espresso tonic ratios (3:1, no syrup).</li>
          <li>I keep a running list of tiny automations that saved me a minute each.</li>
        </ul>
        <div className="hint">
          <span>esc to close</span>
          <span>♡ thanks for looking</span>
        </div>
      </div>
    </div>
  );
}
