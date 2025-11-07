import { describe, it } from "@jest/globals";
import assert from "node:assert";
import {
  adjacentCellsWithMines,
  isOnBoard,
  markSpaceClicked,
  revealSquare,
  findAdjacentUnclickedZeroes,
  setupHints,
} from "./hints";

describe("Hints helper functions", () => {
  const gameState = [
    [0, 0, 0, 0, 0, 0, 2, -1],
    [0, 0, 0, 0, 0, 0, 3, -1],
    [0, 0, 0, 0, 0, 0, 3, -1],
    [0, 0, 0, 0, 0, 0, 3, -1],
    [0, 0, 0, 0, 0, 1, 5, -1],
    [0, 0, 0, 0, 2, -1, -1, -1],
    [0, 0, 0, 0, 4, -1, 8, -1],
    [0, 0, 0, 1, -1, -1, -1, -1],
  ];
  // const gameState = [
  //   [false, false, false, false, false, false, false, true],
  //   [false, false, false, false, false, false, false, true],
  //   [false, false, false, false, false, false, false, true],
  //   [false, false, false, false, false, false, false, true],
  //   [false, false, false, false, false, false, false, true],
  //   [false, false, false, false, false, true, true, true],
  //   [false, false, false, false, false, true, false, true],
  //   [false, false, false, false, true, true, true, true],
  // ];

  const spacesClicked = [
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 1, 1],
  ];

  const emptyBoardStatuses = new Array(8).fill(new Array(8).fill(0));

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

  it("Determines a valid space is on the board", () => {
    const isValid = isOnBoard(1, 1, { rows: 4, columns: 4 });
    assert.strictEqual(isValid, true);
  });

  it("Determines a space with an invalid row is not on the board", () => {
    const isValid = isOnBoard(-1, 1, { rows: 4, columns: 4 });
    assert.strictEqual(isValid, false);
  });

  it("Determines a space with an invalid column is not on the board", () => {
    const isValid = isOnBoard(1, 4, { rows: 4, columns: 4 });
    assert.strictEqual(isValid, false);
  });

  it("Determines a space with invalid row and column is not on the board", () => {
    const isValid = isOnBoard(4, -1, { rows: 4, columns: 4 });
    assert.strictEqual(isValid, false);
  });

  it("Marks a space as clicked", () => {
    const newBoard = markSpaceClicked(emptyBoardStatuses, 0, 0);
    assert.strictEqual(newBoard[0][0], 1); // clicked
  });

  it("Reveals a square", () => {
    const newBoard = revealSquare(emptyBoardStatuses, 1, 1);
    assert.strictEqual(newBoard[0][0], 1);
    assert.strictEqual(newBoard[0][1], 1);
    assert.strictEqual(newBoard[0][2], 1);
    assert.strictEqual(newBoard[1][0], 1);
    assert.strictEqual(newBoard[1][1], 1);
    assert.strictEqual(newBoard[1][2], 1);
    assert.strictEqual(newBoard[2][0], 1);
    assert.strictEqual(newBoard[2][1], 1);
    assert.strictEqual(newBoard[2][2], 1);
  });

  it("Reveals a square for an edge space", () => {
    const newBoard = revealSquare(emptyBoardStatuses, 1, 0);
    assert.strictEqual(newBoard[0][0], 1);
    assert.strictEqual(newBoard[0][1], 1);
    assert.strictEqual(newBoard[1][0], 1);
    assert.strictEqual(newBoard[1][1], 1);
    assert.strictEqual(newBoard[2][0], 1);
    assert.strictEqual(newBoard[2][1], 1);
  });

  it("Finds adjacent unclicked zeroes", () => {
    const info = {
      status: spacesClicked,
      values: setupHints(gameState),
      row: 1,
      col: 1,
      size: { rows: 8, columns: 8 },
    };
    const zeroes = findAdjacentUnclickedZeroes(info);
    assert.strictEqual(zeroes.length, 7); // one space is clicked
  });

  it("Sets up hints", () => {
    const hints = setupHints(gameState);
    const expected = [
      [0, 0, 0, 0, 0, 0, 2, -1],
      [0, 0, 0, 0, 0, 0, 3, -1],
      [0, 0, 0, 0, 0, 0, 3, -1],
      [0, 0, 0, 0, 0, 0, 3, -1],
      [0, 0, 0, 0, 1, 2, 5, -1],
      [0, 0, 0, 0, 2, -1, -1, -1],
      [0, 0, 0, 1, 4, -1, 8, -1],
      [0, 0, 0, 1, -1, -1, -1, -1],
    ];
    assert.deepStrictEqual(hints, expected);
  });
});
