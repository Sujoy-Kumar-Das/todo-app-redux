/* eslint-disable @typescript-eslint/no-explicit-any */
import { SxProps } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  resolver?: any;
  defaultValues?: Record<string, any>;
};

type TFromProps = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  sx: SxProps;
} & TFormConfig;

export default function TodoFrom({
  children,
  onSubmit,
  defaultValues,
  resolver,
  sx,
}: TFromProps) {
  const formConfig: TFormConfig = {};

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  const methods = useForm(formConfig);
  const { handleSubmit } = methods;
  const submitHandler = (data: FieldValues) => {
    onSubmit(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Box sx={{ ...sx }}>{children}</Box>
      </form>
    </FormProvider>
  );
}
