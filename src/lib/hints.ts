import { size } from "@/types/size";
import { adjacentCells } from "@/constants";
import { splashInfo } from "@/types/splashInfo";
import { ClickStatus } from "@/enums/clickStatus";

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

export function markSpaceClicked(
  status: number[][],
  row: number,
  column: number
) {
  const newStatus = status.map((row) => row.slice());
  newStatus[row][column] = ClickStatus.CLICKED;
  return newStatus;
}

export function revealSquare(status: number[][], row: number, column: number) {
  let newStatus = markSpaceClicked(status, row, column);
  for (const offset of adjacentCells) {
    const newRow = row + offset[0];
    const newCol = column + offset[1];
    const boardSize = { rows: status.length, columns: status[0].length };
    if (isOnBoard(newRow, newCol, boardSize)) {
      newStatus = markSpaceClicked(newStatus, newRow, newCol);
    }
  }
  return newStatus;
}

export function findAdjacentUnclickedZeroes(info: splashInfo) {
  const validZeroes = [];
  for (const offsets of adjacentCells) {
    const newRow = info.row + offsets[0];
    const newCol = info.col + offsets[1];
    if (
      isOnBoard(newRow, newCol, info.size) &&
      info.status[newRow][newCol] === ClickStatus.UNCLICKED &&
      info.values[newRow][newCol] === 0
    ) {
      validZeroes.push([newRow, newCol]);
    }
  }
  return validZeroes;
}

export function setupHints(mines: boolean[][]) {
  const hints = [];
  for (let i = 0; i < mines.length; i++) {
    const row = [];
    for (let j = 0; j < mines[0].length; j++) {
      if (mines[i][j]) {
        row.push(-1);
      } else {
        row.push(adjacentCellsWithMines(i, j, mines));
      }
    }
    hints.push(row);
  }
  return hints;
}
