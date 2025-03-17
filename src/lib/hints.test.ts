import { describe, it } from "@jest/globals"
import assert from "node:assert";
import { adjacentCellsWithMines } from "./hints";
 
describe("Hints helper functions", () => {
  const gameState = [
    [false, false, false, false, false, false, false, true],
    [false, false, false, false, false, false, false, true],
    [false, false, false, false, false, false, false, true],
    [false, false, false, false, false, false, false, true],
    [false, false, false, false, false, false, false, true],
    [false, false, false, false, false, true, true, true],
    [false, false, false, false, false, true, false, true],
    [false, false, false, false, true, true, true, true],
  ];

  it("Finds 0 adjacent cells with mines", () => {
    const answer = adjacentCellsWithMines(0, 0, gameState);
    assert.strictEqual(answer, 0);
  });

  it("Finds 1 adjacent cell with mines", () => {
    const answer = adjacentCellsWithMines(4, 4, gameState);
    assert.strictEqual(answer, 1);
  });

  it("Finds 2 adjacent cells with mines", () => {
    const answer = adjacentCellsWithMines(5, 4, gameState);
    assert.strictEqual(answer, 2);
  });

  it("Finds 3 adjacent cells with mines", () => {
    const answer = adjacentCellsWithMines(1, 6, gameState);
    assert.strictEqual(answer, 3);
  });

  it("Finds 4 adjacent cells with mines", () => {
    const answer = adjacentCellsWithMines(6, 4, gameState);
    assert.strictEqual(answer, 4);
  });

  it("Finds 5 adjacent cells with mines", () => {
    const answer = adjacentCellsWithMines(4, 6, gameState);
    assert.strictEqual(answer, 5);
  });

  it("Finds 8 adjacent cells with mines", () => {
    const answer = adjacentCellsWithMines(6, 6, gameState);
    assert.strictEqual(answer, 8);
  });
});