import { splashInfo } from "@/types/splashInfo";
import { findAdjacentUnclickedZeroes, revealSquare } from "./hints";

export function arrayContainsSpace(fullArray: number[][], space: number[]) {
  for (const entry of fullArray) {
    if (entry[0] === space[0] && entry[1] === space[1]) {
      return true;
    }
  }
  return false;
}

export function fastSplash(info: splashInfo) {
  let spacesToUncover = findAdjacentUnclickedZeroes(info);
  let newStatus = revealSquare(info.status, info.row, info.col);
  while (spacesToUncover.length > 0) {
    const space = spacesToUncover[0];
    const newSpacesToUncover = findAdjacentUnclickedZeroes({
      ...info,
      status: newStatus,
      row: space[0],
      col: space[1],
    }); // This must come before marking spaces clicked
    newStatus = revealSquare(newStatus, space[0], space[1]);
    const newSpaces = newSpacesToUncover.filter(
      (space) => !arrayContainsSpace(spacesToUncover, space)
    );
    spacesToUncover = spacesToUncover.concat(newSpaces);
    spacesToUncover.shift(); // Remove first space in array
  }
  return newStatus;
}
