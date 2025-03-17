export function checkForWin(gameState: boolean[][], uiState: number[][]) {
  for (let i = 0; i < gameState.length; i++) {
    for (let j = 0; j < gameState[i].length; j++) {
      if (uiState[i][j] !== 1 && !gameState[i][j]) { // hidden mines still exist
        return false;
      }
    }
  }
  return true;
}
