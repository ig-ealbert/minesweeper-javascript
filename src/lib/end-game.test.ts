import { describe, it } from "@jest/globals";
import assert from "node:assert";
import { checkForWin, getGameOverMessage } from "./end-game";

describe("End game helper functions", () => {
  const gameState = [
    [0, 0, 0, 0, 0, 0, 2, -1],
    [0, 0, 0, 0, 0, 0, 3, -1],
    [0, 0, 0, 0, 0, 0, 3, -1],
    [0, 0, 0, 0, 0, 0, 3, -1],
    [0, 0, 0, 0, 0, 0, 3, -1],
    [0, 0, 0, 0, 0, 0, 3, -1],
    [0, 0, 0, 0, 0, 0, 3, -1],
    [0, 0, 0, 0, 0, 0, 2, -1],
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
    const uiStateNoFlags = uiState.map((row) =>
      row.map((entry) => (entry === 2 ? 0 : 1))
    );
    const didWin = checkForWin(gameState, uiStateNoFlags);
    assert.ok(didWin);
  });

  it("Does not win if a hidden mine still exists", () => {
    const uiStateNoFlags = new Array(8).fill(new Array(8).fill(0));
    const didWin = checkForWin(gameState, uiStateNoFlags);
    assert.ok(!didWin);
  });

  it("Gets message for win", () => {
    const message = getGameOverMessage(true);
    assert.strictEqual(message, "You win!");
  });

  it("Gets message for loss", () => {
    const message = getGameOverMessage(false);
    assert.strictEqual(message, "You clicked on a mine.  You lose!");
  });
});
