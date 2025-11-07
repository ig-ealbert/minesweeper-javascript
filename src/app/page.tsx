"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Board from "@/components/board";
import styles from "./page.module.css";
import { boardUI } from "@/types/boardUI";
import { size } from "@/types/size";
import { difficulties } from "@/lib/difficulties";
import { checkForWin, getGameOverMessage } from "@/lib/end-game";
import { initializeMines } from "@/lib/game-state";
import { setupHints } from "@/lib/hints";
import { splashInfo } from "@/types/splashInfo";
import { fastSplash } from "@/lib/splash";
import { ClickStatus } from "@/enums/clickStatus";
import { Difficulty } from "@/enums/difficulty";

export default function Home() {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [size, setSize] = useState<size>({ rows: 8, columns: 8 });
  const [numMines, setNumMines] = useState<number>(10);
  useEffect(() => {
    const newSize = {
      rows: difficulties[difficulty].rows,
      columns: difficulties[difficulty].columns,
    };
    setSize(newSize);
    const newNumMines = difficulties[difficulty].mines;
    setNumMines(newNumMines);
    reset(newSize, newNumMines);
  }, [difficulty]);

  const [message, setMessage] = useState<string>("");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const [boardStatus, setBoardStatus] = useState<boardUI>(
    new Array(size.rows).fill(
      new Array(size.columns).fill(ClickStatus.UNCLICKED)
    )
  );

  // Hint values to be displayed on the UI
  const [boardValue, setBoardValue] = useState<boardUI>(
    new Array(size.rows).fill(new Array(size.columns).fill(-2))
  );

  function splash(row: number, col: number) {
    const info: splashInfo = {
      status: boardStatus,
      values: boardValue,
      row,
      col,
      size,
    };
    const newStatus = fastSplash(info);
    setBoardStatus(newStatus);
  }

  function handleDifficultyChange(event: ChangeEvent<HTMLSelectElement>) {
    setDifficulty(event.currentTarget.value as Difficulty);
  }

  function reset(size: size, numMines: number) {
    const newMines = initializeMines(size, numMines);
    setBoardValue(setupHints(newMines));
    setBoardStatus(
      new Array(size.rows).fill(
        new Array(size.columns).fill(ClickStatus.UNCLICKED)
      )
    );
    setMessage("");
    setIsGameOver(false);
  }

  function gameOver(isWin: boolean) {
    setMessage(getGameOverMessage(isWin));
    setIsGameOver(true);
  }

  function didWin(uiState: number[][]) {
    return checkForWin(boardValue, uiState);
  }

  function handleUpdateStatuses(newBoardStatus: boardUI) {
    setBoardStatus(newBoardStatus);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Board
          rows={size.rows}
          columns={size.columns}
          boardValue={boardValue}
          boardStatus={boardStatus}
          setBoardStatus={handleUpdateStatuses}
          splash={splash}
          isGameOver={isGameOver}
          checkForWin={didWin}
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
            <option value={Difficulty.EASY}>Easy</option>
            <option value={Difficulty.MEDIUM}>Medium</option>
            <option value={Difficulty.HARD}>Hard</option>
          </select>
          <input
            id="restartGame"
            type="button"
            value="Reset"
            disabled={!isGameOver}
            className={styles.option}
            onClick={() => reset(size, numMines)}
          />
        </div>
        <div>
          <label id="message">{message}</label>
        </div>
      </main>
    </div>
  );
}
