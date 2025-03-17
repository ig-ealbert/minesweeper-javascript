import styles from "../app/page.module.css"
import { squareValues } from "@/types/squareValues";

export default function Square(props: squareValues) {
  function handleRightClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    props.rightClickHandler();
  }

  return (
    <td>
      <button className={styles.square}
              disabled={props.isGameOver || props.status === 1}
              onClick={props.clickHandler} onContextMenu={handleRightClick}>
        {props.status === 2 &&
          <img src="/flag.png" className={styles.imageButton}></img>
        }
        {props.status === 1 && props.value === -1 &&
          <img src="/mine.png" className={styles.imageButton}></img>
        }
        {props.status === 1 && props.value >= 0 && props.value}
      </button>
    </td>
  );
}
