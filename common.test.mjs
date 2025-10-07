import { getUserIDs } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";
import { setIntervalDates } from "./utils.mjs";


test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});
