import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { todoValidationSchema } from "../../../../schemas";
import { TTodo } from "../../../../types";
import TodoFrom from "../../../form/TodoForm";
import TodoInputField from "../../../form/TodoInputField";
import TodoTextArea from "../../../form/TodoTextArea";
import CustomModal from "./CustomModal";

type TEditTodoModal = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: TTodo;
};

export default function EditTodoModal({ open, setOpen, data }: TEditTodoModal) {
  const { todos } = useAppSelector((state) => state.todos);
  const [defaultValues, setDefaultValues] = useState({});
  useEffect(() => {
    const findData = todos.find((todo) => todo.id === data.id);

    if (findData) {
      const defaultValues = {
        title: findData?.title,
        description: findData?.description,
      };
      setDefaultValues(defaultValues);
    }
  }, [todos, data.id]);

  const handleUpdateTodo = (updatedData) => {
    console.log(updatedData);
  };
  return (
    <CustomModal open={open} setOpen={setOpen} title={"Update Todo"}>
      <TodoFrom
        onSubmit={handleUpdateTodo}
        defaultValues={{ ...defaultValues }}
        resolver={zodResolver(todoValidationSchema)}
      >
        <Stack direction={"column"} spacing={2}>
          <TodoInputField name="title" label="Title" fullWidth />
          <TodoTextArea name="description" label="Description" fullWidth />
          <Button variant="contained" type="submit">
            Update
          </Button>
        </Stack>
      </TodoFrom>
    </CustomModal>
  );
}
