import { useEffect, useRef } from 'react';

const ART = [
"                                 ··  ·▒· ·                                            ",
"                               ·▒▒▓█▓▓██▓·▒▒ ···                                      ",
"                              ▒▓██████████▓▓███▓· ·░▒░·                               ",
"                            ·▒▓▓████████████▓█▓····░░··░▓·                            ",
"                           ▒█████████████████████████▓▒░·░·                           ",
"                       ·▓██▓▓██████████████████████████▓·  ·                          ",
"                     ▒███████████████████████████████████▓░                           ",
"                    ·▓█████████████▓████████████████████████░·░·                      ",
"                   ░█▓▓█▓▓███████████████████████████████████▒                        ",
"                  ▒████████████▓▒▓██████████████████████▓████▓·                       ",
"                 ·▓█████████████▓▓▓████████████████████████████░·                     ",
"                ·▓██████████████▓██████████████████████████▓▓▓█░                      ",
"              ··░████████████▓█████████████████████████████████░·                     ",
"              ·▒▓▓██████▓▓█▓▓▒▓▓█▓▓█▓▓▓▓▓▒▓▓▒▓████████████████▓░·                     ",
"            ·· ·▒██████████▓▓▒▓▓███▓▓▓▒░░▓▓▓▒▒▓█████████████████▒                     ",
"              ·▓█████▓▓█████▓▒▓▓▓█▓▒░░···░▒▒▒▓██▓▓█████████████▓▒                     ",
"           · ·▒▓█████▓▓████▓▓███▓██▓▒· ···░▒▒░░██████▓█████████▓▓▓·                   ",
"          ·▓·░████████████▓▒▓█▓▓█▓▓▒▒░ ···░▒▒▒▓███▓██▓▓▓█▓▓█████▓▒▒░                  ",
"           ·▓████████████▓▒▒▒░▒▓███▓▒░ ···░▒████████████▓██▓██████▓░                  ",
"            ▒██████████▓███▓▓▒▓▓▓███▓░·   ░▓█▓▒▓███████████▓██████▓▒                  ",
"            ▒██████████▓▒░▒▓████████▓░·░░ ·░▒▓▒░▓████▓▓▓███████████▒                  ",
"            ░▓█████████▓▓▓██▓·░░▒▓▓█▓▓▒· ·▒▓▒▓▓█▓▓▓████████████▓▓██▒                  ",
"            ▒██▓▓███████▓▒··░▒··░·░▒▒░······░▒▓▓████████▓████████▓█▓·                 ",
"            ▒██▓▓█████▓▒░░▒░▒█▓▒░·······░▓░░▒▓▓████████████████████▓·                 ",
"            ·▒█▓▓████▓▒░░░░▒▓███▓▒░·   ···░▒▒▓▓█████████████▓▓█████▓▒·                ",
"            ▒██▓▓████░░█▓░···░▒▒▓▒░·░░·░░·░░░▒▓█▓▓▓▓▓▓▓▓▓█████████▓▓█░                ",
"            ▒▓██████▓▒▒░·······░▒▒▒░░░·░░░░░░▓█▓▓▓▒▒▒▒▒▒▒▒▒▓█████████░                ",
"             ░█████▓░···░▒█▒░░▒▒░▓█▓▒░··· ··░▒▓▓█▓▒▒▒▓▒▒▓▒▒░░▒██████▓·                ",
"             ░█████▓·░░░░▒█████▓·▓▓▒▓▒·   ··░▓█████████▓▒▒▒░░▒█████▒                  ",
"             ░█▓▓█▓░·░▒▓█▓▒░▒██▓·░▒▓▒░·   ···▒▓█▓▒░▓▓▒░▒█▓▒░░▒█████▒                  ",
"             ░████▒░··░▒▓▒░···░░░░░······ ·····░░░░··░░░▒▒░··░████░·                  ",
"              ·▓██░·····░▒░░░░░░░········ ········░░░░░░░░░··░████░                   ",
"              ·▓██░··············  ····     ·················░▓███░                   ",
"             ·▒▓██░········        ······ ······   ···········░▓▓░·                   ",
"              ·▓██░····            ····     ······    ·······░▓▓▓▒·                   ",
"               ▒▓█░··            ·····      ······         ··░█▓▒                     ",
"               ░▓█░····          ·····      ······         ··░█▓░                     ",
"               ·▒█░····         ····         ···░░·        ··░▓░·                     ",
"               ·░▓░····       ········      ····░░···      ··░▒░·                     ",
"               ·░▒░····      ·░░·░▒░····· ···░░░······     ······                     ",
"               ········      ····░▒▓█▓▒░··░▒▓▓▓▓░·····     ··· ··                     ",
"               ···░░···    ··░·····░▓█▓▓▓▓▓▓▓▓▒·········   ···░··                     ",
"                 ·░░····  ·······░░░▒▓████▓▒░░░···············░··                     ",
"                 ·░░·················· ·░▒░· ······░░·········░···                    ",
"                 ·································░···········░··                     ",
"                 ···░····· ···░▒▓▓▓▓▒▒▒▒▒░▒▒▒▒▒▓▒▒▒░··········░··                     ",
"                  ··░··········░█▓▒   · ·░· ····▓▓····  ····░░···                     ",
"                  ··░··░···  ····░░·         ▒▓▒░░··········░░···                     ",
"                  ··░░░··········░░░░░▒▒░·░░░░░░░░·········░·····                     ",
"                  ···░░···░···········░░░░░░░··░·········░░░···                       ",
"                  ···░░·░░·········░░░····  ·░░············░···                       ",
"                  ···░░░░░··········░░░░░░░░░···········░░░···                        ",
"                    ·░░▒░░·········░░░░░░░░░░···········░░░···                        ",
"                    ·░░░▒▒░░░·······░░░▒▓▒▒▒░·········░░░░░···                        ",
"                    ···░░░▒░░·░░·······░░░·········░░░░░░░░···                        ",
"                    ····░░░▒▒░░░·······      ······░▒▒▒▒░·····                        ",
"                    ····░░▒▒▒▒▒▒░····· ·····   ···░▒▓▒░░░···                          ",
"                       ·░░▒▒▓█▓▒▓░··············░░▒▓▓▒▒▒░···                          ",
"                        ░▒▒▒▒▒▓█▓▓▒░··········░▒▒▓█▓▒▒▒▒░·                            ",
"                        ·░░▒▒▒▒▓█▓▓▒░░░░░···░░░▒▓▓▒▒▒▒░░·                             ",
"                         ·░░░▒▒▒▒▒▒▒▓▓▒░░░▒▒▒▓▓▒▒▒▒▒▒▒░·                              ",
"      ···                ·░░░░▒▒▒▒▒▒▓▓█▓▒▒▓▓░░░▒░░▒▒▒░░·               ·              ",
"      ··            ·      ···░░▒▒▒▒▒▒░▒▒▒░░▒▒▒▒▒▒▒░░░·                ·              ",
"        ·            ···   ·░···░▒▒▒▒▒▒░░▒▒▒▒▒▒▒▒▒▒░·                                 ",
"                    ·        ····░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░··                                 ",
"        ·              ·      ·····░▒▒▒▒▒▒▒▒▒▒▒▒▒░·                                   ",
"        ·                       ···░░░▒▒▒▒▒▒▒▒▒▒░·                              ···   ",
"        ·  ·              ·      ···░░░░░▒░░░▒▒·         ··   ·                  ··   ",
];

