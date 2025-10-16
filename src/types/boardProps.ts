import { boardUI } from "./boardUI";
import { size } from "./size";

type handlers = {
  handleLoss: () => void;
  handleWin: () => void;
  checkForWin: (uiState: number[][]) => boolean;
  setBoardStatus: (newStatus: boardUI) => void;
  splash: (row: number, col: number) => void;
};

type boards = {
  boardValue: boardUI;
  boardStatus: boardUI;
};

type isGameOver = {
  isGameOver: boolean;
};

export type boardProps = size & handlers & boards & isGameOver;
