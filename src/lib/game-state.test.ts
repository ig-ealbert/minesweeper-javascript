import { describe, it } from "@jest/globals";
import assert from "node:assert";
import { initializeMines } from "./game-state";

describe("Game state helper functions", () => {
  function countMines(board: number[][]) {
    let mines = 0;
    for (const row of board) {
      const count = row.filter((value) => value === -1);
      mines = mines + count.length;
    }
    return mines;
  }

  it("Initializes game state with 10 mines", () => {
    const state = initializeMines({ rows: 8, columns: 8 }, 10);
    const numMines = countMines(state);
    assert.strictEqual(state.length, 8);
    assert.strictEqual(state[0].length, 8);
    assert.strictEqual(numMines, 10);
  });

  it("Initializes game state with 20 mines", () => {
    const state = initializeMines({ rows: 16, columns: 8 }, 20);
    const numMines = countMines(state);
    assert.strictEqual(state.length, 16);
    assert.strictEqual(state[0].length, 8);
    assert.strictEqual(numMines, 20);
  });

  it("Initializes game state with 40 mines", () => {
    const state = initializeMines({ rows: 16, columns: 16 }, 40);
    const numMines = countMines(state);
    assert.strictEqual(state.length, 16);
    assert.strictEqual(state[0].length, 16);
    assert.strictEqual(numMines, 40);
  });
});
