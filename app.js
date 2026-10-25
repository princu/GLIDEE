const places = [
  { id: "andheri-w", name: "Andheri West Railway Station", short: "Andheri W", x: 38, y: 38, lat: 19.1197, lng: 72.8468, labelDy: -3, aliases: ["Andheri West Station", "Andheri W Railway", "Andheri Station West"] },
  { id: "andheri-west-metro", name: "Andheri West Metro", short: "Andheri W Metro", x: 32, y: 46, lat: 19.1202, lng: 72.8378, labelDx: -3, labelDy: 1, labelAnchor: "end", aliases: ["Andheri West Metro Station", "Andheri W Metro Station"] },
  { id: "andheri-e", name: "Andheri Station E", short: "Andheri E", x: 47, y: 38, lat: 19.1197, lng: 72.8519, labelDx: 2, labelDy: 7, aliases: ["Andheri East", "Andheri East Station", "Andheri Station East"] },
  { id: "dn-nagar", name: "DN Nagar Metro", short: "DN Nagar", x: 25, y: 38, lat: 19.1286, lng: 72.8319, labelDy: 7, aliases: ["DN Nagar Metro Station", "D N Nagar"] },
  { id: "gundavali", name: "Gundavali Metro", short: "Gundavali", x: 54, y: 30, lat: 19.1164, lng: 72.8561, labelDx: 4, labelDy: 3, aliases: ["Gundavali Metro Station"] },
  { id: "versova", name: "Versova", short: "Versova", x: 12, y: 34, lat: 19.1351, lng: 72.8146, aliases: ["Versova Metro", "Versova Metro Station"] },
  { id: "lokhandwala", name: "Lokhandwala", short: "Lokhandwala", x: 18, y: 18, lat: 19.1431, lng: 72.8244, aliases: ["Lokhandwala Complex", "Lokhandwala Circle"] },
  { id: "juhu", name: "Juhu Circle", short: "Juhu", x: 26, y: 57, lat: 19.1075, lng: 72.8263, labelDx: -4, labelDy: -4, aliases: ["Juhu", "Juhu Scheme"] },
  { id: "mukesh-patel", name: "Mukesh Patel", short: "Mukesh Patel", x: 42, y: 61, lat: 19.1039, lng: 72.8368, labelDx: 4, labelDy: -1, labelAnchor: "start", aliases: ["Mukesh Patel Engineering", "Mukesh Patel College", "MPSTME", "NMIMS", "NMIMS Mukesh Patel"] },
  { id: "airport-t2", name: "Airport T2", short: "T2", x: 58, y: 48, lat: 19.0896, lng: 72.8656, aliases: ["Mumbai Airport T2", "CSIA T2", "Terminal 2"] },
  { id: "marol", name: "Marol Naka", short: "Marol", x: 67, y: 38, lat: 19.1089, lng: 72.8792, aliases: ["Marol Naka Metro", "Marol Metro"] },
  { id: "saki-naka", name: "Saki Naka", short: "Saki Naka", x: 78, y: 38, lat: 19.1035, lng: 72.8881, aliases: ["Saki Naka Metro", "Sakinaka"] },
  { id: "seepz", name: "SEEPZ Gate", short: "SEEPZ", x: 62, y: 22, lat: 19.1264, lng: 72.8761, aliases: ["SEEPZ", "SEEPZ Gate Andheri"] },
  { id: "ghatkopar", name: "Ghatkopar Metro", short: "Ghatkopar", x: 92, y: 38, lat: 19.0865, lng: 72.908, aliases: ["Ghatkopar Metro Station", "Ghatkopar Station"] },
  { id: "aarey", name: "Aarey JVLR", short: "Aarey", x: 71, y: 14, lat: 19.1473, lng: 72.8846, aliases: ["Aarey", "Aarey Colony", "Aarey JVLR"] }
];

const corridors = [
  { type: "base-metro", points: ["versova", "dn-nagar", "andheri-w", "andheri-e", "marol", "saki-naka", "ghatkopar"] },
  { type: "base-metro", points: ["dn-nagar", "andheri-west-metro"] },
  { type: "base-metro", points: ["gundavali", "andheri-e"] },
  { type: "base-rail", points: ["juhu", "andheri-w", "lokhandwala"] },
  { type: "base-road", points: ["lokhandwala", "dn-nagar", "juhu"] },
  { type: "base-road", points: ["andheri-w", "andheri-west-metro", "mukesh-patel", "juhu"] },
  { type: "base-road", points: ["dn-nagar", "andheri-west-metro", "mukesh-patel"] },
  { type: "base-road", points: ["andheri-e", "airport-t2", "marol", "seepz", "aarey"] }
];

