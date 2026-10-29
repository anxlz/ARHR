'use client';
import { useEffect, useRef, useState } from 'react';
import Share from './Share';
import Viewer from './Viewer';
import { asset, S, Lang, VIDEO_POSTER, VIDEO_SRC, HERO_SRC } from '../lib/i18n';

type Mode = 'presentation' | 'video';
export default function App() {
  const [lang, setLang] = useState<Lang>('ar'); const [dark, setDark] = useState(false);
  const [mode, setMode] = useState<Mode>('presentation'); const [i, setI] = useState(0); const [failed, setFailed] = useState(false);
  const player = useRef<HTMLVideoElement>(null); const hero = useRef<HTMLVideoElement>(null); const t = S[lang];

  useEffect(() => {
    try {
      if (localStorage.getItem('lang') === 'en') setLang('en');
      setDark(document.documentElement.dataset.theme === 'dark');
      if (localStorage.getItem('mode') === 'video') setMode('video');
    } catch {}
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) hero.current?.pause();
  }, []);
  const store = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch {} };
  const flipLang = () => { const l = lang === 'ar' ? 'en' : 'ar'; setLang(l); store('lang', l); const d = document.documentElement; d.lang = l; d.dir = l === 'ar' ? 'rtl' : 'ltr'; };
  const flipTheme = () => { const n = !dark; setDark(n); document.documentElement.dataset.theme = n ? 'dark' : 'light'; store('theme', n ? 'dark' : 'light'); };
  const pick = (m: Mode) => { setMode(m); store('mode', m); if (m === 'presentation') player.current?.pause(); };

  return (
    <>
      <a className="skip" href="#stage">{lang === 'ar' ? 'تخطَّ إلى المحتوى' : 'Skip to content'}</a>
      <header className="bar">
        <span className="brand">{t.brand}</span>
        <div className="ctl">
          <div className="seg" role="group" aria-label={t.mode}>
            <button aria-pressed={mode === 'presentation'} onClick={() => pick('presentation')}>{t.pres}</button>
            <button aria-pressed={mode === 'video'} onClick={() => pick('video')}>{t.video}</button>
          </div>
          <button className="icon" onClick={flipLang} lang={lang === 'ar' ? 'en' : 'ar'}>{t.lang}</button>
          <button className="icon" onClick={flipTheme} aria-pressed={dark} aria-label={t.theme} title={t.theme}>{dark ? '☀' : '☾'}</button>
          <Share lang={lang} />
        </div>
      </header>

      <section className="hero" aria-labelledby="h1">
        <video ref={hero} className="bg" autoPlay muted loop playsInline preload="metadata" poster={asset(VIDEO_POSTER)} aria-hidden="true" tabIndex={-1}>
          <source src={asset(HERO_SRC)} type="video/mp4" />
        </video>
        <div className="shade" />
        <div className="copy">
          <p className="eyebrow">{t.sub}</p>
          <h1 id="h1">{t.title}</h1>
          <a className="cue" href="#stage">{t.cue}<span aria-hidden>↓</span></a>
        </div>
      </section>

      <main id="stage" className="stage" tabIndex={-1}>
        <div hidden={mode !== 'presentation'}><Viewer i={i} setI={setI} lang={lang} /></div>
        <div hidden={mode !== 'video'} className="vwrap">
          {failed ? (
            <div className="fallback" role="alert"><img src={asset(VIDEO_POSTER)} alt="" /><p>{t.fail}</p></div>
          ) : (
            <video ref={player} controls playsInline preload="metadata" poster={asset(VIDEO_POSTER)} aria-label={t.vtitle} onError={() => setFailed(true)}>
              <source src={asset(VIDEO_SRC)} type="video/mp4" onError={() => setFailed(true)} />
            </video>
          )}
        </div>
      </main>
    </>
  );
}
