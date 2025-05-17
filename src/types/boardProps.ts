import { boardUI } from "./boardUI";
import { size } from "./size";
import { spaceClickResult } from "./spaceClickResult";

type handlers = {
  handleClick: (row: number, column: number) => spaceClickResult;
  handleLoss: () => void;
  handleWin: () => void;
  checkForWin: (uiState: number[][]) => boolean;
  setBoardValue: (newValue: boardUI) => void;
  setBoardStatus: (newStatus: boardUI) => void;
  setLastSplashClick: (space: number[]) => void;
};

type boards = {
  boardValue: boardUI;
  boardStatus: boardUI;
};

type isGameOver = {
  isGameOver: boolean;
};

export type boardProps = size & handlers & boards & isGameOver;