const ROWS = ART.length;
const COLS = ART[0].length;
const FADE = ['█','▓','▒','░','·',' '] as const;

function fadeChar(ch: string, steps: number): string {
  const idx = FADE.indexOf(ch as typeof FADE[number]);
  if (idx < 0) return ch;
  return FADE[Math.min(FADE.length - 1, idx + steps)];
}

export default function AsciiPortrait() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLPreElement>(null);
  const mouseRef = useRef({ x: COLS / 2, y: ROWS / 2, active: false });
  const dragRef = useRef({ down: false, sx: 0, sy: 0, tx: 0, ty: 0, vx: 0, vy: 0, lastX: 0, lastY: 0, lastT: 0, rAF: 0 });

  function render() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const mouse = mouseRef.current;
    const out: string[] = [];
    for (let y = 0; y < ROWS; y++) {
      const row = ART[y];
      let line = '';
      for (let x = 0; x < COLS; x++) {
        const ch = row[x] || ' ';
        const mdx = x - mouse.x;
        const mdy = (y - mouse.y) * 0.6;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        const spot = mouse.active ? Math.max(0, 1 - md / 8) : 0;
        if (spot < 0.05) { line += ch; continue; }
        if (ch === ' ') {
          line += spot > 0.55 ? '·' : ' ';
        } else {
          line += fadeChar(ch, Math.round(spot * 3));
        }
      }
      out.push(line);
    }
    canvas.textContent = out.join('\n');
  }

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const mouse = mouseRef.current;

    function onMove(e: MouseEvent) {
      if (!wrapRef.current) return;
      const r = wrapRef.current.getBoundingClientRect();
      mouse.x = Math.max(0, Math.min(COLS - 1, ((e.clientX - r.left) / r.width) * COLS));
      mouse.y = Math.max(0, Math.min(ROWS - 1, ((e.clientY - r.top) / r.height) * ROWS));
      mouse.active = true;
      render();
    }
    function onLeave() { mouse.active = false; render(); }

    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);

    // idle sweep
    let t = 0;
    const idleTimer = setInterval(() => {
      if (mouse.active) return;
      t += 0.04;
      mouse.x = COLS * 0.5 + Math.sin(t) * COLS * 0.25;
      mouse.y = ROWS * 0.4 + Math.cos(t * 0.6) * ROWS * 0.15;
      mouse.active = true;
      render();
      mouse.active = false;
    }, 220);

    render();
    return () => {
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
      clearInterval(idleTimer);
    };
  }, []);

  // Draggable
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const d = dragRef.current;

    function start(e: MouseEvent | TouchEvent) {
      const target = wrapRef.current;
      if (!target) return;
      d.down = true;
      const p = 'touches' in e ? e.touches[0] : e;
      d.sx = p.clientX - d.tx; d.sy = p.clientY - d.ty;
      d.lastX = p.clientX; d.lastY = p.clientY; d.lastT = performance.now();
      target.classList.add('dragging'); target.classList.remove('springing');
      e.preventDefault();
    }
    function move(e: MouseEvent | TouchEvent) {
      const target = wrapRef.current;
      if (!d.down || !target) return;
      const p = 'touches' in e ? e.touches[0] : e;
      d.tx = p.clientX - d.sx; d.ty = p.clientY - d.sy;
      const now = performance.now(); const dt = Math.max(8, now - d.lastT);
      d.vx = (p.clientX - d.lastX) / dt * 16;
      d.vy = (p.clientY - d.lastY) / dt * 16;
      d.lastX = p.clientX; d.lastY = p.clientY; d.lastT = now;
      target.style.transform = `translate(${d.tx}px, ${d.ty}px) rotate(${d.tx * 0.02}deg)`;
    }
    function end() {
      const target = wrapRef.current;
      if (!d.down || !target) return;
      d.down = false; target.classList.remove('dragging');
      cancelAnimationFrame(d.rAF);
      let ax = d.vx, ay = d.vy;
      function fling() {
        const t = wrapRef.current;
        if (!t) return;
        d.tx += ax; d.ty += ay;
        ax *= 0.92; ay *= 0.92;
        t.style.transform = `translate(${d.tx}px, ${d.ty}px) rotate(${d.tx * 0.02}deg)`;
        if (Math.abs(ax) + Math.abs(ay) > 0.5) { d.rAF = requestAnimationFrame(fling); }
        else { springBack(); }
      }
      function springBack() {
        const t = wrapRef.current;
        if (!t) return;
        t.classList.add('springing');
        d.tx = 0; d.ty = 0;
        t.style.transform = 'translate(0,0) rotate(0)';
        setTimeout(() => wrapRef.current?.classList.remove('springing'), 600);
      }
      fling();
    }

    el.addEventListener('mousedown', start as EventListener);
    window.addEventListener('mousemove', move as EventListener);
    window.addEventListener('mouseup', end);
    el.addEventListener('touchstart', start as EventListener, { passive: false });
    window.addEventListener('touchmove', move as EventListener, { passive: false });
    window.addEventListener('touchend', end);
    return () => {
      el.removeEventListener('mousedown', start as EventListener);
      window.removeEventListener('mousemove', move as EventListener);
      window.removeEventListener('mouseup', end);
      el.removeEventListener('touchstart', start as EventListener);
      window.removeEventListener('touchmove', move as EventListener);
      window.removeEventListener('touchend', end);
    };
  }, []);

  return (
    <div className="portrait-wrap">
      <div
        ref={wrapRef}
        className="portrait"
        id="portrait"
        role="img"
        aria-label="ASCII portrait that reacts to your cursor"
      >
        <div className="pcap">
          <b>portrait.ascii — interactive</b>
          <div className="dots" aria-hidden="true"><i></i><i></i><i></i></div>
        </div>

        <pre ref={canvasRef} id="asciiCanvas" aria-hidden="true"></pre>
        <div className="sigline">
          <span>— move your cursor —</span>
          <span className="sig">dm</span>
        </div>
      </div>

      <div className="portrait-secret" aria-hidden="true">
        <span className="ps-line">↑ ↑ ↓ ↓ ← → ← → B A</span>
      </div>
    </div>
  );
}
