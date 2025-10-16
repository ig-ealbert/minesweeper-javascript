export function arrayContainsSpace(fullArray: number[][], space: number[]) {
  for (const entry of fullArray) {
    if (entry[0] === space[0] && entry[1] === space[1]) {
      return true;
    }
  }
  return false;
}
