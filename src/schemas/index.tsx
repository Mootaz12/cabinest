import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "password must be at least 8 characters."),
});
export const CreateUserSchema = z
  .object({
    fullName: z.string().min(1, "full name must be provided"),
    email: z.string().email(),
    password: z.string().min(8, "password must be at least 8 characters."),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export const UpdateUserSchema = z
  .object({
    fullName: z.string().min(1, "full name must be provided"),
    email: z.string().email(),
    password: z.string().min(8, "password must be at least 8 characters."),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters."),
    image: z.any(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
