const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { execFile } = require("node:child_process");
const { createCrowdStore } = require("./crowd-store.cjs");

const root = __dirname;
const host = "127.0.0.1";
const port = Number(process.env.PORT || 4173);
const url = `http://${host}:${port}`;
const crowdStore = createCrowdStore(path.join(root, ".data", "crowd-reports.json"), [
  "andheri-w", "andheri-west-metro", "andheri-e", "dn-nagar", "gundavali",
  "versova", "lokhandwala", "juhu", "mukesh-patel", "airport-t2", "marol",
  "saki-naka", "seepz", "ghatkopar", "aarey"
]);
const files = new Map([
  ["/", "index.html"],
  ["/index.html", "index.html"],
  ["/app.js", "app.js"],
  ["/styles.css", "styles.css"],
  ["/assets/glide-wing.png", "assets/glide-wing.png"],
  ["/vendor/leaflet/leaflet.js", "vendor/leaflet/leaflet.js"],
  ["/vendor/leaflet/leaflet.css", "vendor/leaflet/leaflet.css"],
  ...["marker-icon.png", "marker-icon-2x.png", "marker-shadow.png", "layers.png", "layers-2x.png"]
    .map((name) => [`/vendor/leaflet/images/${name}`, `vendor/leaflet/images/${name}`])
]);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".png": "image/png" };

function openBrowser() {
  if (process.argv.includes("--open")) {
    execFile("cmd.exe", ["/c", "start", "", url], { windowsHide: true });
  }
}

const server = http.createServer((request, response) => {
  if (new URL(request.url, url).pathname === "/api/crowds") {
    return handleCrowds(request, response);
  }
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    return response.end();
  }
  const file = files.get(new URL(request.url, url).pathname);
  if (!file) {
    response.writeHead(404);
    return response.end("Not found");
  }
  fs.readFile(path.join(root, file), (error, data) => {
    if (error) {
      response.writeHead(404);
      return response.end("Not found");
    }
    response.writeHead(200, {
      "Content-Type": types[path.extname(file)],
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Content-Type-Options": "nosniff"
    });
    response.end(request.method === "HEAD" ? undefined : data);
  });
});

function handleCrowds(request, response) {
  const send = (status, body) => {
    response.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" });
    response.end(JSON.stringify(body));
  };
  if (request.method === "GET") return send(200, { reports: crowdStore.list() });
  if (request.method !== "POST") return send(405, { error: "Method not allowed" });
  if (request.headers.origin !== url) return send(403, { error: "Open the app from its local address" });
  if (!request.headers["content-type"]?.startsWith("application/json")) {
    return send(415, { error: "Expected JSON" });
  }
  let body = "";
  let oversized = false;
  request.on("data", (chunk) => {
    if (oversized) return;
    if (Buffer.byteLength(body) + chunk.length > 4096) {
      oversized = true;
      send(413, { error: "Report too large" });
    } else body += chunk;
  });
  request.on("end", () => {
    if (oversized) return;
    let input;
    try { input = JSON.parse(body); } catch { return send(400, { error: "Invalid JSON" }); }
    try {
      send(200, { reports: crowdStore.save(input) });
    } catch (error) {
      const invalid = error.message === "Invalid crowd report";
      send(invalid ? 400 : 503, { error: invalid ? error.message : "Could not save report. Please try again." });
    }
  });
}

server.on("error", (error) => {
  console.error(error.code === "EADDRINUSE"
    ? `Port ${port} is already in use. Open ${url} if Glide is already running, or set PORT to another port.`
    : error.message);
  process.exitCode = 1;
});
server.listen(port, host, () => {
  console.log(`Glide is ready: ${url}\nKeep this window open while using the app.`);
  openBrowser();
});
