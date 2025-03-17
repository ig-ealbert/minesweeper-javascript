import styles from "../app/page.module.css"
import Square from "./square";
import { boardProps } from "@/types/boardProps";
import { boardUI } from "@/types/boardUI";
import { hint } from "@/types/hint";

export default function Board(props: boardProps) {
  function calculateHint(row: number, column: number) {
    const outcome = props.handleClick(row, column);
    return { row, column, value: outcome.value };
  }

  function updateBoardWithHints(hints: hint[]) {
    const newBoardValue = props.boardValue.map((row) => row.slice());
    const newBoardStatus = props.boardStatus.map((row) => row.slice());
    for (const hint of hints) {
      newBoardValue[hint.row][hint.column] = hint.value;
      newBoardStatus[hint.row][hint.column] = 1;
    }
    props.setBoardStatus(newBoardStatus);
    props.setBoardValue(newBoardValue);
    return { values: newBoardValue, status: newBoardStatus };
  }

  function checkForWin(newBoardStatus: boardUI) {
    if (props.checkForWin(newBoardStatus)) {
      for (const row of newBoardStatus) {
        for (const [index, cell] of row.entries()) {
          if (row[index] === 0) {
            row[index] = 2;
          }
        }
      }
      props.setBoardStatus(newBoardStatus);
      props.handleWin();
    }
  }

  function clickSpace(row: number, column: number) {
    if (props.boardStatus[row][column] === 2) {
      return; // ignore clicks on flags
    }

    const clickedSpaceHint = calculateHint(row, column);
    let hints: hint[] = [clickedSpaceHint];
    
    if (clickedSpaceHint.value === -1) {
      props.handleLoss();
    }

    if (clickedSpaceHint.value === 0) {
      const splashedHints = splashHints(row, column);
      hints = hints.concat(splashedHints)
    }

    const updatedBoards = updateBoardWithHints(hints);
    checkForWin(updatedBoards.status);
  }

  function toggleFlag(row: number, column: number) {
    const currentValue = props.boardStatus[row][column];
    if (currentValue !== 2 && currentValue !== 0) {
      return; // Don't do anything if we've already clicked here
    }
    const newBoardStatus = props.boardStatus.map((row) => row.slice());
    newBoardStatus[row][column] = currentValue === 2 ? 0 : 2;
    props.setBoardStatus(newBoardStatus);
  }

  function splashHints(row: number, col: number) {
    let hints: hint[] = [];
    for (let rOffset = -1; rOffset < 2; rOffset++) {
      const newRow = row + rOffset;
      if (newRow < props.boardValue.length && newRow >= 0) {
        for (let cOffset = -1; cOffset < 2; cOffset++) {
          const newCol = col + cOffset;
          if (newCol < props.boardValue[0].length && newCol >= 0) {
            if (!(newRow === row && newCol === col) &&
                 props.boardStatus[newRow][newCol] === 0) { // only splash unclicked spaces
              const hint = calculateHint(newRow, newCol);
              if (hint) {
                hints.push(hint);
              }
            }
          }
        }
      }
    }
    return hints;
  }

  return (
    <table id="board">
      <tbody>
      {new Array(props.rows).fill('').map((_, rowIndex) =>
        <tr key={`row${rowIndex}`} className={styles.row}>
          {new Array(props.columns).fill('').map((_, colIndex) =>
            <Square key={`row${rowIndex}col${colIndex}`}
                    status={props.boardStatus[rowIndex][colIndex]}
                    value={props.boardValue[rowIndex][colIndex]}
                    isGameOver={props.isGameOver}
                    clickHandler={() => clickSpace(rowIndex, colIndex)}
                    rightClickHandler={() => toggleFlag(rowIndex, colIndex)}>
            </Square>
          )}
        </tr>
      )}
      </tbody>
    </table>
  )
}