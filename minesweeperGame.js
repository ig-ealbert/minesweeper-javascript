var gameState = setDifficulty("easy"); // true = mine, false = safe
var uiState; // 0 = unclicked, 1 = clicked, 2 = flagged

function setDifficulty(level) {
	var rows, columns, mines;
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
	uiState = initializeUIState(rows, columns);
	return initializeGameState(rows, columns, mines);
}

function createBoardUI(rows, columns) {
	resetMessageAndButton();
	var table = document.getElementById("board");
	table.innerHTML = ""; // clear previous board
	for (var i = 0; i < rows; i++) {
		var tr = document.createElement("tr");
		for (var j = 0; j < columns; j++) {
			tr.appendChild(createTD());
		}
		table.appendChild(tr);
	}
}

function resetMessageAndButton() {
	var message = document.getElementById("message");
	message.innerHTML = "";
	var resetButton = document.getElementById("restartGame");
	resetButton.classList.remove("greenBorder");
}

function createTD() {
	var td = document.createElement("td");
	td.appendChild(createButton());
	return td;
}

function createButton() {
	var button = document.createElement("button");
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
	var uiState = [];
	var uiRow = new Array(columns).fill(0);
	for (var i = 0; i < rows; i++) {
		uiState.push(uiRow.slice());
	}
	return uiState;
}

function initializeGameState(rows, columns, mines) {
	var board = [];
	var row = new Array(columns).fill(false);
	for (var i = 0; i < rows; i++) {
		board.push(row.slice());
	}
	board = addMines(board, mines);
	return board;
}

function addMines(board, mines) {
	for (var i = 0; i < mines; i++) {
		var randomRow = randomInt(0, board.length);
		var randomCol = randomInt(0, board[0].length);
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
	var row = cell.parentNode.rowIndex;
	var col = cell.cellIndex;
	if (uiState[row][col] !== 2) { // don't click flagged cells
		uiState[row][col] = 1;
		if (gameState[row][col]) {
			cell.children[0].style.backgroundImage = 'url("mine.png")';
			endGame("You lose!");
		}
		else {
			cell.children[0].innerHTML = adjacentCellsWithMines(cell);
			if (checkForWin()) {
				endGame("You win!");
			}
		}
		cell.children[0].disabled = true;
	}
}

function cellFlagged(cell) {
	var row = cell.parentNode.rowIndex;
	var col = cell.cellIndex;
	if (uiState[row][col] !== 2) {
		cell.children[0].style.backgroundImage = 'url("flag.png")';
		uiState[row][col] = 2;
	}
	else {
		cell.children[0].style.backgroundImage = "";
		uiState[row][col] = 0;
	}
	
}

function endGame(result) {
	var message = document.getElementById("message");
	message.innerHTML = result;
	var resetButton = document.getElementById("restartGame");
	resetButton.classList.add("greenBorder");
}

function adjacentCellsWithMines(cell) {
	var row = cell.parentNode.rowIndex;
	var col = cell.cellIndex;
	var rows = gameState.length;
	var cols = gameState[0].length;
	var total = 0;
	for (var rOffset = -1; rOffset < 2; rOffset++) {
        if ((row + rOffset < rows) && (row + rOffset >= 0)) {
            for (var cOffset = -1; cOffset < 2; cOffset++) {
                if ((col + cOffset < cols) && (col + cOffset >= 0)) {
                    if (gameState[row + rOffset][col + cOffset]) {
                        total++;
                    }
                }
            }
        }
    }
	return total;
}

function checkForWin() {
	for (var i = 0; i < gameState.length; i++) {
		for (var j = 0; j < gameState[i].length; j++) {
			if (uiState[i][j] !== 1 && !gameState[i][j]) { // hidden mines still exist
				return false;
			}
		}
	}
	return true;
}
