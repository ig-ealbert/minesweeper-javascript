const table = document.getElementById("board");
const message = document.getElementById("message");
const resetButton = document.getElementById("restartGame");

let uiState; // 0 = unclicked, 1 = clicked, 2 = flagged
let gameState = startGame("easy"); // true = mine, false = no mine

function startGame(level) {
  let rows, columns, mines;
  if (level == "easy") {
    rows = 8;
    columns = 8;
    mines = 10;
  }
  else if (level == "medium") {
    rows = 8;
    columns = 16;
    mines = 20;
  }
  else {
    rows = 16;
    columns = 16;
    mines = 40;
  }
  createBoardUI(rows, columns);
  initializeUIState(rows, columns);
  return initializeGameState(rows, columns, mines);
}

function createBoardUI(rows, columns) {
  resetMessageAndButton();
  table.innerHTML = ""; // clear previous board
  for (let i = 0; i < rows; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < columns; j++) {
      tr.appendChild(createTD());
    }
    table.appendChild(tr);
  }
}

function resetMessageAndButton() {
  message.innerHTML = "";
  resetButton.classList.remove("greenBorder");
}

function createTD() {
  const td = document.createElement("td");
  td.appendChild(createButton());
  return td;
}

function createButton() {
  const button = document.createElement("button");
  button.onclick = function() {
    cellClicked(this.parentNode);
  };
  button.oncontextmenu = function(e) {
    e.preventDefault();
    cellFlagged(this.parentNode);
  };
  return button;
}

function initializeUIState(rows, columns) {
  uiState = [];
  const uiRow = new Array(columns).fill(0);
  for (let i = 0; i < rows; i++) {
    uiState.push(uiRow.slice());
  }
}

function initializeGameState(rows, columns, mines) {
  let board = [];
  const row = new Array(columns).fill(false);
  for (let i = 0; i < rows; i++) {
    board.push(row.slice());
  }
  board = addMines(board, mines);
  return board;
}

function addMines(board, mines) {
  for (let i = 0; i < mines; i++) {
    const randomRow = randomInt(0, board.length);
    const randomCol = randomInt(0, board[0].length);
    if (!board[randomRow][randomCol]) { // if cell is not a mine
      board[randomRow][randomCol] = true; // add a mine
    }
    else {
      i--; // otherwise redo
    }
  }
  return board;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function cellClicked(cell) {
  const row = cell.parentNode.rowIndex;
  const col = cell.cellIndex;
  if (uiState[row][col] !== 2) { // don't click flagged cells
    uiState[row][col] = 1;
    if (gameState[row][col]) {
      setImage(cell, 'url("mine.png")');
      endGame("You lose!");
    }
    else {
      const hint = adjacentCellsWithMines(row, col);
      cell.children[0].innerHTML = hint;
      if (hint === 0) {
        splashHints(row, col);
      }
      checkForWin();
    }
    cell.children[0].disabled = true;
  }
}

function cellFlagged(cell) {
  const row = cell.parentNode.rowIndex;
  const col = cell.cellIndex;
  if (uiState[row][col] !== 2) {
    setImage(cell, 'url("flag.png")');
    uiState[row][col] = 2;
  }
  else {
    setImage(cell, "");
    uiState[row][col] = 0;
  }
}

function setImage(cell, url) {
  cell.children[0].style.backgroundImage = url;
}

function endGame(result) {
  message.innerHTML = result;
  resetButton.classList.add("greenBorder");
}

function adjacentCellsWithMines(row, col) {
  let total = 0;
  for (let rOffset = -1; rOffset < 2; rOffset++) {
    if ((row + rOffset < gameState.length) && (row + rOffset >= 0)) {
      for (let cOffset = -1; cOffset < 2; cOffset++) {
        if ((col + cOffset < gameState[0].length) && (col + cOffset >= 0)) {
          if (gameState[row + rOffset][col + cOffset]) {
            total++;
          }
        }
      }
    }
  }
  return total;
}

function splashHints(row, col) {
  for (let rOffset = -1; rOffset < 2; rOffset++) {
    const newRow = row + rOffset;
    if ((newRow < gameState.length) && (newRow >= 0)) {
      for (let cOffset = -1; cOffset < 2; cOffset++) {
        const newCol = col + cOffset;
        if ((newCol < gameState[0].length) && (newCol >= 0)) {
          if (uiState[newRow][newCol] === 0) { // only splash unclicked spaces
            cellClicked(getCell(row + rOffset, col + cOffset));
          }
        }
      }
    }
  }
}

function getCell(row, col) {
  const cellRow = board.getElementsByTagName("tr")[row];
  const cell = cellRow.getElementsByTagName("td")[col];
  return cell;
}

function checkForWin() {
  for (let i = 0; i < gameState.length; i++) {
    for (let j = 0; j < gameState[i].length; j++) {
      if (uiState[i][j] !== 1 && !gameState[i][j]) { // hidden mines still exist
        return false;
      }
    }
  }
  endGame("You win!");
  return true;
}
