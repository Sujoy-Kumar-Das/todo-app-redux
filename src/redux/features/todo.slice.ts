import { createSlice } from "@reduxjs/toolkit";
import { TTodo } from "../../types";

type TInitialState = {
  todos: TTodo[];
};

const initialState: TInitialState = {
  todos: [
    {
      description: "This is description",
      title: "Title 1",
      id: 1,
      createdAt: new Date().toISOString(),
      isDeleted: false,
      isCompleted: false,
    },
    {
      description: "This is second description",
      title: "Title 2",
      id: 2,
      createdAt: new Date().toISOString(),
      isDeleted: false,
      isCompleted: false,
    },
  ],
};
const sortTodos = (todos: TTodo[]) => {
  return todos.slice().sort((a, b) => {
    if (a.isCompleted && !b.isCompleted) return 1;
    if (!a.isCompleted && b.isCompleted) return -1;
    return (
      new Date(b.createdAt as string).getTime() -
      new Date(a.createdAt as string).getTime()
    );
  });
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
      state.todos = sortTodos(state.todos);
    },
    editTodoReducer: (state, action) => {
      const payload = action.payload;
      const findTodo = state.todos.find((todo) => todo.id === payload.id);

      if (findTodo) {
        const remainingTodo = state.todos.filter(
          (todo) => todo.id !== payload.id
        );
        const updatedTodo: TTodo = {
          id: findTodo?.id as number,
          title: payload.title ? payload.title : findTodo?.title,
          description: payload.description
            ? payload.description
            : findTodo?.description,
          isDeleted: payload.isDeleted
            ? payload.isDeleted
            : findTodo?.isDeleted,
          isCompleted: payload.isCompleted
            ? payload.isCompleted
            : findTodo?.isCompleted,
          updatedAt: new Date().toISOString(),
          createdAt: findTodo.createdAt,
        };

        const updatedTodos = [...remainingTodo, updatedTodo];
        state.todos = sortTodos(updatedTodos);
      }
    },
    deleteTodoReducer: (state, action) => {
      const findTodo = state.todos.find((todo) => todo.id === action.payload);

      if (findTodo) {
        const remainingTodo = state.todos.filter(
          (todo) => todo.id !== action.payload
        );

        state.todos = sortTodos(remainingTodo);
      }
    },
  },
});

export const { createTodoReducer, editTodoReducer, deleteTodoReducer } =
  todoSlice.actions;

export default todoSlice.reducer;
