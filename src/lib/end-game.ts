import { ClickStatus } from "@/enums/clickStatus";

export function checkForWin(gameState: number[][], uiState: number[][]) {
  for (let i = 0; i < gameState.length; i++) {
    for (let j = 0; j < gameState[i].length; j++) {
      if (uiState[i][j] === ClickStatus.UNCLICKED && gameState[i][j] !== -1) {
        // unclicked non-mine spaces exist
        return false;
      }
    }
  }
  return true;
}

export function getGameOverMessage(isWin: boolean) {
  if (isWin) {
    return "You win!";
  } else {
    return "You clicked on a mine.  You lose!";
  }
}
