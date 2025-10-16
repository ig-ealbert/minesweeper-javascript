import { Difficulty } from "@/enums/difficulty";

export const difficulties: Record<
  Difficulty,
  { rows: number; columns: number; mines: number }
> = {
  easy: {
    rows: 8,
    columns: 8,
    mines: 10,
  },
  medium: {
    rows: 8,
    columns: 16,
    mines: 20,
  },
  hard: {
    rows: 16,
    columns: 16,
    mines: 40,
  },
};
