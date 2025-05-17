import { describe, it } from "@jest/globals";
import assert from "node:assert";
import {
  adjacentCellsWithMines,
  isOnBoard,
  hasAdjacentUnclickedSpace,
  updateBoardWithHint,
  findFirstSpaceToSplash,
} from "./hints";

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
  const fullBoardSpacesClicked = new Array(8).fill(new Array(8).fill(1));

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

  it("Finds an adjacent unclicked space when one exists", () => {
    const potentialSpace = hasAdjacentUnclickedSpace(0, 0, spacesClicked);
    assert.deepStrictEqual(potentialSpace, {
      exists: true,
      row: 0,
      col: 1,
    });
  });

  it("Finds no adjacent unclicked space when one does not exist", () => {
    const potentialSpace = hasAdjacentUnclickedSpace(6, 6, spacesClicked);
    assert.deepStrictEqual(potentialSpace, {
      exists: false,
      row: -1,
      col: -1,
    });
  });

  it("Finds no adjacent unclicked space - literal corner case", () => {
    const potentialSpace = hasAdjacentUnclickedSpace(7, 7, spacesClicked);
    assert.deepStrictEqual(potentialSpace, {
      exists: false,
      row: -1,
      col: -1,
    });
  });

  it("Updates board with hint", () => {
    const newBoards = updateBoardWithHint(
      emptyBoardStatuses,
      emptyBoardStatuses,
      {
        row: 0,
        column: 0,
        value: 1,
      }
    );
    assert.strictEqual(newBoards.values[0][0], 1); // 1 adjacent mine
    assert.strictEqual(newBoards.status[0][0], 1); // clicked
  });

  it("Finds the first space to splash when one exists", () => {
    const potentialSpace = findFirstSpaceToSplash(
      spacesClicked,
      emptyBoardStatuses
    );
    assert.strictEqual(potentialSpace.exists, true);
    assert.strictEqual(potentialSpace.row, 0);
    assert.strictEqual(potentialSpace.col, 1);
  });

  it("Finds no spaces to splash because no zeros are clicked", () => {
    const potentialSpace = findFirstSpaceToSplash(
      emptyBoardStatuses,
      emptyBoardStatuses
    );
    assert.strictEqual(potentialSpace.exists, false);
    assert.strictEqual(potentialSpace.row, -1);
    assert.strictEqual(potentialSpace.col, -1);
  });

  it("Finds no spaces to splash because adjacent cells are clicked", () => {
    const potentialSpace = findFirstSpaceToSplash(
      fullBoardSpacesClicked,
      emptyBoardStatuses
    );
    assert.strictEqual(potentialSpace.exists, false);
    assert.strictEqual(potentialSpace.row, -1);
    assert.strictEqual(potentialSpace.col, -1);
  });
});
