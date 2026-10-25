# Glide

Glide through Andheri.

The Glide Wing logo is included in `assets/glide-wing.png` and used in the header and browser icon. See `BRAND.md` for its design and generation notes.

A standalone prototype for an Andheri-first daily transport planner.

Double-click `Start Glide.cmd` to open the app. Node.js is the only requirement; no packages or Docker are needed. Keep the launcher window open while using it. Alternatively, run `node server.cjs` and open http://127.0.0.1:4173. Internet is required for street-map tiles and external ride links. See `SUBMISSION.md` for the demonstration checklist and limitations. It includes:

- Three route priorities: fastest, most comfortable, safest
- Sample route options for Andheri, Versova, DN Nagar, Airport T2, SEEPZ, Saki Naka, Marol, Juhu, and Ghatkopar
- Fare and timing breakdown per transport leg
- A simple safety/comfort scoring model
- A real OpenStreetMap-based route map using Leaflet
- A Rapido fallback link when public transport is not convenient or unavailable

New curated college routes include:

- Gundavali Metro to Mukesh Patel
- Andheri West Railway Station to Mukesh Patel
- DN Nagar Metro to Mukesh Patel
- Andheri West Metro to Mukesh Patel

All saved places appear in both the From and To search boxes. Curated routes work in both directions, and other place pairs fall back to generated fastest, comfortable, and safest options.

## Next Build Steps

1. Replace sample routes with GTFS-based schedules for BEST buses, metro, and suburban rail.
2. Add a small backend API for route scoring and fare rules.
3. Store local feedback such as unsafe crossings, crowding, lighting, and reliability.
4. Convert the web app into a PWA, then package it with Expo or Capacitor for mobile.

## Data Notes

The current routes are sample routes for product design and testing. Fare display now separates:

- Sample transit fares for metro and BEST examples (not verified official fares)
- Meter/app estimates for auto and cab examples
- Free walking segments

Production should use verified sources and license-safe datasets. For exact bus fares, the app needs stop-stage data from BEST rather than only straight-line distance.

## Crowd Levels

Public-transport route cards and bus/metro/train segments show Low, Moderate, or High crowd levels. The route summary uses the most crowded segment. Without reports, these are **prototype assumptions**, not measured occupancy: weekday morning/evening peaks are High, late-night/early-morning is Low, other periods are generally Moderate. Times use Mumbai's timezone. These estimates must be calibrated with actual data before launch; they do not change route rankings or safety scores.

For departures set to Now, travellers can submit Seats available, Standing room, or Packed. Reports are shared between browsers using the same app server, refreshed every minute, persisted in `.data/crowd-reports.json`, and ignored after 30 minutes. Each browser can replace or remove its report per directional origin/destination and transport type. The most-reported level wins, with ties favouring the more crowded level. Reports are corridor-level because the prototype has no verified service/vehicle identifiers. Reverse directions stay separate. Other departure times use estimates only.

An anonymous browser ID is stored locally to replace/remove reports; no GPS or account details are collected. Community reports are unverified and not live operator data. This local server is not a public crowdsourcing deployment: hosting, abuse controls, service identifiers and a production database are required before opening reporting to the public.

Run storage tests with `node --test crowd-store.test.cjs`. Browser workflow tests use `node crowd-ui.test.cjs` with Playwright installed (or `PLAYWRIGHT_PATH` pointing at the package) and optional `CHROME_PATH` pointing at Chrome; start the local app first. These tests block map downloads and remove their test reports afterwards.

## Map Source

The app uses the open-source Leaflet library from `vendor/leaflet` and OpenStreetMap raster tiles from `https://tile.openstreetmap.org/{z}/{x}/{y}.png`.

OpenStreetMap attribution is shown on the map. Run the app through the local server, not directly from a `file://` URL: web tile requests need a valid HTTP Referer under the OSM tile policy. Direct-file mode intentionally does not request tiles. The server and tile layer preserve the browser's real origin; no proxy or identity spoofing is used. Failed tiles are hidden and an availability warning appears. Browser caching remains enabled for tiles.

The public service is best-effort and subject to https://operations.osmfoundation.org/policies/tiles/. A public production app should use a dedicated tile provider or self-hosted tiles. Route lines are illustrative connections, not street-following navigation.

## Private Ride Fallback

The route detail panel includes an `Open Rapido` action. On Android, it uses an intent link for Rapido's passenger app package (`com.rapido.passenger`) and falls back to Google Play if the app cannot open. On iOS, it opens the App Store listing. On desktop, it opens Rapido's official website.
