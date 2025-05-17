import { size } from "@/types/size";
import { adjacentCells } from "@/constants";
import { hint } from "@/types/hint";

export function adjacentCellsWithMines(
  row: number,
  col: number,
  gameState: boolean[][]
) {
  let total = 0;
  for (const offsets of adjacentCells) {
    const newRow = row + offsets[0];
    const newCol = col + offsets[1];
    const size = { rows: gameState.length, columns: gameState[0].length };
    if (isOnBoard(newRow, newCol, size) && gameState[newRow][newCol]) {
      total++; // mine on adjacent cell
    }
  }
  return total;
}

export function isOnBoard(row: number, col: number, size: size) {
  return row >= 0 && row < size.rows && col >= 0 && col < size.columns;
}

export function hasAdjacentUnclickedSpace(
  row: number,
  col: number,
  status: number[][]
) {
  for (const offsets of adjacentCells) {
    const newRow = row + offsets[0];
    const newCol = col + offsets[1];
    const size = { rows: status.length, columns: status[0].length };
    if (isOnBoard(newRow, newCol, size) && status[newRow][newCol] === 0) {
      return {
        exists: true, // unclicked space exists
        row: newRow,
        col: newCol,
      };
    }
  }
  return {
    exists: false,
    row: -1,
    col: -1,
  };
}

export function updateBoardWithHint(
  status: number[][],
  values: number[][],
  hint: hint
) {
  const newValues = values.map((row) => row.slice());
  const newStatus = status.map((row) => row.slice());
  newValues[hint.row][hint.column] = hint.value;
  newStatus[hint.row][hint.column] = 1;
  return { values: newValues, status: newStatus };
}

export function findFirstSpaceToSplash(status: number[][], values: number[][]) {
  for (let row = 0; row < status.length; row++) {
    for (let col = 0; col < status[0].length; col++) {
      const potentialSpace = hasAdjacentUnclickedSpace(row, col, status);
      if (
        values[row][col] === 0 && // No mines adjacent
        status[row][col] === 1 && // Space is clicked
        potentialSpace.exists // Found unclicked adjacent space
      ) {
        return {
          exists: true,
          row: potentialSpace.row,
          col: potentialSpace.col,
        };
      }
    }
  }
  return {
    exists: false,
    row: -1,
    col: -1,
  };
}
