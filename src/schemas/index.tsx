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

export const CreateCabinSchema = z.object({
  cabinName: z.string().min(1, "cabin name must be provided"),
  maxCapacity: z.string().min(1, "max capacity must be greater than zero"),
  regularPrice: z.string().min(1, "regular price must be greater than zero"),
  discount: z.string().min(1, "discount must be greater than zero ").optional(),
  description: z.string().min(1, "description must be provided "),
  image: z.any(),
});
export const UpdateCabinSchema = CreateCabinSchema;
