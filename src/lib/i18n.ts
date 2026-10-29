export type Lang = 'ar' | 'en';
export const SLIDES = 16;
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const asset = (p: string) => base + p;
export const VIDEO_SRC = '/video/hero.mp4';
export const VIDEO_POSTER = '/video/hero-poster.jpg';
export const slideSrc = (i: number) => asset(`/slides/slide-${String(i + 1).padStart(2, '0')}.jpg`);
export const S = {
  ar: {
    title: 'أثر الذكاء الاصطناعي على مستوى دخل الفرد وتنمية الموارد البشرية',
    sub: 'مبادرة جامعية — مقرر تنمية الموارد البشرية الريفية',
    brand: 'مبادرة الذكاء الاصطناعي والتنمية البشرية', cue: 'اطّلع على العرض',
    pres: 'عرض', video: 'فيديو', mode: 'وضع العرض', share: 'مشاركة المبادرة', copy: 'نسخ الرابط', copied: 'تم النسخ',
    close: 'إغلاق', scan: 'امسح الرمز لفتح الموقع', prev: 'الشريحة السابقة', next: 'الشريحة التالية', fs: 'ملء الشاشة',
    theme: 'تبديل الوضع الداكن', lang: 'English', slide: (i: number, n: number) => `الشريحة ${i} من ${n}`,
    fail: 'تعذّر تشغيل الفيديو. يمكنك التبديل إلى وضع العرض.', temp: 'الرابط مؤقت: لم يُحدَّد رابط النشر النهائي بعد.',
    dlPng: 'تنزيل PNG', dlSvg: 'تنزيل SVG', vtitle: 'الفيديو', ptitle: 'العرض التقديمي', thumbs: 'قائمة الشرائح',
  },
  en: {
    title: 'The Impact of Artificial Intelligence on Individual Income and Human Resource Development',
    sub: 'University initiative — Rural Human Resource Development course',
    brand: 'AI & Human Development Initiative', cue: 'View the presentation',
    pres: 'Slides', video: 'Video', mode: 'Display mode', share: 'Share initiative', copy: 'Copy link', copied: 'Copied',
    close: 'Close', scan: 'Scan to open the website', prev: 'Previous slide', next: 'Next slide', fs: 'Fullscreen',
    theme: 'Toggle dark mode', lang: 'العربية', slide: (i: number, n: number) => `Slide ${i} of ${n}`,
    fail: 'The video could not be played. You can switch to slides.', temp: 'Placeholder link: the final public URL has not been set yet.',
    dlPng: 'Download PNG', dlSvg: 'Download SVG', vtitle: 'Video', ptitle: 'Presentation', thumbs: 'Slide list',
  },
};
