import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import TodoFrom from "../../components/form/TodoForm";
import TodoInputField from "../../components/form/TodoInputField";
import TodoTextArea from "../../components/form/TodoTextArea";
import { createTodoReducer } from "../../redux/features/todo.slice";
import { useAppDispatch } from "../../redux/hooks";
import { todoValidationSchema } from "../../schemas";

export default function CreateTodo() {
  const dispatch = useAppDispatch();
  const handleCreateTodo = (data: FieldValues) => {
    dispatch(createTodoReducer(data));
  };

  return (
    <Container>
      <Box
        sx={{
          borderRadius: 2,
          boxShadow: 5,
        }}
      >
        <Typography
          sx={{ bgcolor: "background.paper", px: 3, py: 3 }}
          component={"h1"}
          variant="h6"
          textAlign={"left"}
          mb={4}
        >
          Create A Todo Now
        </Typography>
        <TodoFrom
          onSubmit={handleCreateTodo}
          resolver={zodResolver(todoValidationSchema)}
        >
          <Stack
            direction={"column"}
            spacing={3}
            bgcolor={"background.default"}
            p={3}
            borderRadius={2}
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
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                background: "linear-gradient(45deg, #2779F5 30%, #3FC1C9 90%)",
              }}
            >
              Add Todo
            </Button>
          </Stack>
        </TodoFrom>
      </Box>
    </Container>
  );
}
