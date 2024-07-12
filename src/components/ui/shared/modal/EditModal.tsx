import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { editTodoReducer } from "../../../../redux/features/todo.slice";
import { useAppDispatch } from "../../../../redux/hooks";
import { todoValidationSchema } from "../../../../schemas";
import { TTodo } from "../../../../types";
import TodoFrom from "../../../form/TodoForm";
import TodoInputField from "../../../form/TodoInputField";
import TodoTextArea from "../../../form/TodoTextArea";
import CustomModal from "./CustomModal";

type TEditTodoModal = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: Partial<TTodo>;
};

export default function EditTodoModal({ open, setOpen, data }: TEditTodoModal) {
  const [defaultValues, setDefaultValues] = useState({});

  const editTodoDispatch = useAppDispatch();
  useEffect(() => {
    if (data) {
      const defaultValues = {
        title: data?.title || "",
        description: data?.description || "",
      };
      setDefaultValues(defaultValues);
    }
  }, [data]);

  const handleUpdateTodo = (updatedData: Partial<TTodo>) => {
    const updatedDoc = {
      id: data.id,
      ...updatedData,
    };
    editTodoDispatch(editTodoReducer(updatedDoc));
    setOpen(false);
  };

  return (
    <CustomModal open={open} setOpen={setOpen} title={"Update Todo"}>
      <TodoFrom
        onSubmit={handleUpdateTodo}
        defaultValues={defaultValues}
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
