import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import EditModal from "../../components/ui/shared/modal/EditModal";
import {
  deleteTodoReducer,
  editTodoReducer,
} from "../../redux/features/todo.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import formatDate from "../../utils/formatDate";

export default function TodoList() {
  const [openEditModal, SetEditModal] = useState(false);
  const [editData, SetEditData] = useState({});
  const { todos } = useAppSelector((state) => state.todos);

  const deleteTodoDispatch = useAppDispatch();
  const completeDispatch = useAppDispatch();

  const handleDeleteTodo = (id) => {
    deleteTodoDispatch(deleteTodoReducer(id));
  };

  const handleEditTodo = (data) => {
    SetEditModal(true);
    SetEditData(data);
  };

  const handleCompleteTodo = (id) => {
    completeDispatch(editTodoReducer({ id, isCompleted: true }));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Created At</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo, index) => (
              <TableRow
                key={todo.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "center" }}
                >
                  {index + 1}
                </TableCell>
                <TableCell align="right" sx={{ textAlign: "center" }}>
                  {todo.title}
                </TableCell>
                <TableCell align="right" sx={{ textAlign: "center" }}>
                  {formatDate(todo?.createdAt as string)}
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Chip
                      label={todo.isCompleted ? "Completed" : "Pending"}
                      sx={{
                        background: todo.isCompleted
                          ? `linear-gradient(45deg, #2779F5 30%, #3FC1C9 90%)`
                          : `linear-gradient(45deg, #F45E0C 30%, #FFA940 90%)`,
                        color: "background.default",
                        fontWeight: "bold",
                      }}
                      onClick={() => handleCompleteTodo(todo.id)}
                    />
                  </Box>
                </TableCell>

                <TableCell align="right">
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton
                      color="info"
                      onClick={() => handleEditTodo(todo.id)}
                    >
                      <EditNoteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditModal setOpen={SetEditModal} open={openEditModal} data={editData} />
    </Box>
  );
}
