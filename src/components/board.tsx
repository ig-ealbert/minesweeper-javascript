import { markSpaceClicked } from "@/lib/hints";
import styles from "../app/page.module.css";
import Square from "./square";
import { boardProps } from "@/types/boardProps";
import { boardUI } from "@/types/boardUI";
import { ClickStatus } from "@/enums/clickStatus";

export default function Board(props: boardProps) {
  function checkForWin(newBoardStatus: boardUI) {
    if (props.checkForWin(newBoardStatus)) {
      for (const row of newBoardStatus) {
        for (const [index, space] of row.entries()) {
          if (space === ClickStatus.UNCLICKED) {
            row[index] = ClickStatus.FLAGGED;
          }
        }
      }
      props.setBoardStatus(newBoardStatus);
      props.handleWin();
    }
  }

  function clickSpace(row: number, column: number) {
    if (props.boardStatus[row][column] === ClickStatus.FLAGGED) {
      return; // ignore clicks on flags
    }

    const clickedSpaceHint = props.boardValue[row][column];
    if (clickedSpaceHint === -1) {
      props.handleLoss();
    }

    const updatedStatus = markSpaceClicked(props.boardStatus, row, column);
    props.setBoardStatus(updatedStatus);

    if (clickedSpaceHint === 0) {
      props.splash(row, column);
    }

    checkForWin(updatedStatus);
  }

  function toggleFlag(row: number, column: number) {
    const clickStatus = props.boardStatus[row][column];
    if (clickStatus === ClickStatus.CLICKED) {
      return; // Don't do anything if we've already clicked here
    }
    const newBoardStatus = props.boardStatus.map((row) => row.slice());
    newBoardStatus[row][column] =
      clickStatus === ClickStatus.FLAGGED
        ? ClickStatus.UNCLICKED
        : ClickStatus.FLAGGED;
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