const routeBook = {
  "gundavali|mukesh-patel": {
    fastest: route("fastest", "Auto via Andheri subway", 28, 85, 70, 70, ["gundavali", "andheri-e", "andheri-w", "mukesh-patel"], [
      leg("walk", "Exit Gundavali from main gate", "Use the Andheri East side exit", 3, 0, "Busy pickup zone"),
      leg("auto", "Auto to NMIMS/Cooper Hospital side", "Via Andheri subway and SV Road", 23, 85, "Meter-distance estimate"),
      leg("walk", "Walk to Mukesh Patel gate", "Bhakti Vedant Swami Marg", 2, 0, "Campus frontage")
    ], "Fastest when road traffic through Andheri subway is moving."),
    comfort: route("comfort", "Cab drop at campus gate", 32, 180, 77, 90, ["gundavali", "andheri-e", "airport-t2", "mukesh-patel"], [
      leg("cab", "Cab pickup near Gundavali", "Use a marked pickup point near the station", 5, 0, "Seat guaranteed"),
      leg("cab", "Drive to Mukesh Patel", "Fare varies with demand and waiting time", 24, 180, "App fare estimate"),
      leg("walk", "Campus entry walk", "Near Cooper Hospital/JVPD side", 3, 0, "Lowest walking")
    ], "Best when carrying a bag or travelling in heavy rain, but fare can change with demand."),
    safest: route("safest", "Metro and BEST via Andheri", 44, 20, 89, 73, ["gundavali", "andheri-e", "andheri-w", "mukesh-patel"], [
      leg("walk", "Use station connector toward Line 1", "Stay inside the lit interchange route", 6, 0, "Staffed station area"),
      leg("metro", "Metro hop toward Andheri", "Short metro/interchange movement", 5, 10, "Metro fare slab"),
      leg("bus", "BEST bus toward Cooper Hospital/NMIMS", "Typical gap 10-16 min", 23, 10, "Published BEST slab"),
      leg("walk", "Walk from Cooper Hospital side", "Use the main campus approach", 10, 0, "Lower isolation")
    ], "Uses staffed transit spaces and visible main-road stops instead of a long private-vehicle stretch.")
  },
  "andheri-w|mukesh-patel": {
    fastest: route("fastest", "Auto via SV Road", 14, 43, 74, 74, ["andheri-w", "mukesh-patel"], [
      leg("walk", "Exit Andheri West railway side", "Use the main west exit", 3, 0, "Crowded but visible"),
      leg("auto", "Auto to Mukesh Patel", "Via SV Road/Vile Parle West", 9, 43, "Meter-distance estimate"),
      leg("walk", "Campus gate walk", "Near Cooper Hospital", 2, 0, "Short approach")
    ], "Fast for this short hop, especially outside station peak crush."),
    comfort: route("comfort", "Cab to Mukesh Patel gate", 16, 120, 76, 91, ["andheri-w", "mukesh-patel"], [
      leg("cab", "Cab pickup away from station crowd", "Walk to a clearer pickup point", 4, 0, "Less pickup confusion"),
      leg("cab", "Direct cab to campus", "Fare varies with demand", 10, 120, "App fare estimate"),
      leg("walk", "Campus entry", "Drop near Bhakti Vedant Swami Marg", 2, 0, "Low effort")
    ], "Most comfortable if you want minimum walking or have bags."),
    safest: route("safest", "BEST to Cooper Hospital", 28, 10, 88, 70, ["andheri-w", "mukesh-patel"], [
      leg("walk", "Walk to main BEST stop", "Avoid narrow station-side lanes", 5, 0, "Lit main road"),
      leg("bus", "BEST bus toward Cooper Hospital/NMIMS", "Typical gap 10-16 min", 15, 10, "Published BEST slab"),
      leg("walk", "Walk to Mukesh Patel gate", "Use signalized crossings near Cooper Hospital", 8, 0, "Safer crossings")
    ], "Slower, but it keeps you on public, visible roads and avoids bargaining or surge pricing.")
  },
  "dn-nagar|mukesh-patel": {
    fastest: route("fastest", "Auto through JVPD", 18, 58, 73, 75, ["dn-nagar", "andheri-west-metro", "mukesh-patel"], [
      leg("walk", "Exit DN Nagar Metro", "Use the JP Road side exit", 3, 0, "Station pickup"),
      leg("auto", "Auto to Mukesh Patel", "Via JVPD/Vile Parle West", 13, 58, "Meter-distance estimate"),
      leg("walk", "Campus entry walk", "Near Cooper Hospital", 2, 0, "Short approach")
    ], "Best time choice when JP Road is not jammed."),
    comfort: route("comfort", "Cab via Juhu side", 22, 130, 76, 90, ["dn-nagar", "juhu", "mukesh-patel"], [
      leg("cab", "Cab pickup at DN Nagar", "Use the station-side pickup lane", 5, 0, "Seat guaranteed"),
      leg("cab", "Drive toward NMIMS campus", "Fare varies with demand", 15, 130, "App fare estimate"),
      leg("walk", "Campus gate walk", "Bhakti Vedant Swami Marg", 2, 0, "Low effort")
    ], "Most comfortable for heat, rain, or laptop bags."),
    safest: route("safest", "BEST along main roads", 33, 10, 89, 72, ["dn-nagar", "andheri-west-metro", "mukesh-patel"], [
      leg("walk", "Walk to DN Nagar bus stop", "Stay on the main road side", 5, 0, "Visible stop"),
      leg("bus", "BEST bus toward Vile Parle West/Cooper", "Typical gap 10-16 min", 20, 10, "Published BEST slab"),
      leg("walk", "Walk to Mukesh Patel gate", "Use the Cooper Hospital side approach", 8, 0, "Public frontage")
    ], "Uses a public route and avoids isolated internal lanes.")
  },
  "andheri-west-metro|mukesh-patel": {
    fastest: route("fastest", "Auto from Andheri West Metro", 15, 45, 74, 76, ["andheri-west-metro", "mukesh-patel"], [
      leg("walk", "Exit Andheri West Metro", "Use the main road exit", 3, 0, "Good pickup visibility"),
      leg("auto", "Auto to Mukesh Patel", "Via Vile Parle West", 10, 45, "Meter-distance estimate"),
      leg("walk", "Campus entry walk", "Near Cooper Hospital", 2, 0, "Short approach")
    ], "A short last-mile ride is usually the fastest option."),
    comfort: route("comfort", "Cab short hop", 17, 120, 77, 91, ["andheri-west-metro", "mukesh-patel"], [
      leg("cab", "Cab pickup near metro exit", "Choose the clearer pickup side", 4, 0, "Seat guaranteed"),
      leg("cab", "Direct cab to campus", "Fare varies with demand", 11, 120, "App fare estimate"),
      leg("walk", "Campus gate walk", "Bhakti Vedant Swami Marg", 2, 0, "Low effort")
    ], "More comfortable than an auto, though the minimum app fare can feel high for the distance."),
    safest: route("safest", "BEST or main-road walk", 29, 10, 90, 71, ["andheri-west-metro", "mukesh-patel"], [
      leg("walk", "Walk to main BEST stop", "Avoid interior lane shortcuts", 5, 0, "Lit main road"),
      leg("bus", "BEST bus toward Cooper Hospital/NMIMS", "Typical gap 10-16 min", 14, 10, "Published BEST slab"),
      leg("walk", "Walk from Cooper side to campus", "Use signalized crossings", 10, 0, "Public frontage")
    ], "Safer after dark because it stays near bus stops and main roads.")
  },
  "andheri-e|airport-t2": {
    fastest: route("fastest", "Metro sprint to T2", 23, 45, 86, 76, ["andheri-e", "airport-t2"], [
      leg("walk", "Walk to Line 3 concourse", "Andheri East entrance", 5, 0, "Covered station approach"),
      leg("metro", "Metro Line 3 to CSIA T2", "Next trains 2:08 PM, 2:15 PM, 2:22 PM", 9, 20, "Published metro slab"),
      leg("walk", "Airport connector walk", "Follow T2 terminal signs", 9, 15, "Security presence")
    ], "Uses the airport metro spine and keeps road exposure low."),
    comfort: route("comfort", "AC cab via Sahar Road", 29, 240, 74, 91, ["andheri-e", "airport-t2"], [
      leg("cab", "Cab pickup at Andheri East", "Use a marked pickup point", 7, 80, "Doorstep boarding"),
      leg("cab", "Sahar Road drive", "Traffic-sensitive segment", 17, 130, "No transfer"),
      leg("walk", "Terminal drop-off", "Short walk to departures", 5, 30, "Minimal luggage stress")
    ], "Best with luggage or rain, but cost moves with traffic and demand."),
    safest: route("safest", "Station-lit metro route", 31, 50, 94, 80, ["andheri-e", "airport-t2"], [
      leg("walk", "Use main station entry", "Avoid isolated side lanes", 7, 0, "Well-lit access"),
      leg("metro", "Metro Line 3 to CSIA T2", "Next trains 2:08 PM, 2:15 PM, 2:22 PM", 9, 20, "Published metro slab"),
      leg("walk", "Use signed airport corridor", "Stay inside terminal-linked walkway", 15, 20, "Lowest street crossing")
    ], "Prioritizes staffed spaces, lit approaches, and fewer road crossings.")
  },
  "andheri-w|versova": {
    fastest: route("fastest", "Line 1 westbound", 14, 20, 85, 82, ["andheri-w", "dn-nagar", "versova"], [
      leg("walk", "Enter Andheri Metro", "Bridge from station side", 4, 0, "Busy interchange"),
      leg("metro", "Metro Line 1 to Versova", "Every 4-6 min", 8, 20, "Fast fixed corridor"),
      leg("walk", "Exit toward JP Road", "Use main exit", 2, 0, "Short walk")
    ], "Fastest for this corridor because Line 1 avoids Link Road traffic."),
    comfort: route("comfort", "Short AC auto ride", 19, 85, 73, 86, ["andheri-w", "versova"], [
      leg("auto", "Auto from SV Road side", "Meter or app estimate", 5, 20, "Direct pickup"),
      leg("auto", "JP Road run", "Moderate signal delay", 12, 55, "No platform change"),
      leg("walk", "Final walk", "Drop near Versova junction", 2, 10, "Low effort")
    ], "Good when platforms are crowded or you want a seat."),
    safest: route("safest", "Metro plus main-road walk", 17, 20, 91, 80, ["andheri-w", "dn-nagar", "versova"], [
      leg("walk", "Use metro bridge", "Avoid crossing below flyover", 5, 0, "Separated pedestrian path"),
      leg("metro", "Metro Line 1 to Versova", "Every 4-6 min", 8, 20, "Staffed stations"),
      leg("walk", "Exit via main road", "Avoid beach-side shortcuts late", 4, 0, "Better lighting")
    ], "Keeps the route inside staffed stations and main roads.")
  },
  "versova|ghatkopar": {
    fastest: route("fastest", "End-to-end Line 1", 26, 40, 88, 78, ["versova", "dn-nagar", "andheri-w", "andheri-e", "marol", "saki-naka", "ghatkopar"], [
      leg("metro", "Metro Line 1 to Ghatkopar", "Every 4-6 min", 22, 40, "Traffic-free"),
      leg("walk", "Ghatkopar interchange exit", "Follow east concourse signs", 4, 0, "Crowded at peak")
    ], "One train, no road bottleneck, usually the clear winner."),
    comfort: route("comfort", "Line 1 off-peak coach choice", 30, 40, 82, 88, ["versova", "dn-nagar", "andheri-w", "andheri-e", "marol", "saki-naka", "ghatkopar"], [
      leg("metro", "Wait for less crowded coach", "Board front or rear coaches", 5, 0, "Lower crowd stress"),
      leg("metro", "Metro Line 1 to Ghatkopar", "Every 4-6 min", 22, 40, "AC ride"),
      leg("walk", "Exit from calmer side", "Use the signed station concourse", 3, 0, "Controlled exit")
    ], "Adds a small buffer for boarding comfort."),
    safest: route("safest", "Line 1 staffed corridor", 31, 40, 93, 82, ["versova", "dn-nagar", "andheri-w", "andheri-e", "marol", "saki-naka", "ghatkopar"], [
      leg("walk", "Use main Versova station entry", "Avoid interior lanes at night", 5, 0, "Lit access"),
      leg("metro", "Metro Line 1 to Ghatkopar", "Every 4-6 min", 22, 40, "CCTV and staff"),
      leg("walk", "Use marked interchange exit", "Stay inside station zone", 4, 0, "Lower road risk")
    ], "Reduces unsupervised walking and road crossings.")
  },
  "lokhandwala|seepz": {
    fastest: route("fastest", "Auto via JVLR link", 30, 135, 72, 62, ["lokhandwala", "dn-nagar", "andheri-e", "seepz"], [
      leg("auto", "Auto pickup at Lokhandwala Circle", "Meter/app estimate", 6, 25, "Quick boarding"),
      leg("auto", "Jogeshwari-Vikhroli Link Road", "Peak delays likely", 20, 95, "Direct route"),
      leg("walk", "SEEPZ gate approach", "Stay on marked footpath", 4, 15, "Office crowd")
    ], "Fast if JVLR is moving; less predictable in evening peak."),
    comfort: route("comfort", "Metro plus short auto", 42, 90, 79, 87, ["lokhandwala", "dn-nagar", "andheri-e", "marol", "seepz"], [
      leg("auto", "Auto to DN Nagar Metro", "Meter/app estimate", 10, 45, "Short feeder"),
      leg("metro", "Line 1 to Marol Naka", "Every 4-6 min", 14, 30, "AC and reliable"),
      leg("auto", "Auto to SEEPZ", "Office gate drop", 14, 15, "Low walking"),
      leg("walk", "Gate security entry", "Queue buffer", 4, 0, "Known route")
    ], "Less traffic pain and fewer long road stretches."),
    safest: route("safest", "Main-road feeder plus metro", 47, 95, 90, 82, ["lokhandwala", "dn-nagar", "andheri-e", "marol", "seepz"], [
      leg("auto", "Auto from main Lokhandwala stand", "Avoid inner-lane pickup", 12, 50, "Traceable pickup"),
      leg("metro", "Line 1 to Marol Naka", "Every 4-6 min", 14, 30, "Staffed corridor"),
      leg("auto", "Auto via MIDC main road", "Prefer main gate drop", 17, 15, "Better lighting"),
      leg("walk", "SEEPZ gate approach", "Use office crowd path", 4, 0, "Low isolation")
    ], "Chooses known pickup/drop zones and keeps the route on main roads.")
  },
  "dn-nagar|saki-naka": {
    fastest: route("fastest", "Line 1 eastbound", 19, 30, 87, 78, ["dn-nagar", "andheri-w", "andheri-e", "marol", "saki-naka"], [
      leg("metro", "Metro Line 1 to Saki Naka", "Every 4-6 min", 17, 30, "Traffic-free"),
      leg("walk", "Saki Naka exit", "Use main staircase", 2, 0, "Busy junction")
    ], "Direct metro keeps this simple and fast."),
    comfort: route("comfort", "Line 1 with boarding buffer", 24, 30, 82, 89, ["dn-nagar", "andheri-w", "andheri-e", "marol", "saki-naka"], [
      leg("metro", "Wait for less crowded coach", "Front coach usually calmer", 5, 0, "More space"),
      leg("metro", "Metro Line 1 to Saki Naka", "Every 4-6 min", 17, 30, "AC ride"),
      leg("walk", "Exit toward main road", "Avoid crossing under rush", 2, 0, "Short walk")
    ], "Small time cost for a calmer ride."),
    safest: route("safest", "Line 1 with safer exit", 25, 30, 92, 82, ["dn-nagar", "andheri-w", "andheri-e", "marol", "saki-naka"], [
      leg("metro", "Metro Line 1 to Saki Naka", "Every 4-6 min", 17, 30, "Staffed station"),
      leg("walk", "Use signalized crossing only", "Avoid diagonal road crossing", 8, 0, "Lower traffic risk")
    ], "Avoids the risky Saki Naka junction crossing pattern.")
  },
  "andheri-w|juhu": {
    fastest: route("fastest", "Auto via SV Road", 22, 90, 70, 70, ["andheri-w", "juhu"], [
      leg("auto", "Auto from Andheri W stand", "Meter/app estimate", 5, 20, "Quick pickup"),
      leg("auto", "SV Road to Juhu Circle", "Signal delay likely", 14, 55, "Direct"),
      leg("walk", "Final approach", "Main-road drop", 3, 15, "Short walk")
    ], "Usually faster than waiting for a bus on this short route."),
    comfort: route("comfort", "Cab with low walking", 26, 190, 73, 89, ["andheri-w", "juhu"], [
      leg("cab", "Cab pickup outside station crowd", "Use a pickup point away from the exit crush", 8, 55, "Less walking"),
      leg("cab", "Direct road route", "Traffic-sensitive", 15, 115, "Seat guaranteed"),
      leg("walk", "Final approach", "Doorstep or nearest legal drop", 3, 20, "Low effort")
    ], "Most comfortable with bags or heat."),
    safest: route("safest", "BEST bus on main roads", 36, 20, 88, 70, ["andheri-w", "juhu"], [
      leg("walk", "Walk to main bus stop", "Stay on station-side footpath", 6, 0, "Lit stop"),
      leg("bus", "BEST bus toward Juhu", "Typical gap 10-16 min", 22, 10, "Published BEST slab"),
      leg("walk", "Juhu Circle walk", "Use signalized crossing", 8, 5, "Lower crossing risk")
    ], "Trades time for public, visible stops and safer crossings.")
  }
};

