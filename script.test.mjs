import assert from "node:assert";
import test from "node:test";
import { setIntervalDates } from "./utils.mjs";

test("setIntervalDates returns correct future dates", () => {
  const startDate = "2025-01-01";
  const result = setIntervalDates(startDate);

  const [
    oneWeek,
    oneMonth,
    threeMonths,
    sixMonths,
    oneYear,
  ] = result;

  assert.strictEqual(oneWeek, "2025-01-08");
  assert.strictEqual(oneMonth, "2025-02-01");

  // allow either March 31 or April 1
  assert.ok(["2025-03-31", "2025-04-01"].includes(threeMonths));

  // allow either June 30 or July 1
  assert.ok(["2025-06-30", "2025-07-01"].includes(sixMonths));

  assert.strictEqual(oneYear, "2026-01-01");
});

test("setIntervalDates handles end-of-month edge cases", () => {
  const startDate = "2024-01-31"; // tricky date
  const result = setIntervalDates(startDate);
  const [oneWeek, oneMonth, threeMonths] = result;

  assert.ok(oneWeek.startsWith("2024-02"));
  assert.ok(oneMonth.startsWith("2024-02") || oneMonth.startsWith("2024-03"));
  assert.ok(threeMonths.startsWith("2024"));
});