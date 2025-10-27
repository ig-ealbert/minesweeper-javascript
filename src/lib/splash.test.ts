import { describe, it } from "@jest/globals";
import assert from "node:assert";
import { arrayContainsSpace, fastSplash } from "./splash";

describe("Splash helper functions", () => {
  const emptyNumArray = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const zeroRow = new Array(8).fill(0);
  const oneRow = new Array(8).fill(1);

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

  it("Splashes with no splashes", () => {
    const status = emptyNumArray.map(() => zeroRow.slice());
    const values = emptyNumArray.map(() => oneRow.slice());
    values[1][1] = 0;
    const info = {
      status,
      values,
      row: 1,
      col: 1,
      size: { rows: 8, columns: 8 },
    };
    const newStatus = fastSplash(info);
    const expectedStatus = status.map((row) => row.slice());
    expectedStatus[0][0] = 1;
    expectedStatus[0][1] = 1;
    expectedStatus[0][2] = 1;
    expectedStatus[1][0] = 1;
    expectedStatus[1][1] = 1;
    expectedStatus[1][2] = 1;
    expectedStatus[2][0] = 1;
    expectedStatus[2][1] = 1;
    expectedStatus[2][2] = 1;
    assert.deepStrictEqual(expectedStatus, newStatus);
  });

  it("Splashes once", () => {
    const status = emptyNumArray.map(() => zeroRow.slice());
    const values = emptyNumArray.map(() => oneRow.slice());
    values[1][1] = 0;
    values[2][1] = 0;
    const info = {
      status,
      values,
      row: 1,
      col: 1,
      size: { rows: 8, columns: 8 },
    };
    const newStatus = fastSplash(info);
    const expectedStatus = status.map((row) => row.slice());
    expectedStatus[0][0] = 1;
    expectedStatus[0][1] = 1;
    expectedStatus[0][2] = 1;
    expectedStatus[1][0] = 1;
    expectedStatus[1][1] = 1;
    expectedStatus[1][2] = 1;
    expectedStatus[2][0] = 1;
    expectedStatus[2][1] = 1;
    expectedStatus[2][2] = 1;
    expectedStatus[3][0] = 1;
    expectedStatus[3][1] = 1;
    expectedStatus[3][2] = 1;
    assert.deepStrictEqual(expectedStatus, newStatus);
  });
});
