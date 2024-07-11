import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import TodoFrom from "../../components/form/TodoForm";
import TodoInputField from "../../components/form/TodoInputField";
import TodoTextArea from "../../components/form/TodoTextArea";

const validationSchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .min(5, { message: "Title should be minimum 5 characters" }),
  description: z
    .string({ required_error: "Description is required." })
    .min(10, { message: "Description must be 10 characters minimum. " }),
});

export default function CreateTodo() {
  const handleCreateTodo = (data: FieldValues) => {
    console.log(data);
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
          resolver={zodResolver(validationSchema)}
          // defaultValues={defaultValues}
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
    </Container>
  );
}
