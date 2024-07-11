import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Chip, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import EditModal from "../../components/ui/shared/modal/EditModal";
import { deleteTodoReducer } from "../../redux/features/todo.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
export default function TodoList() {
  const [openEditModal, SetEditModal] = useState(false);
  const [editData, SetEditData] = useState({});
  const { todos } = useAppSelector((state) => state.todos);
  const deleteTodoDispatch = useAppDispatch();
  const handleDeleteTodo = (id) => {
    deleteTodoDispatch(deleteTodoReducer(id));
  };

  const handleEditTodo = (data) => {
    SetEditModal(true);
    SetEditData(data);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 150,
    },
    {
      field: "isCompleted",
      headerName: "Status",
      renderCell: ({ row }) => {
        const isCompleted = row.isCompleted;
        return (
          <Chip
            label={isCompleted ? "Completed" : "Pending"}
            sx={{
              background: isCompleted
                ? `linear-gradient(45deg, #2779F5 30%, #3FC1C9 90%)`
                : `linear-gradient(45deg, #F45E0C 30%, #FFA940 90%)`,

              color: "background.default",
              fontWeight: "bold",
            }}
          />
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: ({ row }) => {
        return (
          <IconButton color="info" onClick={() => handleEditTodo(row.id)}>
            <EditNoteIcon />
          </IconButton>
        );
      },
    },
    {
      field: "isDeleted",
      headerName: "Delete",
      renderCell: ({ row }) => {
        return (
          <IconButton color="error" onClick={() => handleDeleteTodo(row.id)}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={todos}
        columns={columns}
        hideFooter={true}
        hideFooterPagination={true}
        hideFooterSelectedRowCount={false}
        disableColumnResize={true}
        disableAutosize={true}
      />
      <EditModal setOpen={SetEditModal} open={openEditModal} data={editData} />
    </Box>
  );
}
