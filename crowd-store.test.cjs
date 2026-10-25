const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { createCrowdStore, REPORT_TTL } = require("./crowd-store.cjs");

test("reports persist, replace per browser and direction, expire, and can be removed", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "raasta-crowd-test-"));
  const file = path.join(directory, "reports.json");
  let clock = 100000000;
  const create = () => createCrowdStore(file, ["a", "b"], () => clock);
  const first = { from: "a", to: "b", type: "bus", level: 2, reporter: "browser-one-12345" };
  try {
    const store = create();
    store.save(first);
    assert.equal(store.list().length, 1);
    assert.equal(store.list()[0].reporter, undefined);
    store.save({ ...first, level: 0 });
    assert.equal(store.list().length, 1);
    assert.equal(store.list()[0].level, 0);
    store.save({ ...first, reporter: "browser-two-12345" });
    store.save({ ...first, from: "b", to: "a" });
    assert.equal(create().list().length, 3);
    store.save({ ...first, level: null });
    assert.equal(store.list().length, 2);
    assert.throws(() => store.save({ ...first, level: "2" }), /Invalid/);
    assert.throws(() => store.save({ ...first, from: "unknown" }), /Invalid/);
    assert.throws(() => store.save({ ...first, type: "cab" }), /Invalid/);
    assert.throws(() => store.save({ ...first, reporter: "" }), /Invalid/);
    clock += REPORT_TTL;
    assert.equal(store.list().length, 0);
    assert.equal(create().list().length, 0);
  } finally {
    fs.rmSync(directory, { recursive: true });
  }
});