const modeLabels = {
  fastest: "Fastest",
  comfort: "Most comfortable",
  safest: "Safest"
};

const modeClass = {
  fastest: "pill-fastest",
  comfort: "pill-comfort",
  safest: "pill-safest"
};

const routeColor = {
  fastest: "#df6b52",
  comfort: "#7057a3",
  safest: "#4f9d69"
};

const corridorStyle = {
  "base-metro": { color: "#3778bf", weight: 3, opacity: 0.45, dashArray: "7 7" },
  "base-rail": { color: "#5b6770", weight: 3, opacity: 0.4, dashArray: "6 6" },
  "base-road": { color: "#d2a438", weight: 3, opacity: 0.42, dashArray: "7 8" }
};

const mapState = {
  instance: null,
  corridorLayer: null,
  routeLayer: null,
  stopLayer: null,
  tileFailures: 0,
  tileLoads: 0,
  tileWarningTimer: null
};

const modeAbbrev = {
  walk: "W",
  metro: "M",
  bus: "B",
  auto: "A",
  cab: "C",
  train: "T"
};

const rapidoLinks = {
  android: "intent://open#Intent;scheme=rapido;package=com.rapido.passenger;S.browser_fallback_url=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.rapido.passenger;end",
  ios: "https://apps.apple.com/in/app/rapido-bike-taxi-auto-cabs/id1198464606",
  web: "https://www.rapido.bike/Home"
};

