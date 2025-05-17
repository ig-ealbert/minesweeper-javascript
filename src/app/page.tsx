"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Board from "@/components/board";
import styles from "./page.module.css";
import { boardUI } from "@/types/boardUI";
import { mineState } from "@/types/mineState";
import { size } from "@/types/size";
import { difficulties } from "@/lib/difficulties";
import { checkForWin } from "@/lib/end-game";
import { initializeGameState } from "@/lib/game-state";
import {
  adjacentCellsWithMines,
  findFirstSpaceToSplash,
  updateBoardWithHint,
} from "@/lib/hints";

export default function Home() {
  const [difficulty, setDifficulty] = useState<string>("easy");
  const [size, setSize] = useState<size>({ rows: 8, columns: 8 });
  const [numMines, setNumMines] = useState<number>(10);
  useEffect(() => {
    setSize({
      rows: difficulties[difficulty].rows,
      columns: difficulties[difficulty].columns,
    });
    setNumMines(difficulties[difficulty].mines);
    reset();
  }, [difficulty]);
  const [mineLayout, setMineLayout] = useState<mineState>(
    initializeGameState(size, numMines)
  );
  useEffect(
    () => setMineLayout(initializeGameState(size, numMines)),
    [size, numMines]
  );
  const [message, setMessage] = useState<string>("");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // 0 = unclicked; 1 = clicked; 2 = flagged; -1 = mine clicked;
  const [boardStatus, setBoardStatus] = useState<boardUI>(
    new Array(size.rows).fill(new Array(size.columns).fill(0))
  );

  // Hint values to be displayed on the UI
  const [boardValue, setBoardValue] = useState<boardUI>(
    new Array(size.rows).fill(new Array(size.columns).fill(0))
  );

  // Helper for splashing
  const [lastSplashClick, setLastSplashClick] = useState<number[]>([-1, -1]);
  useEffect(() => {
    if (lastSplashClick[0] !== -1 && lastSplashClick[1] !== -1) {
      slowSplash();
    }
  }, [lastSplashClick]);

  function slowSplash() {
    // Find valid space next to zero
    const spaceToClick = findFirstSpaceToSplash(boardStatus, boardValue);
    if (!spaceToClick.exists) {
      return;
    }
    // Click it
    const result = handleSpaceClick(spaceToClick.row, spaceToClick.col);
    // Update value and status
    const hint = {
      row: spaceToClick.row,
      column: spaceToClick.col,
      value: result.value,
    };
    const newState = updateBoardWithHint(boardStatus, boardValue, hint);
    setBoardStatus(newState.status);
    setBoardValue(newState.values);
    setLastSplashClick([spaceToClick.row, spaceToClick.col]);
  }

  function handleDifficultyChange(event: ChangeEvent<HTMLSelectElement>) {
    setDifficulty(event.currentTarget.value);
  }

  function reset() {
    setMineLayout(initializeGameState(size, numMines));
    const empty = new Array(size.rows).fill(new Array(size.columns).fill(0));
    setBoardStatus(empty);
    setBoardValue(empty);
    setMessage("");
    setIsGameOver(false);
  }

  function gameOver(didWin: boolean) {
    if (!didWin) {
      setMessage("You clicked on a mine.  You lose!");
    } else {
      setMessage("You win!");
    }
    setIsGameOver(true);
  }

  function didWin(uiState: number[][]) {
    return checkForWin(mineLayout, uiState);
  }

  function handleSpaceClick(row: number, column: number) {
    if (mineLayout[row][column]) {
      return {
        isMine: true,
        value: -1,
      };
    }
    return {
      isMine: false,
      value: adjacentCellsWithMines(row, column, mineLayout),
    };
  }

  function handleUpdateStatuses(newBoardStatus: boardUI) {
    setBoardStatus(newBoardStatus);
  }

  function handleUpdateValues(newBoardValue: boardUI) {
    setBoardValue(newBoardValue);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Board
          rows={size.rows}
          columns={size.columns}
          boardValue={boardValue}
          boardStatus={boardStatus}
          setBoardValue={handleUpdateValues}
          setBoardStatus={handleUpdateStatuses}
          setLastSplashClick={setLastSplashClick}
          isGameOver={isGameOver}
          checkForWin={didWin}
          handleClick={handleSpaceClick}
          handleLoss={() => gameOver(false)}
          handleWin={() => gameOver(true)}
        ></Board>
        <div>
          <select
            id="level"
            value={difficulty}
            className={styles.option}
            onChange={handleDifficultyChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <input
            id="restartGame"
            type="button"
            value="Reset"
            disabled={!isGameOver}
            className={styles.option}
            onClick={reset}
          />
        </div>
        <div>
          <label id="message">{message}</label>
        </div>
      </main>
    </div>
  );
}
