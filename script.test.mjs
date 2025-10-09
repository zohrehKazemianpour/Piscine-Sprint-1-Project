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


test("setIntervalDates handles January 31st edge case correctly", () => {
  const startDate = "2025-01-31";
  const result = setIntervalDates(startDate);

  const [oneWeek, oneMonth, threeMonths, sixMonths, oneYear] = result;

  // 1 week: Jan 31 + 7 days = Feb 7
  assert.strictEqual(oneWeek, "2025-02-07");

  // 1 month: Jan 31 + 1 month = Feb 28 (Feb doesn't have 31 days)
  assert.strictEqual(oneMonth, "2025-02-28");

  // 3 months: Jan 31 + 3 months = April 30 (April doesn't have 31 days)
  assert.strictEqual(threeMonths, "2025-04-30");

  // 6 months: Jan 31 + 6 months = July 31
  assert.strictEqual(sixMonths, "2025-07-31");

  // 1 year: Jan 31 + 1 year = Jan 31, 2026
  assert.strictEqual(oneYear, "2026-01-31");
});

test("setIntervalDates handles leap year edge case", () => {
  const startDate = "2024-01-31"; // 2024 is a leap year
  const result = setIntervalDates(startDate);

  const [, oneMonth] = result;

  // 1 month: Jan 31, 2024 + 1 month = Feb 29, 2024 (leap year!)
  assert.strictEqual(oneMonth, "2024-02-29");
});