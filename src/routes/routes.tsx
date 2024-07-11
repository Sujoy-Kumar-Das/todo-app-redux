import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import CreateTodo from "../pages/createTodo/CreateTodo";
import TodoList from "../pages/todoList.tsx/TodoList";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "todo-list", element: <TodoList /> },
      { path: "/create-todo", element: <CreateTodo /> },
    ],
  },
]);

export default routes;
