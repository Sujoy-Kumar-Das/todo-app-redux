/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect } from "react";
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

type TFormProps = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;

export default function TodoForm({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: TFormProps) {
  const methods = useForm({
    defaultValues,
    resolver,
  });

  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues, methods]);

  const { handleSubmit, reset } = methods;

  const submitHandler = (data: FieldValues) => {
    onSubmit(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submitHandler)}>{children}</form>
    </FormProvider>
  );
}
