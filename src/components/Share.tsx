'use client';
import { useEffect, useRef, useState } from 'react';
import cfg from '../../site.config.json';
import { asset, S, Lang } from '../lib/i18n';

export default function Share({ lang }: { lang: Lang }) {
  const t = S[lang]; const [open, setOpen] = useState(false); const [done, setDone] = useState(false);
  const box = useRef<HTMLDivElement>(null); const btn = useRef<HTMLButtonElement>(null); const x = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    x.current?.focus();
    const down = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); } };
    document.addEventListener('mousedown', down); document.addEventListener('keydown', key);
    return () => { document.removeEventListener('mousedown', down); document.removeEventListener('keydown', key); };
  }, [open]);
  const copy = async () => { try { await navigator.clipboard.writeText(cfg.publicUrl); setDone(true); setTimeout(() => setDone(false), 1800); } catch {} };
  return (
    <div className="share" ref={box}>
      <button ref={btn} className="icon" aria-label={t.share} title={t.share} aria-expanded={open} aria-haspopup="dialog" onClick={() => setOpen(!open)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></svg>
      </button>
      {open && (
        <div className="pop" role="dialog" aria-label={t.share}>
          <button ref={x} className="icon sm close" aria-label={t.close} onClick={() => { setOpen(false); btn.current?.focus(); }}>✕</button>
          <img className="qr" src={asset('/assets/qr/initiative-qr.svg')} width={168} height={168} alt={t.scan} />
          <p className="scan">{t.scan}</p>
          <p className="url" dir="ltr">{cfg.publicUrl}</p>
          {!cfg.productionReady && <p className="warn" role="note">{t.temp}</p>}
          <div className="row">
            <button className="btn" onClick={copy}>{done ? t.copied : t.copy}</button>
            <a className="btn" href={asset('/assets/qr/initiative-qr.png')} download>{t.dlPng}</a>
            <a className="btn" href={asset('/assets/qr/initiative-qr.svg')} download>{t.dlSvg}</a>
          </div>
        </div>
      )}
    </div>
  );
}
