// Prerenders each static page in dist/ with a headless browser and writes
// the rendered DOM back to disk, so AI/search crawlers that don't execute
// JavaScript (GPTBot, ClaudeBot) see real content instead of an empty
// `<div id="root">`. The client bundle still loads and hydrates normally
// for real visitors — this only changes what's in the initial HTML byte.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Vercel's build image lacks the shared libraries (libnspr4, libnss3, ...)
// that puppeteer's bundled Chromium needs, so on Vercel we launch a
// statically-linked Chromium built for serverless/CI containers instead.
// Locally, plain puppeteer's own Chromium download works fine.
const launchOptions = process.env.VERCEL
  ? await (async () => {
      const { default: chromium } = await import('@sparticuz/chromium');
      return { args: chromium.args, executablePath: await chromium.executablePath(), headless: true };
    })()
  : { headless: 'new' };
const puppeteer = process.env.VERCEL
  ? (await import('puppeteer-core')).default
  : (await import('puppeteer')).default;

const DIST = fileURLToPath(new URL('../dist', import.meta.url));
const PAGES = ['index.html', 'benchmarks.html', 'benchmarks/data-based-models.html', 'benchmarks/zylectra-vs-wang.html'];
const PORT = 4173;

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.webp': 'image/webp', '.json': 'application/json',
  '.mp4': 'video/mp4', '.ico': 'image/x-icon',
};

function serveDist() {
  const server = createServer(async (req, res) => {
    const path = req.url === '/' ? '/index.html' : req.url.split('?')[0];
    try {
      const data = await readFile(join(DIST, path));
      res.writeHead(200, { 'Content-Type': MIME[extname(path)] || 'application/octet-stream' });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

const server = await serveDist();
const browser = await puppeteer.launch(launchOptions);

for (const page of PAGES) {
  const tab = await browser.newPage();
  await tab.goto(`http://localhost:${PORT}/${page}`, { waitUntil: 'networkidle0' });
  await tab.waitForSelector('#root main, #root > *', { timeout: 10000 });
  const html = await tab.evaluate(() => '<!doctype html>\n' + document.documentElement.outerHTML);
  const fs = await import('node:fs/promises');
  await fs.writeFile(join(DIST, page), html);
  console.log(`prerendered ${page}`);
  await tab.close();
}

await browser.close();
server.close();