const state = {
  from: "gundavali",
  to: "mukesh-patel",
  time: "now",
  mode: "fastest"
};

const byId = Object.fromEntries(places.map((place) => [place.id, place]));
const crowdLevels = ["Low", "Moderate", "High"];
const crowdChoices = ["Seats available", "Standing room", "Packed"];
const publicTransport = ["bus", "metro", "train"];
const crowdState = { reports: [], available: false, busy: false, messages: {}, reporter: null };
try {
  crowdState.reporter = localStorage.getItem("raasta-reporter") || crypto.randomUUID();
  localStorage.setItem("raasta-reporter", crowdState.reporter);
} catch {
  crowdState.reporter = crypto.randomUUID();
}

function typicalCrowd(type, departure = state.time, now = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata", hour: "numeric", hourCycle: "h23", weekday: "short"
  }).formatToParts(now).map((part) => [part.type, part.value]));
  const hour = { morning: 8, midday: 13, evening: 18, night: 22 }[departure] ?? Number(parts.hour);
  const weekday = !["Sat", "Sun"].includes(parts.weekday);
  // Prototype assumptions, not measured occupancy or operator data.
  if (weekday && ((hour >= 8 && hour < 11) || (hour >= 17 && hour < 21))) return 2;
  if (hour >= 22 || hour < 7) return 0;
  return type === "bus" && !weekday ? 0 : 1;
}

function segmentCrowd(type, now = Date.now()) {
  const fresh = state.time === "now" ? crowdState.reports.filter((report) =>
    report.from === state.from && report.to === state.to && report.type === type
    && report.at <= now && now - report.at < 30 * 60 * 1000) : [];
  if (fresh.length) {
    const counts = [0, 0, 0];
    fresh.forEach((report) => counts[report.level]++);
    // Prefer the more crowded level when reports tie.
    const level = counts.lastIndexOf(Math.max(...counts));
    const age = Math.floor((now - Math.max(...fresh.map((report) => report.at))) / 60000);
    return { level, community: true, source: `Community: ${fresh.length} report${fresh.length === 1 ? "" : "s"} - ${age < 1 ? "just now" : `${age} min ago`}` };
  }
  return { level: typicalCrowd(type), community: false, source: "Typical crowd - prototype estimate" };
}

function routeCrowd(item) {
  const segments = item.legs.filter((segment) => publicTransport.includes(segment.type));
  if (!segments.length) return '<p class="crowd-summary crowd-private">No shared transit</p>';
  const crowds = segments.map((segment) => segmentCrowd(segment.type));
  const level = Math.max(...crowds.map((crowd) => crowd.level));
  return `<p class="crowd-summary crowd-level-${level}"><strong>${crowdLevels[level]} crowd</strong><span>${crowds.some((crowd) => crowd.community) ? "Includes community reports" : "Typical - prototype estimate"}</span></p>`;
}

