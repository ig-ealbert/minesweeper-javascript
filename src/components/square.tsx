import styles from "../app/page.module.css";
import Image from "next/image";
import { squareValues } from "@/types/squareValues";

export default function Square(props: squareValues) {
  function handleRightClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    props.rightClickHandler();
  }

  return (
    <td>
      <button
        className={styles.square}
        disabled={props.isGameOver || props.status === 1}
        onClick={props.clickHandler}
        onContextMenu={handleRightClick}
      >
        {props.status === 2 && (
          <Image
            src="/flag.png"
            alt="flag icon"
            className={styles.imageButton}
          ></Image>
        )}
        {props.status === 1 && props.value === -1 && (
          <Image
            src="/mine.png"
            alt="mine icon"
            className={styles.imageButton}
          ></Image>
        )}
        {props.status === 1 && props.value >= 0 && props.value}
      </button>
    </td>
  );
}
