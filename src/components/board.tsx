import { updateBoardWithHint } from "@/lib/hints";
import styles from "../app/page.module.css";
import Square from "./square";
import { boardProps } from "@/types/boardProps";
import { boardUI } from "@/types/boardUI";

export default function Board(props: boardProps) {
  function calculateHint(row: number, column: number) {
    const outcome = props.handleClick(row, column);
    return { row, column, value: outcome.value };
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
    if (clickedSpaceHint.value === -1) {
      props.handleLoss();
    }

    const updatedBoards = updateBoardWithHint(
      props.boardStatus,
      props.boardValue,
      clickedSpaceHint
    );
    props.setBoardStatus(updatedBoards.status);
    props.setBoardValue(updatedBoards.values);

    if (clickedSpaceHint.value === 0) {
      props.setLastSplashClick([row, column]);
    }

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
    checkForWin(newBoardStatus);
  }

  return (
    <table id="board">
      <tbody>
        {new Array(props.rows).fill("").map((_, rowIndex) => (
          <tr key={`row${rowIndex}`} className={styles.row}>
            {new Array(props.columns).fill("").map((_, colIndex) => (
              <Square
                key={`row${rowIndex}col${colIndex}`}
                status={props.boardStatus[rowIndex][colIndex]}
                value={props.boardValue[rowIndex][colIndex]}
                isGameOver={props.isGameOver}
                clickHandler={() => clickSpace(rowIndex, colIndex)}
                rightClickHandler={() => toggleFlag(rowIndex, colIndex)}
              ></Square>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
