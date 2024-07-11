import { createSlice } from "@reduxjs/toolkit";

type TTodo = {
  id: number;
  title: string;
  description: string;
  isDeleted: boolean;
  isCompleted: boolean;
  createdAt: Date;
};

type TInitialState = {
  todos: TTodo[];
};

const initialState: TInitialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    createTodoReducer: (state, action) => {
      const newTodo = {
        id: state.todos.length + 1,
        title: action.payload.title,
        description: action.payload.description,
        isDeleted: false,
        isCompleted: false,
        createdAt: new Date(),
      };

      state.todos.push(newTodo);
    },
  },
});

export const { createTodoReducer } = todoSlice.actions;

export default todoSlice.reducer;
