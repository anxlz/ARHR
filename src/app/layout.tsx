import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const cairo = localFont({ src: '../fonts/Cairo-Variable.ttf', variable: '--font', display: 'swap', weight: '200 1000' });
export const metadata: Metadata = { title: 'أثر الذكاء الاصطناعي على الدخل وتنمية الموارد البشرية', description: 'مبادرة جامعية — تنمية الموارد البشرية الريفية' };
// Runs before paint: avoids theme/direction flash and hydration mismatch (html has suppressHydrationWarning).
const init = `try{var d=document.documentElement,t=localStorage.getItem('theme'),l=localStorage.getItem('lang')==='en'?'en':'ar';if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t;d.lang=l;d.dir=l==='ar'?'rtl':'ltr'}catch(e){}`;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" data-theme="light" suppressHydrationWarning className={cairo.variable}>
      <head><script dangerouslySetInnerHTML={{ __html: init }} /></head>
      <body>{children}</body>
    </html>
  );
}
