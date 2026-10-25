# Glide
## Glide through Andheri

Submission category: functional web-app prototype, not a production navigation service.

## Overview

Glide is a neighbourhood-first journey comparison app for Andheri, Mumbai. It presents Fastest, Most comfortable and Safest travel options, with sample fares, segment timing, crowd estimates, crowd reporting and an external Rapido fallback.

## Run

1. Extract the entire ZIP into a folder on Windows.
2. With Node.js installed, double-click `Start Glide.cmd`.
3. Keep the launcher open and use http://127.0.0.1:4173.

No Docker, account, API key or package installation is required to run the app. Internet access is required for map tiles and external links. On other platforms, run `node server.cjs` and open the local URL manually. The server binds only to this computer.

## Demonstration

1. Search Gundavali Metro to Mukesh Patel in the default planner.
2. Compare all three travel priorities and their segment breakdowns.
3. Swap the endpoints, then search DN Nagar or Andheri West Railway Station.
4. Select Safest and Now to view public-transport crowd reports. Submit Packed, then Seats available to demonstrate replacement. Remove your report afterwards.
5. Change the departure time to demonstrate typical crowd estimates rather than current reports.
6. Inspect the street map, zoom controls and map attribution.
7. Open the Rapido fallback. On desktop this opens its website; Android uses an app intent with a store fallback, while iOS opens the store listing.
8. Resize to a phone-width screen to demonstrate the responsive layout.

All 15 saved places are searchable as both origin and destination. All 210 distinct ordered pairs have three prototype options. This is saved-place search, not unrestricted address search.

## What Is Real

- Interactive Leaflet street map using OpenStreetMap tiles and attribution.
- Working place search, endpoint swap and three-mode comparison.
- Crowd reports saved on the local server, shared across browsers connected to that server, with report timestamps, replacement, removal and a 30-minute expiry.
- Responsive desktop/mobile interface and external ride links.

## Important Limitations

- Route itineraries, fares, journey times and departure intervals are sample or generated estimates. They are not verified schedules, bookings or quotes.
- Route polylines and background corridors are illustrative, not actual road/rail routing or turn-by-turn navigation. Do not use them for real travel guidance.
- The Safest label is a demonstration category; safety/comfort scores are illustrative and do not guarantee safety.
- Typical crowd levels use prototype time/day assumptions. Community reports are unverified, direction-specific transport-corridor reports, not vehicle occupancy feeds. Crowd levels do not currently reorder the route options.
- Reporting is local-server only. Public hosting, a production database, moderation and abuse prevention are required for citywide participation.
- Rapido fares, availability and trip booking remain external. Trip details are not prefilled; iOS does not currently deep-link directly into the installed app.
- Map availability depends on network access and the tile provider's policy. Failed tiles show an availability warning.

## Privacy and Distribution

No accounts or GPS tracking are used. The browser stores an anonymous reporting identifier so reports can be updated or removed. Reports are saved in `.data/crowd-reports.json`; active reports expire after 30 minutes and stale records are pruned on the next saved report. The submission ZIP excludes all local reporting data, screenshots, Git metadata and development dependencies.

Leaflet's license is included in `vendor/leaflet/LICENSE`. Map data is credited to OpenStreetMap contributors in the interface. Third-party tile usage rules still apply.

## Verification

- `node --check app.js`
- `node --check server.cjs`
- `node --test crowd-store.test.cjs`
- With a running app and Playwright available: `node crowd-ui.test.cjs`. Optionally set PLAYWRIGHT_PATH to the installed package and CHROME_PATH to Chrome.

The browser suite covers report creation, cross-browser sharing, replacement, removal, direction isolation, expiry, estimates, failure fallback, API validation and mobile overflow. Remote map downloads are blocked in the automated crowd tests; map rendering is checked separately.
