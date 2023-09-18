import { databases } from "@/appwrite";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import { Board, TypedColumn, Column, Todo } from "@/typings";
import { create } from "zustand";

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },

  setBoardState: (board) => set({ board }),

  updateTodoInDB: async (todo, columnId) => {
    const dbId = process.env.NEXT_PUBLIC_DATABASE_ID!;
    const collectionId = process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!;
    await databases.updateDocument(dbId, collectionId, todo.$id, {
      title: todo.title,
      status: columnId,
    });
  },
  searchString: "",
  setSearchString: (searchString) => set({ searchString }),
}));
