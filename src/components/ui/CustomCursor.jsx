import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Premium morphing cursor:
 *
 *  DEFAULT   → small 36px orange ring + inner dot + trail blob
 *  HOVER     → ring expands & morphs to EXACT size/shape of hovered element
 *  CLICK     → everything shrinks (press feel)
 *
 * Works on: <a>, <button>, [role="button"], <input>, <label>, [data-cursor]
 */
export default function CustomCursor() {
  const ringRef  = useRef(null);
  const innerRef = useRef(null);
  const trailRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  const s = useRef({
    mx: -300, my: -300, // raw mouse
    rx: -300, ry: -300, // ring lerp (default mode)
    tx: -300, ty: -300, // trail lerp
    isHover: false,
    raf: 0,
  });

  /* ── Pointer / reduced-motion check ── */
  useEffect(() => {
    const mq  = window.matchMedia('(pointer: fine)');
    const rmq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const check = () => setEnabled(mq.matches && !rmq.matches);
    check();
    mq.addEventListener('change', check);
    rmq.addEventListener('change', check);
    return () => {
      mq.removeEventListener('change', check);
      rmq.removeEventListener('change', check);
    };
  }, []);

  /* ── Hide native cursor ── */
  useEffect(() => {
    if (enabled) document.documentElement.style.cursor = 'none';
    else document.documentElement.style.cursor = '';
    return () => { document.documentElement.style.cursor = ''; };
  }, [enabled]);

  /* ── Main logic ── */
  useEffect(() => {
    if (!enabled) return;
    const st = s.current;
    const ring  = ringRef.current;
    const inner = innerRef.current;
    const trail = trailRef.current;

    /* ── Mouse move ── */
    const onMove = (e) => {
      st.mx = e.clientX;
      st.my = e.clientY;
    };

    /* ── Hover: ring morphs to element bounds ── */
    const onOver = (e) => {
      const el = e.target.closest(
        'a, button, [role="button"], input, label, select, textarea, [data-cursor]'
      );
      if (!el || st.isHover) return;
      st.isHover = true;

      const rect     = el.getBoundingClientRect();
      const computed = window.getComputedStyle(el);
      const radius   = computed.borderRadius || '12px';
      const pad      = 6; // extra breathing room around element

      gsap.to(ring, {
        x: rect.left   - pad,
        y: rect.top    - pad,
        width:  rect.width  + pad * 2,
        height: rect.height + pad * 2,
        borderRadius: radius,
        borderColor: 'rgba(255,107,44,0.55)',
        backgroundColor: 'rgba(255,107,44,0.05)',
        duration: 0.45,
        ease: 'power3.out',
        overwrite: true,
      });

      // Shrink inner dot
      gsap.to(inner, {
        scale: 0.5,
        opacity: 0.6,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    /* ── Leave: ring returns to small circle following mouse ── */
    const onOut = (e) => {
      const el = e.target.closest(
        'a, button, [role="button"], input, label, select, textarea, [data-cursor]'
      );
      if (!el) return;
      st.isHover = false;

      gsap.to(ring, {
        width: 36,
        height: 36,
        borderRadius: '50%',
        borderColor: 'rgba(255,107,44,0.6)',
        backgroundColor: 'transparent',
        duration: 0.45,
        ease: 'power3.out',
        overwrite: true,
      });

      gsap.to(inner, {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    /* ── Click ── */
    const onDown = () => {
      gsap.to(inner, { scale: 0.4, duration: 0.12, ease: 'power3.out', overwrite: true });
      if (!st.isHover) {
        gsap.to(ring, { scale: 0.82, duration: 0.12, ease: 'power3.out', overwrite: true });
      } else {
        gsap.to(ring, { scale: 0.95, duration: 0.12, ease: 'power3.out', overwrite: true });
      }
    };
    const onUp = () => {
      gsap.to(inner, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.45)', overwrite: true });
      gsap.to(ring,  { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.45)', overwrite: true });
    };

    /* ── RAF loop ── */
    const tick = () => {
      // Trail: very slow
      st.tx += (st.mx - st.tx) * 0.055;
      st.ty += (st.my - st.ty) * 0.055;
      gsap.set(trail, { x: st.tx - 50, y: st.ty - 50 });

      // Inner dot: instant
      gsap.set(inner, { x: st.mx - 4, y: st.my - 4 });

      // Ring: lerp position ONLY when not locked onto an element
      if (!st.isHover) {
        st.rx += (st.mx - st.rx) * 0.14;
        st.ry += (st.my - st.ry) * 0.14;
        gsap.set(ring, { x: st.rx - 18, y: st.ry - 18 });
      }

      st.raf = requestAnimationFrame(tick);
    };
    st.raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover',  onOver);
    window.addEventListener('mouseout',   onOut);
    window.addEventListener('mousedown',  onDown);
    window.addEventListener('mouseup',    onUp);

    return () => {
      cancelAnimationFrame(st.raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover',  onOver);
      window.removeEventListener('mouseout',   onOut);
      window.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mouseup',    onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  const base = {
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 99999,
  };

  return (
    <>
      {/* ── Trail glow blob ── */}
      <div
        ref={trailRef}
        aria-hidden="true"
        style={{
          ...base,
          zIndex: 99997,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255,107,44,0.06)',
          filter: 'blur(22px)',
          willChange: 'transform',
        }}
      />

      {/* ── Morphing ring ── */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          ...base,
          zIndex: 99998,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,107,44,0.6)',
          background: 'transparent',
          willChange: 'transform, width, height, border-radius',
          /* SVG crosshair inside ring */
          overflow: 'visible',
        }}
      >
        <svg
          viewBox="0 0 36 36"
          width="100%"
          height="100%"
          style={{ position: 'absolute', inset: 0, overflow: 'visible', opacity: 0.4 }}
        >
          <line x1="18" y1="11" x2="18" y2="25" stroke="#FF6B2C" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="11" y1="18" x2="25" y2="18" stroke="#FF6B2C" strokeWidth="1.2" strokeLinecap="round" />
          {/* Outer tick marks */}
          <line x1="18" y1="-2" x2="18" y2="2"  stroke="#FF6B2C" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <line x1="18" y1="34" x2="18" y2="38" stroke="#FF6B2C" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <line x1="-2" y1="18" x2="2"  y2="18" stroke="#FF6B2C" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <line x1="34" y1="18" x2="38" y2="18" stroke="#FF6B2C" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        </svg>
      </div>

      {/* ── Inner dot ── */}
      <div
        ref={innerRef}
        aria-hidden="true"
        style={{
          ...base,
          zIndex: 99999,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#FF6B2C',
          boxShadow: '0 0 6px rgba(255,107,44,0.7)',
          willChange: 'transform',
        }}
      />
    </>
  );
}