function crowdPanel(item, segment, index) {
  if (!publicTransport.includes(segment.type)) return "";
  const crowd = segmentCrowd(segment.type);
  // A report covers a directional transport corridor, not an identified service.
  const firstOfType = item.legs.findIndex((leg) => leg.type === segment.type) === index;
  return `<div class="segment-crowd">
    <div class="crowd-reading crowd-level-${crowd.level}"><strong>${crowdLevels[crowd.level]} crowd</strong><span>${crowd.source}</span></div>
    <small>For ${byId[state.from].short} to ${byId[state.to].short} ${segment.type} travel; not a specific vehicle.</small>
    ${firstOfType && state.time === "now" ? `<form class="crowd-report" data-type="${segment.type}">
      <fieldset ${!crowdState.available || crowdState.busy ? "disabled" : ""}>
        <legend>How crowded is it now?</legend>
        <div class="crowd-options">${crowdChoices.map((label, level) => `<label><input type="radio" name="crowd" value="${level}" required />${label}</label>`).join("")}</div>
        <div class="crowd-actions"><button type="submit">Report crowd</button><button type="button" data-clear-report>Remove my report</button></div>
      </fieldset>
      <p class="crowd-feedback" role="status">${!crowdState.available ? "Community reports unavailable. Typical estimates shown." : crowdState.messages[`${state.from}|${state.to}|${segment.type}`] || "Reports expire after 30 minutes. Shared on this app server only."}</p>
    </form>` : ""}
  </div>`;
}

async function refreshCrowds() {
  if (location.protocol === "file:" || crowdState.busy) return;
  try {
    const response = await fetch("/api/crowds", { cache: "no-store" });
    if (!response.ok) throw new Error("Unavailable");
    const data = await response.json();
    if (!Array.isArray(data.reports)) throw new Error("Invalid reports");
    crowdState.reports = data.reports.filter((report) => byId[report.from] && byId[report.to]
      && publicTransport.includes(report.type) && [0, 1, 2].includes(report.level) && Number.isFinite(report.at));
    crowdState.available = true;
  } catch {
    crowdState.available = false;
    crowdState.reports = [];
  }
  if ((!crowdState.available || !document.activeElement?.closest(".crowd-report")) && !crowdState.busy) renderCrowdViews();
}

function renderCrowdViews() {
  const routes = getRoutes(state.from, state.to);
  renderModeCards(routes);
  renderDetails(routes[state.mode]);
}

async function submitCrowd(type, level) {
  if (crowdState.busy) return;
  const from = state.from;
  const to = state.to;
  const key = `${from}|${to}|${type}`;
  crowdState.busy = true;
  document.querySelectorAll(".crowd-report fieldset").forEach((fieldset) => { fieldset.disabled = true; });
  try {
    const response = await fetch("/api/crowds", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, type, level, reporter: crowdState.reporter })
    });
    if (!response.ok) throw new Error("Save failed");
    const data = await response.json();
    crowdState.reports = data.reports;
    crowdState.messages[key] = level === null ? "Your report was removed." : "Report saved. Expires in 30 minutes.";
  } catch {
    crowdState.messages[key] = "Could not save your report. Please try again.";
  } finally {
    crowdState.busy = false;
    renderCrowdViews();
  }
}

function route(mode, name, minutes, fare, safety, comfort, path, legs, insight) {
  const pricedLegs = legs.map(normalizeLegFare);
  const calculatedFare = pricedLegs.reduce((total, segment) => total + segment.fare, 0);

  return {
    mode,
    name,
    minutes,
    fare: calculatedFare || fare,
    fareConfidence: routeFareConfidence(pricedLegs),
    safety,
    comfort,
    path,
    legs: pricedLegs,
    insight
  };
}

function leg(type, title, detail, minutes, fare, note, fareConfidence = defaultFareConfidence(type, fare), fareSource = defaultFareSource(type)) {
  return { type, title, detail, minutes, fare, note, fareConfidence, fareSource };
}

function normalizeLegFare(segment) {
  if (segment.type === "walk") {
    return { ...segment, fare: 0, fareConfidence: "free", fareSource: "Walking" };
  }

  if (publicTransportType(segment.type)) {
    return { ...segment, fareConfidence: "sample", fareSource: "Sample transit fare",
      detail: segment.detail.startsWith("Next trains") ? `Sample departures: ${segment.detail.slice(12)}` : segment.detail,
      note: segment.note.replace("Published", "Sample") };
  }
  return segment;
}

function publicTransportType(type) {
  return ["bus", "metro", "train"].includes(type);
}

function defaultFareConfidence(type, fare) {
  if (fare === 0 || type === "walk") return "free";
  if (type === "metro" || type === "bus" || type === "train") return "published";
  return "estimate";
}

function defaultFareSource(type) {
  const sources = {
    metro: "Metro fare slab",
    bus: "BEST fare slab",
    train: "Railway fare table",
    auto: "Meter estimate",
    cab: "App fare estimate",
    walk: "Walking"
  };

  return sources[type] || "Fare estimate";
}

function routeFareConfidence(legs) {
  const paidLegs = legs.filter((segment) => segment.fare > 0);
  if (paidLegs.length === 0) return "No fare";

  const hasEstimate = paidLegs.some((segment) => segment.fareConfidence === "estimate");
  const hasPublished = paidLegs.some((segment) => segment.fareConfidence === "sample");

  if (hasEstimate && hasPublished) return "Sample + estimate";
  if (hasEstimate) return "Estimated fare";
  return "Sample fare";
}

function pairKey(from, to) {
  return `${from}|${to}`;
}

function getRoutes(from, to) {
  const direct = routeBook[pairKey(from, to)];
  if (direct) return direct;

  const reverse = routeBook[pairKey(to, from)];
  if (reverse) return reverseRoutes(reverse, from, to);

  return createGenericRoutes(from, to);
}

function reverseRoutes(routes, from, to) {
  const start = byId[from];
  const end = byId[to];

  return Object.fromEntries(
    Object.entries(routes).map(([mode, item]) => [
      mode,
      {
        ...item,
        name: returnRouteName(mode, item, end),
        path: [...item.path].reverse(),
        legs: returnLegs(item.legs, start, end),
        insight: `Return direction from ${start.short} to ${end.short}, using the same corridor with pickup, transfer, and final-walk steps rewritten for this side.`
      }
    ])
  );
}

function returnRouteName(mode, item, end) {
  const has = (type) => item.legs.some((segment) => segment.type === type);

  if (mode === "fastest") {
    if (has("metro") && !has("auto") && !has("cab")) return `Metro to ${end.short}`;
    if (has("auto")) return `Auto to ${end.short}`;
    if (has("cab")) return `Cab to ${end.short}`;
    return `Fast route to ${end.short}`;
  }

  if (mode === "comfort") {
    if (has("cab")) return `Cab to ${end.short}`;
    if (has("metro")) return `Comfort transit to ${end.short}`;
    return `Comfort route to ${end.short}`;
  }

  if (has("bus") || has("metro") || has("train")) return `Public route to ${end.short}`;
  return `Safer route to ${end.short}`;
}

