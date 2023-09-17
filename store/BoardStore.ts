import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import { Board, TypedColumn, Column } from "@/typings";
import { create } from "zustand";

interface BoardState {
    board: Board;
    getBoard: () => void
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>()
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    //set({board});
  }
}));
