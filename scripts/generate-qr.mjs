// Regenerates public/assets/qr/initiative-qr.{png,svg} from site.config.json (single source of truth).
import QRCode from 'qrcode';
import { readFileSync, mkdirSync } from 'node:fs';
const { publicUrl, productionReady } = JSON.parse(readFileSync(new URL('../site.config.json', import.meta.url)));
if (/localhost|127\.0\.0\.1/.test(publicUrl)) { console.error('publicUrl must not be localhost.'); process.exit(1); }
if (!productionReady) console.warn('WARNING: productionReady=false, QR encodes a placeholder URL: ' + publicUrl);
const dir = new URL('../public/assets/qr/', import.meta.url).pathname;
mkdirSync(dir, { recursive: true });
const o = { errorCorrectionLevel: 'Q', margin: 4, color: { dark: '#000000', light: '#ffffff' } };
await QRCode.toFile(dir + 'initiative-qr.png', publicUrl, { ...o, width: 1600 });
await QRCode.toFile(dir + 'initiative-qr.svg', publicUrl, { ...o, type: 'svg' });
console.log('QR written for', publicUrl);
