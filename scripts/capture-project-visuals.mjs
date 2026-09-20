import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const projects = [
  { name: 'securex', url: 'https://www.secureexchange.co.za/' },
  { name: 'doforyou', url: 'https://doforyou.co.za/' },
  { name: 'indaohub', url: 'https://indaohub.co.za/' },
  { name: 'tsebokgolo', url: 'https://tsebokgolo.co.za/' },
  { name: 'hazie', url: 'https://hazie-v2.web.app/' },
  { name: 'taxiconnect', url: 'https://taxiconnect-api.2co-mokolare.workers.dev/' },
  { name: 'dfy-staging', url: 'https://dfy-fe-staging.onrender.com/' }
];

const outputDir = 'src/assets/projects';
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  ignoreHTTPSErrors: true
});

const failures = [];

for (const project of projects) {
  const page = await context.newPage();
  try {
    await page.goto(project.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(2500);
    await page.screenshot({
      path: `${outputDir}/${project.name}.webp`,
      type: 'webp',
      quality: 88,
      fullPage: false,
      animations: 'disabled'
    });
    console.log(`Captured ${project.name}: ${page.url()}`);
  } catch (error) {
    failures.push(`${project.name}: ${error instanceof Error ? error.message : String(error)}`);
    console.error(`Failed ${project.name}`, error);
  } finally {
    await page.close();
  }
}

await browser.close();

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
}
