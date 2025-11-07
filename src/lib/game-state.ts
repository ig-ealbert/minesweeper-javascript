import { size } from "@/types/size";

export function initializeMines(size: size, mines: number) {
  let board = [];
  const row = new Array(size.columns).fill(-2);
  for (let i = 0; i < size.rows; i++) {
    board.push(row.slice());
  }
  board = addMines(board, mines);
  return board;
}

function addMines(board: number[][], mines: number) {
  for (let i = 0; i < mines; i++) {
    const randomRow = randomInt(0, board.length);
    const randomCol = randomInt(0, board[0].length);
    if (board[randomRow][randomCol] !== -1) {
      // if cell is not a mine
      board[randomRow][randomCol] = -1; // add a mine
    } else {
      i--; // otherwise redo
    }
  }
  return board;
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
