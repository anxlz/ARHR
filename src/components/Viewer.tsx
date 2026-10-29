'use client';
import { useRef } from 'react';
import { S, SLIDES, slideSrc, Lang } from '../lib/i18n';

const Chev = ({ left }: { left?: boolean }) => (
  <svg className="flip" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={left ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
);

export default function Viewer({ i, setI, lang }: { i: number; setI: (n: number) => void; lang: Lang }) {
  const t = S[lang]; const rtl = lang === 'ar'; const root = useRef<HTMLDivElement>(null); const sx = useRef(0);
  const go = (d: number) => setI(Math.min(SLIDES - 1, Math.max(0, i + d)));
  const onKey = (e: React.KeyboardEvent) => {
    const nx = rtl ? 'ArrowLeft' : 'ArrowRight', pv = rtl ? 'ArrowRight' : 'ArrowLeft';
    if (e.key === nx || e.key === 'PageDown') go(1); else if (e.key === pv || e.key === 'PageUp') go(-1);
    else if (e.key === 'Home') setI(0); else if (e.key === 'End') setI(SLIDES - 1); else return;
    e.preventDefault();
  };
  const fs = () => { const el = root.current; if (!el) return; document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen?.(); };
  return (
    <div ref={root} className="viewer" tabIndex={0} onKeyDown={onKey} role="region" aria-roledescription="carousel" aria-label={t.ptitle}>
      <div className="vstage" onTouchStart={(e) => (sx.current = e.touches[0].clientX)}
        onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - sx.current; if (Math.abs(dx) > 50) go((rtl ? dx > 0 : dx < 0) ? 1 : -1); }}>
        <button className="nav" onClick={() => go(-1)} disabled={i === 0} aria-label={t.prev}><Chev left /></button>
        <img className="slide" src={slideSrc(i)} alt={t.slide(i + 1, SLIDES)} width={1467} height={825} />
        <button className="nav" onClick={() => go(1)} disabled={i === SLIDES - 1} aria-label={t.next}><Chev /></button>
        {i < SLIDES - 1 && <link rel="prefetch" as="image" href={slideSrc(i + 1)} />}
      </div>
      <div className="vbar">
        <span aria-live="polite">{t.slide(i + 1, SLIDES)}</span>
        <button className="btn" onClick={fs}>{t.fs}</button>
      </div>
      <ol className="thumbs" aria-label={t.thumbs}>
        {Array.from({ length: SLIDES }, (_, k) => (
          <li key={k}><button aria-current={k === i} aria-label={t.slide(k + 1, SLIDES)} onClick={() => setI(k)}>
            <img src={slideSrc(k)} alt="" loading="lazy" width={160} height={90} /></button></li>
        ))}
      </ol>
    </div>
  );
}
