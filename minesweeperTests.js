QUnit.test( "Initially the message div should be blank", function (assert ) {
  assert.equal( message.innerHTML, "", "No message should be displayed when the game starts." );
});

QUnit.test( "The reset button should not be highlighted when the game starts", function (assert ) {
  assert.equal( resetButton.classList.contains("greenBorder"), false, "The reset button should not have a green border." );
});

QUnit.test( "The easy game should be initialized with 10 mines", function (assert ) {
  gameState = startGame("easy");
  let actual = 0;
  for (const row of gameState) {
    const mines = row.filter(cell => cell);
    actual += mines.length;
  }
  assert.equal( actual, 10, "The game state should contain mines." );
});

QUnit.test( "The medium game should be initialized with 20 mines", function (assert ) {
  gameState = startGame("medium");
  let actual = 0;
  for (const row of gameState) {
    const mines = row.filter(cell => cell);
    actual += mines.length;
  }
  assert.equal( actual, 20, "The game state should contain mines." );
});

QUnit.test( "The hard game should be initialized with 40 mines", function (assert ) {
  gameState = startGame("hard");
  let actual = 0;
  for (const row of gameState) {
    const mines = row.filter(cell => cell);
    actual += mines.length;
  }
  assert.equal( actual, 40, "The game state should contain mines." );
});

QUnit.test( "The easy game should have 8 rows", function (assert ) {
  gameState = startGame("easy");
  assert.equal( gameState.length, 8, "The game state should contain 8 rows." );
});

QUnit.test( "The easy game should have 8 columns", function (assert ) {
  gameState = startGame("easy");
  assert.equal( gameState[0].length, 8, "The game state should contain 8 columns." );
});

QUnit.test( "The medium game should have 8 rows", function (assert ) {
  gameState = startGame("medium");
  assert.equal( gameState.length, 8, "The game state should contain 8 rows." );
});

QUnit.test( "The medium game should have 16 columns", function (assert ) {
  gameState = startGame("medium");
  assert.equal( gameState[0].length, 16, "The game state should contain 16 columns." );
});

QUnit.test( "The hard game should have 16 rows", function (assert ) {
  gameState = startGame("hard");
  assert.equal( gameState.length, 16, "The game state should contain 16 rows." );
});

QUnit.test( "The hard game should have 16 columns", function (assert ) {
  gameState = startGame("hard");
  assert.equal( gameState[0].length, 16, "The game state should contain 16 columns." );
});

QUnit.test( "The reset button should be highlighted when the game is lost", function (assert ) {
  endGame("You lose!");
  assert.equal( resetButton.classList.contains("greenBorder"), true, "The reset button should have a green border." );
});

QUnit.test( "A message is displayed when the game is lost", function (assert ) {
  endGame("You lose!");
  assert.equal( message.innerHTML, "You lose!", "A message is displayed indicating the loss." );
});

QUnit.test( "A cell with 0 adjacent mines should display 0 when clicked", function (assert ) {
  gameState = [[false, false, false], [false, false, false], [false, false, false]];
  const secondRow = table.getElementsByTagName("tr")[1];
  const secondCell = secondRow.getElementsByTagName("td")[1];
  cellClicked(secondCell);
  const button = secondCell.children[0];
  assert.equal( button.innerHTML, "0", "0 is displayed as the cell hint." );
});

QUnit.test( "A cell with 1 adjacent mine should display 1 when clicked", function (assert ) {
  gameState = [[false, false, false], [false, false, true], [false, false, false]];
  const secondRow = table.getElementsByTagName("tr")[1];
  const secondCell = secondRow.getElementsByTagName("td")[1];
  cellClicked(secondCell);
  const button = secondCell.children[0];
  assert.equal( button.innerHTML, "1", "1 is displayed as the cell hint." );
});

QUnit.test( "A cell with 2 adjacent mines should display 2 when clicked", function (assert ) {
  gameState = [[false, false, false], [true, false, true], [false, false, false]];
  const secondRow = table.getElementsByTagName("tr")[1];
  const secondCell = secondRow.getElementsByTagName("td")[1];
  cellClicked(secondCell);
  const button = secondCell.children[0];
  assert.equal( button.innerHTML, "2", "2 is displayed as the cell hint." );
});

QUnit.test( "A cell with 3 adjacent mines should display 3 when clicked", function (assert ) {
  gameState = [[false, true, false], [true, false, true], [false, false, false]];
  const secondRow = table.getElementsByTagName("tr")[1];
  const secondCell = secondRow.getElementsByTagName("td")[1];
  cellClicked(secondCell);
  const button = secondCell.children[0];
  assert.equal( button.innerHTML, "3", "3 is displayed as the cell hint." );
});

QUnit.test( "A cell with 4 adjacent mines should display 4 when clicked", function (assert ) {
  gameState = [[false, true, false], [true, false, true], [false, true, false]];
  const secondRow = table.getElementsByTagName("tr")[1];
  const secondCell = secondRow.getElementsByTagName("td")[1];
  cellClicked(secondCell);
  const button = secondCell.children[0];
  assert.equal( button.innerHTML, "4", "4 is displayed as the cell hint." );
});