function returnLegs(legs, start, end) {
  const reversed = [...legs].reverse();

  return reversed.map((segment, index) => {
    const isFirst = index === 0;
    const isLast = index === reversed.length - 1;
    return {
      ...segment,
      title: returnLegTitle(segment.type, start, end, isFirst, isLast),
      detail: returnLegDetail(segment.type, start, end, segment.detail, isFirst, isLast)
    };
  });
}

function returnLegTitle(type, start, end, isFirst, isLast) {
  if (type === "walk") {
    if (isFirst) return `Walk out from ${start.short}`;
    if (isLast) return `Final walk to ${end.short}`;
    return "Transfer walk";
  }

  if (type === "bus") return `BEST bus toward ${end.short}`;
  if (type === "metro") return `Metro toward ${end.short}`;
  if (type === "train") return `Train toward ${end.short}`;
  if (type === "auto") return isFirst ? `Auto from ${start.short}` : `Auto toward ${end.short}`;
  if (type === "cab") return isFirst ? `Cab pickup near ${start.short}` : `Cab toward ${end.short}`;

  return `${type} toward ${end.short}`;
}

function returnLegDetail(type, start, end, originalDetail, isFirst, isLast) {
  if (type === "walk") {
    if (isFirst) return `Start from ${start.name} and use the main visible exit.`;
    if (isLast) return `Approach ${end.name} from the nearest main-road drop point.`;
    return "Use the main connector and avoid interior shortcuts.";
  }

  if (type === "bus") return `Board from a main-road stop toward ${end.name}.`;
  if (type === "metro") return `Take the return-direction metro movement toward ${end.name}.`;
  if (type === "train") return `Use the return-direction rail movement toward ${end.name}.`;
  if (type === "auto") return `Take an auto from ${start.short} toward ${end.name}; ${originalDetail.toLowerCase()}.`;
  if (type === "cab") return `Book or board near ${start.short} for ${end.name}; ${originalDetail.toLowerCase()}.`;

  return originalDetail;
}

function createGenericRoutes(from, to) {
  const start = byId[from];
  const end = byId[to];
  const km = distanceKm(start, end);
  const autoMinutes = Math.max(12, Math.round((km / 16) * 60 + 6));
  const transitMinutes = Math.max(18, Math.round((km / 22) * 60 + 12));
  const directFare = autoFare(km);
  const cabFareValue = cabFare(km);
  const busFare = bestNonAcBusFare(km);

  return {
    fastest: route("fastest", "Direct road route", autoMinutes, directFare, 70, 68, [from, to], [
      leg("auto", `Auto from ${start.short}`, "Meter/app estimate", 5, 0, "Fast boarding"),
      leg("auto", `Main-road run to ${end.short}`, "Traffic-sensitive", autoMinutes - 8, directFare, "Meter-distance estimate"),
      leg("walk", "Final walk", "Nearest legal drop", 3, 10, "Short approach")
    ], "Uses the shortest practical road path with a traffic buffer."),
    comfort: route("comfort", "Low-walk cab route", autoMinutes + 6, cabFareValue, 74, 90, [from, to], [
      leg("cab", `Cab pickup near ${start.short}`, "Use marked pickup if available", 7, 0, "Seat guaranteed"),
      leg("cab", `Direct drive to ${end.short}`, "Fare varies with demand", autoMinutes - 2, cabFareValue, "No transfer"),
      leg("walk", "Final approach", "Doorstep or closest drop", 1, 20, "Lowest effort")
    ], "Reduces transfers and walking, useful during rain or with luggage."),
    safest: route("safest", "Main-stop public route", transitMinutes + 7, busFare, 88, 72, [from, to], [
      leg("walk", `Walk to main stop at ${start.short}`, "Use lit main road", 7, 0, "Avoid side lanes"),
      leg("bus", `BEST route toward ${end.short}`, crowdAwareGap(), transitMinutes - 4, busFare, "Public stop network"),
      leg("walk", `Walk from ${end.short} stop`, "Use signalized crossings", 4, 0, "Lower traffic risk")
    ], "Prioritizes public visibility, main roads, and safer crossings.")
  };
}

function distanceKm(a, b) {
  const earthKm = 6371;
  const dLat = degToRad(b.lat - a.lat);
  const dLng = degToRad(b.lng - a.lng);
  const lat1 = degToRad(a.lat);
  const lat2 = degToRad(b.lat);
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return earthKm * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function degToRad(value) {
  return (value * Math.PI) / 180;
}

function autoFare(km) {
  const roadKm = estimatedRoadKm(km);
  const fare = roadKm <= 1.5 ? 26 : 26 + (roadKm - 1.5) * 17.14;
  const withNightSurcharge = state.time === "night" ? fare * 1.25 : fare;
  return Math.round(withNightSurcharge);
}

function cabFare(km) {
  const roadKm = estimatedRoadKm(km);
  return Math.round(Math.max(120, 75 + roadKm * 36) / 10) * 10;
}

function estimatedRoadKm(straightLineKm) {
  return straightLineKm * 1.25;
}

function bestNonAcBusFare(km) {
  const stageKm = Math.ceil(estimatedRoadKm(km) / 5) * 5;
  if (stageKm <= 5) return 10;
  if (stageKm <= 10) return 15;
  if (stageKm <= 15) return 20;
  if (stageKm <= 20) return 30;
  if (stageKm <= 25) return 35;
  if (stageKm <= 30) return 40;
  if (stageKm <= 35) return 45;
  if (stageKm <= 40) return 50;
  if (stageKm <= 45) return 55;
  if (stageKm <= 50) return 60;
  return 60 + Math.ceil((stageKm - 50) / 5) * 5;
}

function crowdAwareGap() {
  if (state.time === "morning" || state.time === "evening") return "Typical gap 12-20 min";
  if (state.time === "night") return "Typical gap 18-28 min";
  return "Typical gap 10-16 min";
}

function setupSelectors() {
  setupSearchField("from", "#fromSearch", "#fromSuggestions");
  setupSearchField("to", "#toSearch", "#toSuggestions");
  setupTimeControls();

  document.querySelector("#swapButton").addEventListener("click", () => {
    const oldFrom = state.from;
    state.from = state.to;
    state.to = oldFrom;
    render();
  });

  setupRapidoFallback();
}

function setupSearchField(kind, inputSelector, suggestionsSelector) {
  const input = document.querySelector(inputSelector);
  const suggestions = document.querySelector(suggestionsSelector);
  input.setAttribute("role", "combobox");
  input.setAttribute("aria-expanded", "false");

  input.addEventListener("focus", () => {
    renderSuggestions(kind, input, suggestions);
  });

  input.addEventListener("input", () => {
    renderSuggestions(kind, input, suggestions);
  });

  input.addEventListener("keydown", (event) => {
    const options = [...suggestions.querySelectorAll(".suggestion-option")];
    const activeIndex = Number(suggestions.dataset.activeIndex || 0);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveSuggestion(suggestions, Math.min(activeIndex + 1, options.length - 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveSuggestion(suggestions, Math.max(activeIndex - 1, 0));
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const selected = options[Number(suggestions.dataset.activeIndex || 0)];
      if (selected) choosePlace(kind, selected.dataset.placeId);
    }

    if (event.key === "Escape") {
      closeSuggestions(suggestions);
      input.blur();
    }
  });

  document.addEventListener("click", (event) => {
    if (!input.parentElement.contains(event.target)) closeSuggestions(suggestions);
  });
}

function setupTimeControls() {
  document.querySelectorAll(".time-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.time = button.dataset.time;
      render();
    });
  });
}

