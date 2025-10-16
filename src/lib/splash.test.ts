import { describe, it } from "@jest/globals";
import assert from "node:assert";
import { arrayContainsSpace } from "./splash";

describe("Splash helper functions", () => {
  it("Finds that an array contains a space", () => {
    const doesContain = arrayContainsSpace(
      [
        [0, 0],
        [0, 1],
      ],
      [0, 1]
    );
    assert.strictEqual(doesContain, true);
  });
  it("Finds that an array does not contain a space", () => {
    const doesContain = arrayContainsSpace(
      [
        [0, 0],
        [0, 1],
      ],
      [1, 1]
    );
    assert.strictEqual(doesContain, false);
  });
});
