export function adjacentCellsWithMines(row: number, col: number, gameState: boolean[][]) {
  let total = 0;
  for (let rOffset = -1; rOffset < 2; rOffset++) {
    if ((row + rOffset < gameState.length) && (row + rOffset >= 0)) {
      for (let cOffset = -1; cOffset < 2; cOffset++) {
        if ((col + cOffset < gameState[0].length) && (col + cOffset >= 0) &&
             gameState[row + rOffset][col + cOffset]) {
          total++;
        }
      }
    }
  }
  return total;
}