function renderSuggestions(kind, input, suggestions) {
  const results = searchPlaces(input.value);
  input.setAttribute("aria-expanded", "true");
  suggestions.dataset.activeIndex = "0";

  if (results.length === 0) {
    suggestions.innerHTML = `<div class="suggestion-empty">No places found</div>`;
    suggestions.classList.add("is-open");
    return;
  }

  suggestions.innerHTML = results
    .map((place, index) => `
      <button class="suggestion-option${index === 0 ? " is-active" : ""}" type="button" role="option" data-place-id="${place.id}">
        <span>${place.name}</span>
        <small>${placeHint(place)}</small>
      </button>
    `)
    .join("");

  suggestions.querySelectorAll(".suggestion-option").forEach((option) => {
    option.addEventListener("click", () => choosePlace(kind, option.dataset.placeId));
  });

  suggestions.classList.add("is-open");
}

function searchPlaces(query) {
  const normalizedQuery = query.trim().toLowerCase();
  const matches = places.filter((place) => {
    if (!normalizedQuery) return true;

    const tokens = [place.name, place.short, place.id, ...(place.aliases || [])].join(" ").toLowerCase();
    return tokens.includes(normalizedQuery);
  });

  return matches
    .sort((first, second) => {
      const firstStarts = first.name.toLowerCase().startsWith(normalizedQuery) ? 0 : 1;
      const secondStarts = second.name.toLowerCase().startsWith(normalizedQuery) ? 0 : 1;
      return firstStarts - secondStarts || first.name.localeCompare(second.name);
    })
    .slice(0, places.length);
}

function placeHint(place) {
  if (place.id === "mukesh-patel") return "NMIMS, Vile Parle West";
  if (place.id.includes("metro")) return "Metro station";
  if (place.id.includes("andheri-w")) return "Railway / west side";
  return "Andheri region";
}

function choosePlace(kind, placeId) {
  const previousFrom = state.from;
  const previousTo = state.to;
  state[kind] = placeId;
  if (state.from === state.to) {
    state[kind === "from" ? "to" : "from"] = kind === "from" ? previousFrom : previousTo;
  }
  closeAllSuggestions();
  render();
}

function setActiveSuggestion(suggestions, index) {
  const options = [...suggestions.querySelectorAll(".suggestion-option")];
  if (options.length === 0) return;

  suggestions.dataset.activeIndex = String(index);
  options.forEach((option, optionIndex) => {
    option.classList.toggle("is-active", optionIndex === index);
  });
}

function closeSuggestions(suggestions) {
  suggestions.classList.remove("is-open");
  document.querySelector(`[aria-controls="${suggestions.id}"]`)?.setAttribute("aria-expanded", "false");
}

function closeAllSuggestions() {
  document.querySelectorAll(".suggestions").forEach(closeSuggestions);
}

function syncPlannerInputs() {
  document.querySelector("#fromSearch").value = byId[state.from].name;
  document.querySelector("#toSearch").value = byId[state.to].name;
  document.querySelectorAll(".time-button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.time === state.time));
  });
}

function setupRapidoFallback() {
  const rapidoLink = document.querySelector("#rapidoLink");
  const userAgent = navigator.userAgent || "";

  if (/Android/i.test(userAgent)) {
    rapidoLink.href = rapidoLinks.android;
    rapidoLink.removeAttribute("target");
    return;
  }

  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    rapidoLink.href = rapidoLinks.ios;
    return;
  }

  rapidoLink.href = rapidoLinks.web;
}

function render() {
  syncPlannerInputs();

  const routes = getRoutes(state.from, state.to);
  if (!routes[state.mode]) state.mode = "fastest";

  renderModeCards(routes);
  renderMap(routes[state.mode]);
  renderDetails(routes[state.mode]);
  renderStatus(routes[state.mode]);
}

function renderModeCards(routes) {
  const grid = document.querySelector("#modeGrid");
  grid.innerHTML = "";

  for (const mode of ["fastest", "comfort", "safest"]) {
    const item = routes[mode];
    const card = document.createElement("button");
    card.type = "button";
    card.className = `mode-card mode-card-${mode}`;
    card.setAttribute("aria-pressed", String(mode === state.mode));
    card.innerHTML = `
      <h3>
        ${modeLabels[mode]}
        <span class="mode-pill ${modeClass[mode]}">${scoreLabel(mode, item)}</span>
      </h3>
      <div class="card-metrics">
        ${tinyMetric(`${item.minutes}m`, "Time")}
        ${tinyMetric(`Rs ${item.fare}`, item.fareConfidence)}
        ${tinyMetric(`${item.safety}`, "Safety (demo)")}
      </div>
      <p class="route-caption">${item.name}</p>
      ${routeCrowd(item)}
    `;
    card.addEventListener("click", () => {
      state.mode = mode;
      render();
    });
    grid.appendChild(card);
  }
}

function scoreLabel(mode, item) {
  if (mode === "fastest") return "ETA";
  if (mode === "comfort") return `${item.comfort}/100`;
  return `${item.safety}/100`;
}

function tinyMetric(value, label) {
  return `<div class="tiny-metric"><strong>${value}</strong><span>${label}</span></div>`;
}

function renderMap(routeItem) {
  if (!window.L) {
    renderMapFallback(routeItem);
    return;
  }

  initializeMap();
  renderCorridors();
  renderRoutePath(routeItem);
  renderPlaceMarkers(routeItem);
  fitMapToRoute(routeItem);
}

