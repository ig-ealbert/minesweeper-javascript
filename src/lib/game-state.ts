import { size } from "@/types/size";

export function initializeMines(size: size, mines: number) {
  let board = [];
  const row = new Array(size.columns).fill(false);
  for (let i = 0; i < size.rows; i++) {
    board.push(row.slice());
  }
  board = addMines(board, mines);
  return board;
}

function addMines(board: boolean[][], mines: number) {
  for (let i = 0; i < mines; i++) {
    const randomRow = randomInt(0, board.length);
    const randomCol = randomInt(0, board[0].length);
    if (!board[randomRow][randomCol]) {
      // if cell is not a mine
      board[randomRow][randomCol] = true; // add a mine
    } else {
      i--; // otherwise redo
    }
  }
  return board;
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
