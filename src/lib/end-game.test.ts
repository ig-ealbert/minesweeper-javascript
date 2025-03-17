import { describe, it } from "@jest/globals"
import assert from "node:assert";
import { checkForWin } from "./end-game";
 
describe("End game helper functions", () => {
  const gameState = [
    [false, false, false, false, false, false, false, true],
    [false, false, false, false, false, false, false, true],
    [false, false, false, false, false, false, false, true],
    [false, false, false, false, false, false, false, true],
    [false, false, false, false, false, false, false, true],
    [false, false, false, false, false, false, false, true],
    [false, false, false, false, false, false, false, true],
    [false, false, false, false, false, false, false, true],
  ];

  const uiState = [
    [1, 1, 1, 1, 1, 1, 1, 2],
    [1, 1, 1, 1, 1, 1, 1, 2],
    [1, 1, 1, 1, 1, 1, 1, 2],
    [1, 1, 1, 1, 1, 1, 1, 2],
    [1, 1, 1, 1, 1, 1, 1, 2],
    [1, 1, 1, 1, 1, 1, 1, 2],
    [1, 1, 1, 1, 1, 1, 1, 2],
    [1, 1, 1, 1, 1, 1, 1, 2],
  ];
  
  it("Win if all mines have been flagged and all other spaces clicked", () => {
    const didWin = checkForWin(gameState, uiState);
    assert.ok(didWin);
  });

  it("Win if all non-mine spaces clicked", () => {
    const uiStateNoFlags = uiState.map((row) => row.map((entry) => entry === 2 ? 0 : 1));
    const didWin = checkForWin(gameState, uiStateNoFlags);
    assert.ok(didWin);
  });

  it("Does not win if a hidden mine still exists", () => {
    const uiStateNoFlags = new Array(8).fill(new Array(8).fill(0));
    const didWin = checkForWin(gameState, uiStateNoFlags);
    assert.ok(!didWin);
  });
});
