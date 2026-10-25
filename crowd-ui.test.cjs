const assert = require("node:assert/strict");
const path = require("node:path");
const os = require("node:os");
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  // Crowd tests do not need remote map downloads.
  await context.route("https://tile.openstreetmap.org/**", (route) => route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  let reporter;
  const base = "http://127.0.0.1:4173";
  try {
    await page.goto(base);
    await page.waitForFunction(() => crowdState.available);
    assert.equal(await page.locator("h1").innerText(), "Glide");
    assert.equal(await page.locator(".brand-tagline").innerText(), "Glide through Andheri");
    const checkedPairs = await page.evaluate(() => {
      let count = 0;
      for (const from of places) for (const to of places) {
        if (from.id === to.id) continue;
        const routes = getRoutes(from.id, to.id);
        for (const mode of ["fastest", "comfort", "safest"]) {
          const route = routes[mode];
          if (!route || route.path[0] !== from.id || route.path.at(-1) !== to.id
              || !route.legs.length || !Number.isFinite(route.fare)) throw new Error("Invalid route pair");
        }
        count++;
      }
      return count;
    });
    assert.equal(checkedPairs, 210);
    reporter = await page.evaluate(() => crowdState.reporter);
    await page.locator(".mode-card-safest").click();
    assert.equal(await page.locator(".crowd-report").count(), 2);
    assert.match(await page.locator(".mode-card-safest .crowd-summary").innerText(), /Typical/);
    const form = page.locator('.crowd-report[data-type="bus"]');
    await form.locator('input[value="2"]').check();
    await form.locator('button[type="submit"]').click();
    await page.waitForFunction(() => !crowdState.busy && crowdState.reports.some((r) => r.type === "bus"));
    assert.match(await form.locator(".crowd-feedback").innerText(), /saved/);
    assert.match(await page.locator(".mode-card-safest .crowd-summary").innerText(), /High crowd/);

    const other = await browser.newContext();
    await other.route("https://tile.openstreetmap.org/**", (route) => route.abort());
    const second = await other.newPage();
    await second.goto(base);
    await second.waitForFunction(() => crowdState.available);
    await second.locator(".mode-card-safest").click();
    assert.match(await second.locator(".crowd-reading").allTextContents().then((a) => a.join(" ")), /Community: 1 report/);
    await other.close();

    await form.locator('input[value="0"]').check();
    await form.locator('button[type="submit"]').click();
    await page.waitForFunction(() => !crowdState.busy && crowdState.reports.some((r) => r.type === "bus" && r.level === 0));
    assert.match(await form.locator("..").innerText(), /Low crowd/);
    await page.locator('[data-time="morning"]').click();
    assert.equal(await page.locator(".crowd-report").count(), 0);
    assert.equal(await page.evaluate(() => segmentCrowd("bus").community), false);
    const model = await page.evaluate(() => {
      const time = state.time;
      const reports = crowdState.reports;
      state.time = "now";
      const expired = segmentCrowd("bus", Date.now() + 31 * 60000).community;
      crowdState.reports = [0, 2].map((level) => ({ from: state.from, to: state.to, type: "bus", level, at: Date.now() }));
      const tie = segmentCrowd("bus").level;
      crowdState.reports = reports;
      state.time = time;
      return {
        peak: typicalCrowd("bus", "morning", new Date("2026-10-26T03:00:00Z")),
        night: typicalCrowd("bus", "night"),
        weekend: typicalCrowd("bus", "morning", new Date("2026-10-25T03:00:00Z")),
        expired, tie
      };
    });
    assert.deepEqual(model, { peak: 2, night: 0, weekend: 0, expired: false, tie: 2 });
    await page.locator('[data-time="now"]').click();
    await page.locator("#swapButton").click();
    assert.equal(await page.evaluate(() => segmentCrowd("bus").community), false);
    await page.locator("#swapButton").click();
    await page.screenshot({ path: path.join(os.tmpdir(), "glide-crowds-desktop.png"), fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.evaluate(() => document.body.scrollWidth > innerWidth), false);
    await page.screenshot({ path: path.join(os.tmpdir(), "glide-crowds-mobile.png"), fullPage: true });
    await form.locator("[data-clear-report]").click();
    await page.waitForFunction(() => !crowdState.busy && !crowdState.reports.some((r) => r.type === "bus"));
    assert.match(await form.locator(".crowd-feedback").innerText(), /removed/);

    await page.route("**/api/crowds", (route) => route.abort());
    await page.evaluate(() => { document.activeElement.blur(); return refreshCrowds(); });
    assert.notEqual(await form.locator("fieldset").getAttribute("disabled"), null);
    assert.match(await form.innerText(), /unavailable/);
    assert.deepEqual(errors, []);
    const invalid = await context.request.post(`${base}/api/crowds`, {
      headers: { Origin: base }, data: { from: "unknown" }
    });
    assert.equal(invalid.status(), 400);
    const forbidden = await context.request.post(`${base}/api/crowds`, {
      headers: { Origin: "https://example.org" }, data: {}
    });
    assert.equal(forbidden.status(), 403);
    console.log("PASS: reporting, two-browser sharing, replacement, removal, direction isolation, time estimates, expiry, outage, validation, desktop and mobile layout");
  } finally {
    if (reporter) {
      await context.request.post(`${base}/api/crowds`, {
        headers: { Origin: base },
        data: { from: "gundavali", to: "mukesh-patel", type: "bus", level: null, reporter }
      });
    }
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
