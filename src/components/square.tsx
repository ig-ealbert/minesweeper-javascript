import styles from "../app/page.module.css";
import Image from "next/image";
import { squareValues } from "@/types/squareValues";
import { ClickStatus } from "@/enums/clickStatus";

export default function Square(props: squareValues) {
  function handleRightClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    props.rightClickHandler();
  }

  return (
    <td>
      <button
        className={styles.square}
        disabled={props.isGameOver || props.status === ClickStatus.CLICKED}
        onClick={props.clickHandler}
        onContextMenu={handleRightClick}
      >
        {props.status === ClickStatus.FLAGGED && (
          <Image
            src="/flag.png"
            alt="flag icon"
            className={styles.imageButton}
          ></Image>
        )}
        {props.status === ClickStatus.CLICKED && props.value === -1 && (
          <Image
            src="/mine.png"
            alt="mine icon"
            className={styles.imageButton}
          ></Image>
        )}
        {props.status === ClickStatus.CLICKED &&
          props.value >= 0 && // Show hint
          props.value}
      </button>
    </td>
  );
}
