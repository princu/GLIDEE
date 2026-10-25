const fs = require("node:fs");
const path = require("node:path");

const REPORT_TTL = 30 * 60 * 1000;
const TYPES = ["bus", "metro", "train"];

function createCrowdStore(file, placeIds, now = Date.now) {
  let reports = [];
  try {
    const saved = JSON.parse(fs.readFileSync(file, "utf8"));
    if (Array.isArray(saved)) reports = saved.filter(validReport);
  } catch (error) {
    if (error.code !== "ENOENT") console.warn("Crowd reports could not be restored.");
  }

  function validInput(report) {
    return report && placeIds.includes(report.from) && placeIds.includes(report.to)
      && report.from !== report.to && TYPES.includes(report.type)
      && typeof report.reporter === "string" && /^[a-zA-Z0-9-]{16,64}$/.test(report.reporter)
      && (report.level === null || [0, 1, 2].includes(report.level));
  }

  function validReport(report) {
    return validInput(report) && report.level !== null && Number.isFinite(report.at);
  }

  function fresh() {
    return reports.filter((report) => report.at <= now() && now() - report.at < REPORT_TTL);
  }

  return {
    list() {
      return fresh().map(({ reporter, ...report }) => report);
    },
    save(input) {
      if (!validInput(input)) throw new Error("Invalid crowd report");
      const next = fresh().filter((report) => !(report.reporter === input.reporter
        && report.from === input.from && report.to === input.to && report.type === input.type));
      if (input.level !== null) {
        next.push({ from: input.from, to: input.to, type: input.type,
          reporter: input.reporter, level: input.level, at: now() });
      }
      if (next.length > 5000) throw new Error("Report capacity reached");
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(`${file}.tmp`, JSON.stringify(next), "utf8");
      fs.renameSync(`${file}.tmp`, file);
      reports = next;
      return this.list();
    }
  };
}

module.exports = { createCrowdStore, REPORT_TTL };