QUnit.test( "A cell with 5 adjacent mines should display 5 when clicked", function (assert ) {
  gameState = [[true, true, false], [true, false, true], [false, true, false]];
  const secondRow = table.getElementsByTagName("tr")[1];
  const secondCell = secondRow.getElementsByTagName("td")[1];
  cellClicked(secondCell);
  const button = secondCell.children[0];
  assert.equal( button.innerHTML, "5", "5 is displayed as the cell hint." );
});

QUnit.test( "A cell with 6 adjacent mines should display 6 when clicked", function (assert ) {
  gameState = [[true, true, true], [true, false, true], [false, true, false]];
  const secondRow = table.getElementsByTagName("tr")[1];
  const secondCell = secondRow.getElementsByTagName("td")[1];
  cellClicked(secondCell);
  const button = secondCell.children[0];
  assert.equal( button.innerHTML, "6", "6 is displayed as the cell hint." );
});

QUnit.test( "A cell with 7 adjacent mines should display 7 when clicked", function (assert ) {
  gameState = [[true, true, true], [true, false, true], [true, true, false]];
  const secondRow = table.getElementsByTagName("tr")[1];
  const secondCell = secondRow.getElementsByTagName("td")[1];
  cellClicked(secondCell);
  const button = secondCell.children[0];
  assert.equal( button.innerHTML, "7", "7 is displayed as the cell hint." );
});

QUnit.test( "A cell with 8 adjacent mines should display 8 when clicked", function (assert ) {
  gameState = [[true, true, true], [true, false, true], [true, true, true]];
  const secondRow = table.getElementsByTagName("tr")[1];
  const secondCell = secondRow.getElementsByTagName("td")[1];
  cellClicked(secondCell);
  const button = secondCell.children[0];
  assert.equal( button.innerHTML, "8", "8 is displayed as the cell hint." );
});

QUnit.test( "A cell with 0 adjacent mines should splash when clicked", function (assert ) {
  gameState = [[false, false, false, false], [true, false, false, false], [true, false, false, false], [false, true, true, false]];
  uiState = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  const secondRow = table.getElementsByTagName("tr")[1];
  const thirdCell = secondRow.getElementsByTagName("td")[2];
  cellClicked(thirdCell);
  const expected = [[0, 1, 1, 1], [0, 1, 1, 1], [0, 1, 1, 1], [0, 0, 0, 0]];
  assert.deepEqual( uiState, expected, "Adjacent cells also display a cell hint." );
});

QUnit.test( "A splashed cell with 0 adjacent mines should also splash", function (assert ) {
  gameState = [[false, false, false, false], [false, false, false, false], [true, false, false, false], [false, true, true, false]];
  uiState = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  const secondRow = table.getElementsByTagName("tr")[1];
  const thirdCell = secondRow.getElementsByTagName("td")[2];
  cellClicked(thirdCell);
  const expected = [[1, 1, 1, 1], [1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 0, 0]];
  assert.deepEqual( uiState, expected, "Splashed cells also splash." );
});

QUnit.test( "An unclicked cell should become clicked when clicked", function (assert ) {
  const secondRow = table.getElementsByTagName("tr")[1];
  const secondCell = secondRow.getElementsByTagName("td")[1];
  cellClicked(secondCell);
  assert.equal( uiState[1][1], 1, "The cell is clicked." );
});

QUnit.test( "An unclicked cell should become a flag when right-clicked", function (assert ) {
  const secondRow = table.getElementsByTagName("tr")[1];
  const secondCell = secondRow.getElementsByTagName("td")[1];
  cellFlagged(secondCell);
  assert.equal( uiState[1][1], 2, "The cell is flagged." );
});

QUnit.test( "A flagged cell should become blank when right-clicked", function (assert ) {
  uiState = [[0, 0, 0], [0, 2, 0], [0, 0, 0]];
  const secondRow = table.getElementsByTagName("tr")[1];
  const secondCell = secondRow.getElementsByTagName("td")[1];
  cellFlagged(secondCell);
  assert.equal( uiState[1][1], 0, "The cell is flagged." );
});

QUnit.test( "A flagged cell should ignore clicks", function (assert ) {
  uiState = [[0, 0, 0], [0, 2, 0], [0, 0, 0]];
  gameState = [[false, false, false], [false, true, false], [false, false, false]];
  const secondRow = table.getElementsByTagName("tr")[1];
  const secondCell = secondRow.getElementsByTagName("td")[1];
  cellClicked(secondCell);
  assert.equal( uiState[1][1], 2, "The cell remains flagged instead of being clicked." );
});

QUnit.test( "The game should be won when only mines remain unclicked or flagged", function (assert ) {
  uiState = [[2, 1, 1], [1, 2, 1], [1, 1, 0]];
  gameState = [[true, false, false], [false, true, false], [false, false, true]];
  assert.equal( checkForWin(), true, "The game is won." );
});

QUnit.test( "The reset button should be highlighted when the game is won", function (assert ) {
  endGame("You win!");
  assert.equal( resetButton.classList.contains("greenBorder"), true, "The reset button should have a green border." );
});

QUnit.test( "A message is displayed when the game is won", function (assert ) {
  endGame("You win!");
  assert.equal( message.innerHTML, "You win!", "A message is displayed indicating the loss." );
});
