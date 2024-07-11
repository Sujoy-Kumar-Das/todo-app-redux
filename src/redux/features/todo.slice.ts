import { createSlice } from "@reduxjs/toolkit";
import { TTodo } from "../../types";

type TInitialState = {
  todos: TTodo[];
};

const initialState: TInitialState = {
  todos: [
    {
      description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      title: "tttttttttttttttttttttttttttt",
      id: 1,
      createdAt: new Date().toISOString(),
      isDeleted: false,
      isCompleted: false,
    },
    {
      description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      title: "tttttttttttttttttttttttttttt",
      id: 2,
      createdAt: new Date().toISOString(),
      isDeleted: false,
      isCompleted: false,
    },
  ],
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
        createdAt: new Date().toISOString(),
      };

      state.todos.push(newTodo);
    },
    editTodoReducer: (state, action) => {
      const payload = action.payload;
      const matchedTodo = state.todos.find((todo) => todo.id === payload.id);

      const filterTodo = state.todos.filter((todo) => todo.id !== payload.id);

      const updatedTodo: TTodo = {
        id: matchedTodo?.id as number,
        title: payload.title ? payload.title : matchedTodo?.title,
        description: payload.title ? payload.title : matchedTodo?.description,
        isDeleted: payload.title ? payload.title : matchedTodo?.isDeleted,
        isCompleted: payload.title ? payload.title : matchedTodo?.isCompleted,
        updatedAt: new Date().toISOString(),
      };

      const updatedTodos = [...filterTodo, updatedTodo];

      state.todos = updatedTodos;
      console.log(state);
    },

    deleteTodoReducer: (state, action) => {
      const findTodo = state.todos.find((todo) => todo.id === action.payload);

      if (findTodo) {
        const remainingTodo = state.todos.filter(
          (todo) => todo.id !== action.payload
        );

        state.todos = [...remainingTodo];
      }
    },
  },
});

export const { createTodoReducer, editTodoReducer, deleteTodoReducer } =
  todoSlice.actions;

export default todoSlice.reducer;
