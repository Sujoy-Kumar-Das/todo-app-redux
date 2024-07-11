import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  placeholder?: string;
  required?: boolean;
};

const TodoTextArea = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth,
  sx,
  required,
  placeholder,
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={{ ...sx }}
          label={label}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          placeholder={placeholder}
          required={required}
          error={!!error?.message}
          helperText={error?.message}
          multiline
          rows={5}
        />
      )}
    />
  );
};

export default TodoTextArea;