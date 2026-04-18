import { useEffect, useRef, useState } from 'react';

interface Props {
  items: string[];
}

const PIN_KEY = 'dm_pins_v1';
const TICK_REMOVED_KEY = 'dm_ticker_removed_v1';
const LOOP_DURATION_S = 42;
const SPEED_NORMALIZE_FACTOR = 0.018;
const MAX_SPEED_MULTIPLIER = 8;

export default function HomeTicker({ items }: Props) {
  const tickerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [pins, setPins] = useState<string[]>([]);
  const [removed, setRemoved] = useState<Set<string>>(new Set());
  const chipDragRef = useRef<{ chip: HTMLElement | null; text: string; x: number; y: number; clone: HTMLElement | null } | null>(null);

  useEffect(() => {
    try {
      const savedPins: string[] = JSON.parse(localStorage.getItem(PIN_KEY) || '[]');
      const savedRemoved: string[] = JSON.parse(localStorage.getItem(TICK_REMOVED_KEY) || '[]');
      setPins(savedPins);
      setRemoved(new Set(savedRemoved));
    } catch {}
  }, []);

  function savePins(next: string[]) {
    localStorage.setItem(PIN_KEY, JSON.stringify(next));
  }
  function saveRemoved(next: Set<string>) {
    localStorage.setItem(TICK_REMOVED_KEY, JSON.stringify([...next]));
  }

  function addPin(text: string) {
    setPins(prev => {
      if (prev.includes(text)) return prev;
      const next = [...prev, text];
      savePins(next);
      return next;
    });
    setRemoved(prev => {
      const next = new Set(prev);
      next.add(text);
      saveRemoved(next);
      return next;
    });
  }

  function removePin(text: string) {
    setPins(prev => {
      const next = prev.filter(p => p !== text);
      savePins(next);
      return next;
    });
    setRemoved(prev => {
      const next = new Set(prev);
      next.delete(text);
      saveRemoved(next);
      return next;
    });
  }

  // JS animation loop replacing CSS animation
  useEffect(() => {
    const track = trackRef.current;
    const ticker = tickerRef.current;
    if (!track || !ticker) return;

    track.style.animation = 'none';

    let rafId: number;
    let halfWidth = 0;
    let defaultSpeed = 0;
    const xRef = { current: 0 };
    const speedRef = { current: 0 };
    let isDragging = false;
    let lastX = 0;
    let lastTime = 0;

    function init() {
      halfWidth = track!.scrollWidth / 2;
      defaultSpeed = -halfWidth / (LOOP_DURATION_S * 60);
      if (speedRef.current === 0) speedRef.current = defaultSpeed;
    }

    function tick() {
      if (!halfWidth) init();

      if (!isDragging) {
        speedRef.current += (defaultSpeed - speedRef.current) * SPEED_NORMALIZE_FACTOR;
      }

      xRef.current += speedRef.current;
      if (xRef.current <= -halfWidth) xRef.current += halfWidth;
      if (xRef.current >= 0) xRef.current -= halfWidth;

      track!.style.transform = `translateX(${xRef.current}px)`;
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    function onMarqueeDown(e: PointerEvent) {
      const chip = (e.target as HTMLElement).closest('[data-ticker-item]');
      if (chip) return;

      isDragging = true;
      lastX = e.clientX;
      lastTime = performance.now();
      ticker!.style.cursor = 'grabbing';
      e.preventDefault();
      try { ticker!.setPointerCapture(e.pointerId); } catch {}
    }

    function onMarqueeMove(e: PointerEvent) {
      if (!isDragging) return;
      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 0) {
        const dx = e.clientX - lastX;
        const rawSpeed = (dx / dt) * 16;
        const maxSpeed = Math.abs(defaultSpeed) * MAX_SPEED_MULTIPLIER;
        speedRef.current = Math.max(-maxSpeed, Math.min(maxSpeed, rawSpeed));
      }
      lastX = e.clientX;
      lastTime = now;
    }

    function onMarqueeUp() {
      if (!isDragging) return;
      isDragging = false;
      ticker!.style.cursor = '';
    }

    ticker.addEventListener('pointerdown', onMarqueeDown);
    ticker.addEventListener('pointermove', onMarqueeMove);
    ticker.addEventListener('pointerup', onMarqueeUp);
    ticker.addEventListener('pointercancel', onMarqueeUp);

    return () => {
      cancelAnimationFrame(rafId);
      ticker.removeEventListener('pointerdown', onMarqueeDown);
      ticker.removeEventListener('pointermove', onMarqueeMove);
      ticker.removeEventListener('pointerup', onMarqueeUp);
      ticker.removeEventListener('pointercancel', onMarqueeUp);
    };
  }, []);

  // Chip drag-to-pinboard
  useEffect(() => {
    const track = trackRef.current;
    const board = boardRef.current;
    if (!track || !board || window.matchMedia('(pointer: coarse)').matches) return;

    function onPointerDown(e: PointerEvent) {
      const chip = (e.target as HTMLElement).closest<HTMLElement>('span[data-ticker-item]');
      if (!chip) return;
      chipDragRef.current = { chip, text: chip.dataset.tickerItem || '', x: e.clientX, y: e.clientY, clone: null };
      e.preventDefault();
      try { track!.setPointerCapture(e.pointerId); } catch {}
    }

    function onPointerMove(e: PointerEvent) {
      const d = chipDragRef.current;
      if (!d || !board) return;
      const dx = e.clientX - d.x, dy = e.clientY - d.y;
      if (!d.clone && (Math.abs(dx) + Math.abs(dy) > 6)) {
        const c = d.chip!.cloneNode(true) as HTMLElement;
        c.style.cssText = `position:fixed;z-index:2000;pointer-events:none;background:var(--paper);border:1px solid var(--ink);padding:4px 10px;font-family:var(--mono);font-size:11.5px;`;
        document.body.appendChild(c);
        d.clone = c;
        d.chip!.style.opacity = '0.2';
      }
      if (d.clone) {
        d.clone.style.left = (e.clientX + 8) + 'px';
        d.clone.style.top  = (e.clientY + 8) + 'px';
        const r = board.getBoundingClientRect();
        const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
        board.classList.toggle('drop', inside);
      }
    }

    function onPointerUp(e: PointerEvent) {
      const d = chipDragRef.current;
      if (!d) return;
      if (board) {
        const r = board.getBoundingClientRect();
        const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
        if (inside && d.text) addPin(d.text);
        board.classList.remove('drop');
      }
      if (d.clone) d.clone.remove();
      if (d.chip) d.chip.style.opacity = '';
      chipDragRef.current = null;
    }

    track.addEventListener('pointerdown', onPointerDown);
    track.addEventListener('pointermove', onPointerMove);
    track.addEventListener('pointerup', onPointerUp);
    return () => {
      track.removeEventListener('pointerdown', onPointerDown);
      track.removeEventListener('pointermove', onPointerMove);
      track.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  const visible = items.filter(t => !removed.has(t));
  const doubled = [...visible, ...visible];

  return (
    <>
      <div className="ticker" aria-hidden="true" ref={tickerRef}>
        <div className="track" ref={trackRef}>
          {doubled.map((item, i) => (
            <span
              key={i}
              data-ticker-item={item}
              style={{ display: removed.has(item) ? 'none' : undefined }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div
        ref={boardRef}
        className="pinboard"
        id="pinboard"
        aria-label="Pinboard — drag chips here"
      >
        <span className="plabel">// pinned</span>
        {pins.length === 0 && (
          <span className="pempty">drag chips from the ticker above to pin them here ✎</span>
        )}
        {pins.map((text) => (
          <span key={text} className="pin">
            <span>{text}</span>
            <button aria-label="remove" onClick={() => removePin(text)}>✕</button>
          </span>
        ))}
      </div>
    </>
  );
}
