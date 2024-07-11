import { z } from "zod";

export const todoValidationSchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .min(5, { message: "Title should be minimum 5 characters" }),
  description: z
    .string({ required_error: "Description is required." })
    .min(10, { message: "Description must be 10 characters minimum. " }),
});