function initializeMap() {
  if (mapState.instance) return;

  const map = L.map("routeMap", {
    center: [19.1197, 72.8468],
    zoom: 13,
    scrollWheelZoom: false,
    zoomControl: true
  });

  if (window.location.protocol === "file:") {
    showTileWarning("Open Glide using Start Glide.cmd to load the street map.");
  } else {
  const tileLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    referrerPolicy: "strict-origin-when-cross-origin",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  tileLayer.on("tileerror", (event) => {
    event.tile.style.visibility = "hidden";
    mapState.tileFailures += 1;
    showTileWarning();
  });
  tileLayer.on("tileload", (event) => {
    if (event.tile?.naturalWidth > 0) mapState.tileLoads += 1;
    if (mapState.tileFailures === 0) hideTileWarning();
  });
  tileLayer.on("loading", () => {
    mapState.tileFailures = 0;
    mapState.tileLoads = 0;
  });
  tileLayer.on("load", () => {
    if (mapState.tileFailures > 0) showTileWarning();
    else if (mapState.tileLoads > 0) hideTileWarning();
  });

  mapState.tileWarningTimer = window.setTimeout(checkTileHealth, 2600);
  }

  L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);

  mapState.instance = map;
  mapState.corridorLayer = L.layerGroup().addTo(map);
  mapState.routeLayer = L.layerGroup().addTo(map);
  mapState.stopLayer = L.layerGroup().addTo(map);
}

function renderCorridors() {
  mapState.corridorLayer.clearLayers();

  corridors.forEach((corridor) => {
    L.polyline(corridor.points.map(placeLatLng), corridorStyle[corridor.type]).addTo(mapState.corridorLayer);
  });
}

function renderRoutePath(routeItem) {
  mapState.routeLayer.clearLayers();

  L.polyline(routeItem.path.map(placeLatLng), {
    color: routeColor[routeItem.mode],
    weight: 7,
    opacity: 0.9,
    lineCap: "round",
    lineJoin: "round"
  }).addTo(mapState.routeLayer);
}

function renderPlaceMarkers(routeItem) {
  const activeStops = new Set(routeItem.path);
  mapState.stopLayer.clearLayers();

  places.forEach((place) => {
    const isActive = activeStops.has(place.id);
    const marker = L.circleMarker(placeLatLng(place.id), {
      radius: isActive ? 7 : 4.5,
      color: isActive ? "#ffffff" : "#172026",
      weight: isActive ? 3 : 2,
      fillColor: isActive ? "#0f8f82" : "#ffffff",
      fillOpacity: 1,
      opacity: 1
    }).addTo(mapState.stopLayer);

    marker.bindPopup(`<strong>${place.name}</strong><br>${placeHint(place)}`);
    if (isActive) {
      marker.bindTooltip(place.short, {
        permanent: true,
        direction: place.lat < 19.108 ? "bottom" : "top",
        className: "place-tooltip",
        offset: [0, isActive ? -3 : 0]
      });
    }
  });
}

function fitMapToRoute(routeItem) {
  const bounds = L.latLngBounds(routeItem.path.map(placeLatLng)).pad(0.28);
  if (bounds.isValid()) {
    mapState.instance.fitBounds(bounds, {
      maxZoom: 15,
      padding: [34, 34]
    });
  }

  window.requestAnimationFrame(() => mapState.instance.invalidateSize());
}

function placeLatLng(id) {
  const place = byId[id];
  return [place.lat, place.lng];
}

function renderMapFallback(routeItem) {
  const mapElement = document.querySelector("#routeMap");
  mapElement.innerHTML = `
    <div class="map-fallback">
      <div>
        <strong>Map source unavailable</strong>
        <span>${byId[routeItem.path[0]].name} to ${byId[routeItem.path.at(-1)].name}</span>
      </div>
    </div>
  `;
}

function checkTileHealth() {
  const tiles = [...document.querySelectorAll(".leaflet-tile")];
  const loadedTiles = tiles.filter((tile) => tile.naturalWidth > 0);

  if (tiles.length > 0 && loadedTiles.length === 0) {
    showTileWarning();
  }
}

function showTileWarning(message = "Street map unavailable. Check your connection and try again later.") {
  if (document.querySelector("#mapTileWarning")) return;

  const warning = document.createElement("div");
  warning.id = "mapTileWarning";
  warning.className = "map-tile-warning";
  warning.textContent = message;
  document.querySelector("#routeMap").appendChild(warning);
}

function hideTileWarning() {
  document.querySelector("#mapTileWarning")?.remove();
}

function renderDetails(routeItem) {
  document.querySelector("#routeModeLabel").textContent = modeLabels[routeItem.mode];
  document.querySelector("#routeTitle").textContent = routeItem.name;
  document.querySelector("#metricRow").innerHTML = `
    ${metricBox(`${routeItem.minutes} min`, "Total time")}
    ${metricBox(`Rs ${routeItem.fare}`, routeItem.fareConfidence)}
    ${metricBox(`${routeItem.safety}/100`, "Safety (demo)")}
  `;

  document.querySelector("#segmentList").innerHTML = routeItem.legs
    .map((segment, index) => `
      <article class="segment">
        <span class="mode-icon mode-${segment.type}">${modeAbbrev[segment.type]}</span>
        <div>
          <h3>${segment.title}</h3>
          <p>${segment.detail}</p>
          <div class="segment-meta">
            <span>${segment.minutes} min</span>
            <span>${formatLegFare(segment)}</span>
            <span>${fareBadge(segment)}</span>
            <span>${segment.note}</span>
          </div>
          ${crowdPanel(routeItem, segment, index)}
        </div>
      </article>
    `)
    .join("");

  document.querySelectorAll(".crowd-report").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const selected = form.querySelector('input[name="crowd"]:checked');
      if (selected) submitCrowd(form.dataset.type, Number(selected.value));
    });
    form.querySelector("[data-clear-report]").addEventListener("click", () => submitCrowd(form.dataset.type, null));
  });

  document.querySelector("#insightBand").innerHTML = `
    <h3>Why this route</h3>
    <p>${routeItem.insight}</p>
  `;
}

function metricBox(value, label) {
  return `<div class="metric-box"><strong>${value}</strong><span>${label}</span></div>`;
}

function formatLegFare(segment) {
  return segment.fare === 0 ? "No fare" : `Rs ${segment.fare}`;
}

function fareBadge(segment) {
  const labels = {
    free: "Free",
    published: segment.fareSource,
    sample: segment.fareSource,
    estimate: segment.fareSource
  };

  return labels[segment.fareConfidence] || "Fare note";
}

function renderStatus(routeItem) {
  const timeCopy = {
    now: "Sample departures",
    morning: "Peak crowd model",
    midday: "Midday model",
    evening: "Evening peak model",
    night: "Late-night safety model"
  };
  document.querySelector("#serviceStatus").textContent = `${timeCopy[state.time]} - ${routeItem.name}`;
}

setupSelectors();
render();
refreshCrowds();
window.setInterval(refreshCrowds, 60000);
window.addEventListener("focus", refreshCrowds);
