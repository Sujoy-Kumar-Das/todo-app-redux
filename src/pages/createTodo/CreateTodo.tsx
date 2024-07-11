import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import TodoFrom from "../../components/form/TodoForm";
import TodoInputField from "../../components/form/TodoInputField";
import TodoTextArea from "../../components/form/TodoTextArea";
import { createTodoReducer } from "../../redux/features/todo.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { todoValidationSchema } from "../../schemas";

export default function CreateTodo() {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector((state) => state.todos);
  const handleCreateTodo = (data: FieldValues) => {
    dispatch(createTodoReducer(data));
  };

  return (
    <Container>
      <Box
        sx={{
          bgcolor: "background.paper",
          px: 5,
          py: 8,
          borderRadius: 2,
          boxShadow: 5,
        }}
      >
        <Typography component={"h1"} variant="h3" textAlign={"center"} mb={4}>
          Create A Todo Now
        </Typography>

        <TodoFrom
          onSubmit={handleCreateTodo}
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: 2,
          }}
          resolver={zodResolver(todoValidationSchema)}
        >
          <TodoInputField
            name="title"
            fullWidth={true}
            label="Todo Title"
            placeholder="Enter Your Todo Title"
          />
          <TodoTextArea
            name="description"
            fullWidth={true}
            label="Description"
            placeholder="Enter Your Description."
          />
          <Button fullWidth variant="contained" type="submit">
            Add Todo
          </Button>
        </TodoFrom>
      </Box>
      {todos.length > 0 &&
        todos.map((todo) => (
          <Box
            key={todo.id}
            sx={{
              bgcolor: "background.paper",
              px: 2,
              py: 3,
              borderRadius: 2,
              boxShadow: 2,
              mt: 5,
            }}
          >
            <Typography variant="h6" sx={{ overflowWrap: "break-word" }}>
              {todo.title}
            </Typography>
            <Typography variant="body1" sx={{ overflowWrap: "break-word" }}>
              {todo.description}
            </Typography>
          </Box>
        ))}
    </Container>
  );
}
