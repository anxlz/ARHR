# The Impact of AI on Individual Income and Human Resource Development

Static, bilingual (Arabic RTL default / English LTR) Next.js site. No backend, database, auth or external runtime services.

**Important:** this version was rebuilt from scratch because the uploaded project ZIP contained only empty folders. It has not been through `npm install`, `next build` or a browser run (the authoring sandbox had no network). Run the commands below and fix anything that fails.

## Run / build
```bash
npm install
npm run dev            # http://localhost:3000
npm run lint           # TypeScript check
npm run build          # regenerates the QR, then exports the static site to ./out
npx serve out          # test the export locally
```
Hosting under a sub-path (e.g. GitHub Pages): `NEXT_PUBLIC_BASE_PATH=/repo-name npm run build`.

## Assets
| What | Where |
|---|---|
| Hero / Video-mode video | `public/video/hero.mp4` (+ `hero-poster.jpg`); path set in `src/lib/i18n.ts` (`VIDEO_SRC`, `VIDEO_POSTER`) |
| Original PowerPoint (for editing) | `source/deck-ai-human-development.pptx` (not published) |
| Slide images (what the viewer shows) | `public/slides/slide-01.jpg … slide-16.jpg`; count in `SLIDES` in `src/lib/i18n.ts` |
| Cairo font (SIL OFL, local) | `src/fonts/Cairo-Variable.ttf` |
| QR files | `public/assets/qr/initiative-qr.png` and `.svg` |

## How the presentation viewer works
The PPTX is not rendered in the browser. Each slide was exported to a JPEG (LibreOffice → PDF → `pdftoppm`, 110 dpi, Cairo installed) and the viewer shows those images: previous/next, arrow keys (direction-aware in RTL), Home/End, swipe, thumbnails, fullscreen. Slides are images of the Arabic deck, so they do not change with the language toggle and text inside them is not selectable. **If you edit the PPTX, re-export the slides** (PowerPoint: File → Export → JPEG, or the LibreOffice steps above), name them `slide-NN.jpg`, update `SLIDES` if the count changed. Rendering was checked visually as a contact sheet only; PowerPoint animations/transitions are not reproduced, and LibreOffice may differ slightly from PowerPoint.

## Public URL and QR code
Single source of truth: `site.config.json`.
```json
{ "publicUrl": "https://your-real-site.example/", "productionReady": true }
```
Then run `npm run qr` (also runs automatically before `npm run build`). It rewrites `public/assets/qr/initiative-qr.png` (1600 px, white background, 4-module quiet zone) and `.svg`. The share popover and these files use the same URL. **The shipped QR encodes the placeholder `https://REPLACE-WITH-FINAL-URL.example/` and is NOT production-ready**; the popover shows a warning until `productionReady` is `true`. Scan-test the printed code before use. (The shipped PNG/SVG were made with OpenCV and decode correctly to the placeholder; `npm run qr` uses the `qrcode` package.)

## Offline
Once the exported `out/` folder is served (any static server, or a host), nothing is loaded from a CDN: font, slides, video and scripts are all local. Not verified: opening `out/index.html` via `file://` (Next absolute asset paths usually need a server), and no service worker is included, so a page is not available offline until it has loaded from a server at least once.

## Dependencies
`next`, `react`, `react-dom` (framework); `typescript`, `@types/*` (checks); `qrcode` (dev only, QR file generation). No animation library: motion is CSS only and respects `prefers-reduced-motion`.

## Not included
The first brief's scroll-driven content slides, JSON slide schema, charts/survey-data section: the supplied PPTX replaced them. No survey data exists in this project.
